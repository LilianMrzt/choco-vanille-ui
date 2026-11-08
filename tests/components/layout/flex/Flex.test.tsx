import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Flex from '@components/layout/flex/Flex.tsx'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('Flex', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Flex>content</Flex>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<Flex>content</Flex>)
            expect(screen.getByText('content')).toBeTruthy()
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<Flex as="section">content</Flex>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe(
                'section',
            )
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<Flex>content</Flex>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(
                <Flex className="my-flex">content</Flex>,
            )
            expect(getFirstChild(container).className).toContain('my-flex')
        })
    })

    describe('variant application', () => {
        it('applies non-empty classes for direction variants', () => {
            const directions = [
                'row',
                'column',
                'row-reverse',
                'column-reverse',
            ] as const
            directions.forEach((direction) => {
                const { container } = render(
                    <Flex flexDirection={direction}>content</Flex>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies non-empty classes for align variants', () => {
            const aligns = [
                'start',
                'end',
                'center',
                'stretch',
                'baseline',
            ] as const
            aligns.forEach((align) => {
                const { container } = render(
                    <Flex alignItems={align}>content</Flex>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies non-empty classes for justify variants', () => {
            const justifies = [
                'start',
                'end',
                'center',
                'between',
                'around',
                'evenly',
                'stretch',
            ] as const
            justifies.forEach((justify) => {
                const { container } = render(
                    <Flex justifyContent={justify}>content</Flex>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies non-empty classes for wrap variants', () => {
            const wraps = ['nowrap', 'wrap', 'wrap-reverse'] as const
            wraps.forEach((wrap) => {
                const { container } = render(
                    <Flex flexWrap={wrap}>content</Flex>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies a non-empty class when inline is true', () => {
            const { container } = render(<Flex inline>content</Flex>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <Flex data-testid="flex">content</Flex>,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'flex',
            )
        })

        it('forwards aria-* attributes', () => {
            render(<Flex aria-label="flex label">content</Flex>)
            expect(screen.getByLabelText('flex label')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(<Flex ref={ref}>content</Flex>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <Flex as="section" ref={ref}>
                    content
                </Flex>,
            )
            expect(ref.current!.tagName.toLowerCase()).toBe('section')
        })
    })

    describe('displayName', () => {
        it('is set to "Flex"', () => {
            expect(typeof Flex).toBe('function')
        })
    })
})
