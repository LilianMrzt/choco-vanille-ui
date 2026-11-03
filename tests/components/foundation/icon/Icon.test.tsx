import { render, screen } from '@testing-library/react'
import { describe, expect, expectTypeOf, it } from 'vitest'
import type { CSSProperties } from 'react'

import { Icon, type IconColor, type IconProps } from '@components/foundation/icon'
import { vars } from '@theme/styles/contract/contract.css.ts'
import UserIcon from '@resources/asset/UserIcon.svg?react'

// The tests below only cover logic that belongs to the Icon wrapper itself:
// - ARIA attributes (decorative vs. semantic icon pattern)
// - displayName

describe('Icon', () => {
    describe('CSS color contract', () => {
        it('accepts native CSS color values', () => {
            expectTypeOf<IconColor>().toEqualTypeOf<CSSProperties['color']>()
            expectTypeOf<IconProps['color']>().toEqualTypeOf<CSSProperties['color']>()
            expectTypeOf<IconProps['backgroundColor']>().toEqualTypeOf<CSSProperties['backgroundColor']>()
            expectTypeOf<IconProps['borderColor']>().toEqualTypeOf<CSSProperties['borderColor']>()
        })

        it.each(['var(--custom-color)', 'var(--custom-color, hotpink)', 'currentColor', 'transparent', 'inherit', 'rebeccapurple', '#123456', 'rgb(12, 34, 56)'])(
            'applies %s to the SVG and CSS wrapper colors without DOM prop leakage',
            (color) => {
                render(<Icon icon={UserIcon} color={color} backgroundColor={color} borderColor={color} data-testid="icon" />)
                const svg = screen.getByTestId('icon')
                const wrapper = svg.parentElement!
                const expected = document.createElement('span')
                expected.style.color = color
                expected.style.backgroundColor = color
                expected.style.borderColor = color

                expect(svg.style.color).toBe(expected.style.color)
                expect(wrapper.style.backgroundColor).toBe(expected.style.backgroundColor)
                expect(wrapper.style.borderColor).toBe(expected.style.borderColor)
                for (const element of [svg, wrapper]) {
                    expect(element.hasAttribute('color')).toBe(false)
                    expect(element.hasAttribute('backgroundColor')).toBe(false)
                    expect(element.hasAttribute('borderColor')).toBe(false)
                }
            },
        )

        it('applies theme references directly to the correct elements', () => {
            render(<Icon icon={UserIcon} color={vars.color.primary.main} backgroundColor={vars.color.surface.main} borderColor={vars.color.border.main} data-testid="icon" />)
            const svg = screen.getByTestId('icon')

            expect(svg.style.color).toBe(vars.color.primary.main)
            expect(svg.parentElement!.style.backgroundColor).toBe(vars.color.surface.main)
            expect(svg.parentElement!.style.borderColor).toBe(vars.color.border.main)
        })

        it('preserves SVG style precedence and custom interaction classes', () => {
            render(<Icon icon={UserIcon} color="red" className="interaction-colors" style={{ color: 'var(--consumer-color)' }} data-testid="icon" />)
            const svg = screen.getByTestId('icon')

            expect(svg.style.color).toBe('var(--consumer-color)')
            expect(svg.getAttribute('class')).toContain('interaction-colors')
        })

        it('sets no inline color defaults on the SVG or wrapper', () => {
            render(<Icon icon={UserIcon} className="interaction-colors" data-testid="icon" />)
            const svg = screen.getByTestId('icon')

            expect(svg.style.color).toBe('')
            expect(svg.parentElement!.style.color).toBe('')
            expect(svg.parentElement!.style.backgroundColor).toBe('')
            expect(svg.parentElement!.style.borderColor).toBe('')
            expect(svg.getAttribute('class')).toContain('interaction-colors')
        })
    })

    describe('accessibility — decorative icon (no label)', () => {
        it('sets aria-hidden="true"', () => {
            const { container } = render(<Icon icon={UserIcon} />)
            expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
                'true',
            )
        })
    })

    describe('accessibility — semantic icon (with label)', () => {
        it('removes aria-hidden', () => {
            const { container } = render(
                <Icon icon={UserIcon} aria-label={'Home'} />,
            )
            const svg = container.querySelector('svg')
            // aria-hidden must be absent or "false" — never "true"
            expect(svg?.getAttribute('aria-hidden')).not.toBe('true')
        })

        it('sets role="img" and aria-label', () => {
            render(<Icon icon={UserIcon} aria-label={'Home'} />)
            // getByRole throws if not found, so finding the element is the assertion
            expect(screen.getByRole('img', { name: 'Home' })).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Icon"', () => {
            expect(Icon.displayName).toBe('Icon')
        })
    })
})
