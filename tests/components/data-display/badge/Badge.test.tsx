import { CHECK_ICON as CheckIcon, CLOSE_ICON as CloseIcon } from '@constants/icon-registry'
import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    Badge,
    BADGE_STYLES,
    type BadgeColor,
    type BadgeSize,
    type BadgeVariant,
} from '@components/data-display/badge'
import { BOX_STYLES } from '@components/layout/box/Box.css.ts'

// Helpers

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

// Suites

describe('Badge', () => {
    it('uses primitive layout presets and lets consumer props and style override them', () => {
        const { container } = render(
            <Badge
                label={'Custom'}
                size={'lg'}
                paddingX={16}
                minHeight={'3rem'}
                style={{ minHeight: '4rem', color: 'rebeccapurple' }}
            />,
        )
        const badge = getFirstChild(container)

        expect(badge.style.display).toBe('inline-flex')
        expect(badge.style.alignItems).toBe('center')
        expect(badge.style.justifyContent).toBe('center')
        expect(badge.style.minWidth).toBe('1.75rem')
        expect(badge.style.minHeight).toBe('4rem')
        expect(badge.style.color).toBe('rebeccapurple')
        for (const className of BOX_STYLES.recipe({ paddingX: 16, paddingY: 4, gap: 4, borderRadius: 4 }).split(' ')) {
            expect(badge.classList.contains(className)).toBe(true)
        }
        for (const prop of ['label', 'variant', 'size', 'color', 'startIcon', 'endIcon', 'paddingX']) {
            expect(badge.hasAttribute(prop)).toBe(false)
        }
    })

    it('forwards native events and keeps both icons decorative', async () => {
        const handleClick = vi.fn()
        const { container } = render(
            <Badge
                label={'Verified'}
                onClick={handleClick}
                startIcon={CheckIcon}
                endIcon={CloseIcon}
            />,
        )

        await userEvent.click(screen.getByText('Verified'))

        expect(handleClick).toHaveBeenCalledOnce()
        for (const icon of container.querySelectorAll('svg')) {
            expect(icon.getAttribute('aria-hidden')).toBe('true')
        }
    })

    describe('default rendering', () => {
        it('renders a <span> element by default', () => {
            const { container } = render(<Badge label={'New'} />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('span')
        })

        it('renders its label via a Typography span', () => {
            render(<Badge label={'Beta'} />)
            expect(screen.getByText('Beta')).toBeTruthy()
            expect(screen.getByText('Beta').tagName.toLowerCase()).toBe('span')
        })

        it('renders a start icon when startIcon is provided', () => {
            const { container } = render(
                <Badge label={'Beta'} startIcon={CheckIcon} />,
            )
            expect(container.querySelectorAll('svg')).toHaveLength(1)
        })

        it('renders an end icon when endIcon is provided', () => {
            const { container } = render(
                <Badge label={'Beta'} endIcon={CloseIcon} />,
            )
            expect(container.querySelectorAll('svg')).toHaveLength(1)
        })

        it('renders both icons when both are provided', () => {
            const { container } = render(
                <Badge label={'Beta'} startIcon={CheckIcon} endIcon={CloseIcon} />,
            )
            expect(container.querySelectorAll('svg')).toHaveLength(2)
        })

        it('uses inline-flex display by default', () => {
            const { container } = render(<Badge label={'Beta'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })
    })

    describe('variant styling', () => {
        const variants: BadgeVariant[] = ['contained', 'subtle', 'outlined']

        it.each(variants)(
            'applies a non-empty class for variant="%s"',
            (variant) => {
                const { container } = render(
                    <Badge variant={variant} label={'badge'} />,
                )
                expect(getFirstChild(container).className.length).toBeGreaterThan(0)
            },
        )

        it('falls back to the outlinedSubtle variant when none is provided', () => {
            const { container } = render(<Badge label={'badge'} />)
            expect(getFirstChild(container).className).toContain(
                BADGE_STYLES.recipe({ variant: 'outlinedSubtle', size: 'md' }),
            )
        })

        it('produces distinct class names for each variant', () => {
            const classNames = variants.map((variant) =>
                BADGE_STYLES.recipe({ variant }),
            )
            expect(new Set(classNames).size).toBe(variants.length)
        })
    })

    describe('color styling', () => {
        const colors: BadgeColor[] = [
            'primary',
            'secondary',
            'danger',
            'success',
            'warning',
            'info',
            'purple',
            'pink',
            'orange',
            'teal',
            'cyan',
            'indigo',
        ]

        it.each(colors)('applies a non-empty class for color="%s"', (color) => {
            const { container } = render(<Badge color={color} label={'badge'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) => BADGE_STYLES.recipe({ color }))
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('size styling', () => {
        const sizes: BadgeSize[] = ['sm', 'md', 'lg']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(<Badge size={size} label={'badge'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) => BADGE_STYLES.recipe({ size }))
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Badge className={'my-custom-class'} label={'badge'} />,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(<Badge label={'badge'} />)
            for (const cls of BADGE_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('Box prop passthrough', () => {
        it('forwards radius prop to Box', () => {
            const { container } = render(
                <Badge borderRadius={8} label={'badge'} />,
            )
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('forwards width prop to Box', () => {
            const { container } = render(<Badge width={'fit'} label={'badge'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('forwards data-* attributes', () => {
            const { container } = render(
                <Badge data-testid={'my-badge'} label={'badge'} />,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'my-badge',
            )
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLElement>()
            render(<Badge ref={ref} label={'badge'} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "Badge"', () => {
            expect(Badge.displayName).toBe('Badge')
        })
    })
})
