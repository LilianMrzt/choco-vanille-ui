import { createRef, type CSSProperties } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, expectTypeOf, it } from 'vitest'

import '@theme'
import { Box, type BoxColor, type BoxProps } from '@components/layout/box'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { Flex } from '@components/layout/flex'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('Box', () => {
    describe('CSS color contract', () => {
        it('uses native CSS property types instead of theme token unions', () => {
            expectTypeOf<BoxColor>().toEqualTypeOf<CSSProperties['color']>()
            expectTypeOf<BoxProps['color']>().toEqualTypeOf<CSSProperties['color']>()
            expectTypeOf<BoxProps['backgroundColor']>().toEqualTypeOf<CSSProperties['backgroundColor']>()
            expectTypeOf<BoxProps['borderColor']>().toEqualTypeOf<CSSProperties['borderColor']>()
        })

        it.each(['var(--custom-color)', 'var(--custom-color, hotpink)', 'currentColor', 'transparent', 'inherit', 'rebeccapurple', '#123456', 'rgb(12, 34, 56)'])(
            'applies %s as CSS without leaking color props to the DOM',
            (color) => {
                render(<Box color={color} backgroundColor={color} borderColor={color} data-testid="box" />)
                const box = screen.getByTestId('box')
                const expected = document.createElement('div')
                expected.style.color = color
                expected.style.backgroundColor = color
                expected.style.borderColor = color

                expect(box.style.color).toBe(expected.style.color)
                expect(box.style.backgroundColor).toBe(expected.style.backgroundColor)
                expect(box.style.borderColor).toBe(expected.style.borderColor)
                expect(box.hasAttribute('color')).toBe(false)
                expect(box.hasAttribute('backgroundColor')).toBe(false)
                expect(box.hasAttribute('borderColor')).toBe(false)
            },
        )

        it('applies theme variable references directly', () => {
            render(<Box color={vars.color.text.primary} backgroundColor={vars.color.surface.main} borderColor={vars.color.border.main} data-testid="box" />)
            const box = screen.getByTestId('box')

            expect(box.style.color).toBe(vars.color.text.primary)
            expect(box.style.backgroundColor).toBe(vars.color.surface.main)
            expect(box.style.borderColor).toBe(vars.color.border.main)
        })

        it('preserves consumer style precedence and custom classes', () => {
            render(<Box color="red" backgroundColor="red" borderColor="red" className="interaction-colors" style={{ color: 'var(--consumer-color)', backgroundColor: 'blue', borderColor: 'green' }} data-testid="box" />)
            const box = screen.getByTestId('box')

            expect(box.style.color).toBe('var(--consumer-color)')
            expect(box.style.backgroundColor).toBe('blue')
            expect(box.style.borderColor).toBe('green')
            expect(box.className).toContain('interaction-colors')
        })

        it('sets no inline color defaults that could override interaction classes', () => {
            render(<Box className="interaction-colors" data-testid="box" />)
            const box = screen.getByTestId('box')

            expect(box.style.color).toBe('')
            expect(box.style.backgroundColor).toBe('')
            expect(box.style.borderColor).toBe('')
            expect(box.className).toContain('interaction-colors')
        })
    })

    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Box>content</Box>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<Box>content</Box>)
            expect(screen.getByText('content')).toBeTruthy()
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<Box as="section">content</Box>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('section')
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<Box>content</Box>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(<Box className="my-box">content</Box>)
            expect(getFirstChild(container).className).toContain('my-box')
        })

        it('applies variant classes', () => {
            const { container } = render(
                <Box display="flex" padding="md" backgroundColor={vars.color.surface.main}>
                    content
                </Box>,
            )
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })
    })

    describe('borders', () => {
        it('forwards border props to the DOM element', () => {
            render(
                <Box
                    borderColor={vars.color.border.main}
                    borderStyle="solid"
                    borderTopWidth="1px"
                    data-testid="box"
                />,
            )

            const box = screen.getByTestId('box')

            expect(box.style.borderTopWidth).toBe('1px')
            expect(box.style.borderStyle).toBe('solid')
        })

        it('forwards border props through Flex', () => {
            render(
                <Flex
                    borderColor={vars.color.border.main}
                    borderStyle="solid"
                    borderTopWidth="1px"
                    data-testid="flex"
                />,
            )

            const flex = screen.getByTestId('flex')

            expect(flex.style.borderTopWidth).toBe('1px')
            expect(flex.style.borderStyle).toBe('solid')
        })
    })

    describe('layout props', () => {
        it('applies textAlign to the rendered element', () => {
            render(<Box textAlign="center" data-testid="box">content</Box>)

            expect(screen.getByTestId('box').style.textAlign).toBe('center')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<Box data-testid="box">content</Box>)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('box')
        })

        it('forwards aria-* attributes', () => {
            render(<Box aria-label="box label">content</Box>)
            expect(screen.getByLabelText('box label')).toBeTruthy()
        })

        it('forwards id attribute', () => {
            const { container } = render(<Box id="my-box">content</Box>)
            expect(getFirstChild(container).getAttribute('id')).toBe('my-box')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLElement>()
            render(<Box ref={ref}>content</Box>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLElement>()
            render(<Box as="section" ref={ref}>content</Box>)
            expect(ref.current!.tagName.toLowerCase()).toBe('section')
        })
    })

    describe('displayName', () => {
        it('is set to "Box"', () => {
            expect(Box.displayName).toBe('Box')
        })
    })
})
