import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { Badge, BADGE_STYLES, type BadgeColor, type BadgeSize, type BadgeVariant } from '@components/data-display/badge'

// Preload a test icon so Iconify renders synchronously in JSDOM
beforeAll(() => {
    addIcon('mdi:check', {
        body: '<path d="M21 7L9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z"/>',
        width: 24,
        height: 24,
    })
    addIcon('mdi:close', {
        body: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
        width: 24,
        height: 24,
    })
})

// Helpers

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

// Suites

describe('Badge', () => {
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
            const { container } = render(<Badge label={'Beta'} startIcon={'mdi:check'} />)
            expect(container.querySelectorAll('svg')).toHaveLength(1)
        })

        it('renders an end icon when endIcon is provided', () => {
            const { container } = render(<Badge label={'Beta'} endIcon={'mdi:close'} />)
            expect(container.querySelectorAll('svg')).toHaveLength(1)
        })

        it('renders both icons when both are provided', () => {
            const { container } = render(<Badge label={'Beta'} startIcon={'mdi:check'} endIcon={'mdi:close'} />)
            expect(container.querySelectorAll('svg')).toHaveLength(2)
        })

        it('uses inline-flex display by default', () => {
            const { container } = render(<Badge label={'Beta'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })
    })

    describe('variant styling', () => {
        const variants: BadgeVariant[] = ['solid', 'subtle', 'outline']

        it.each(variants)('applies a non-empty class for variant="%s"', (variant) => {
            const { container } = render(<Badge variant={variant} label={'badge'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('falls back to the subtle variant when none is provided', () => {
            const { container } = render(<Badge label={'badge'} />)
            expect(getFirstChild(container).className).toContain(
                BADGE_STYLES.recipe({ variant: 'subtle', size: 'md' }),
            )
        })

        it('produces distinct class names for each variant', () => {
            const classNames = variants.map((variant) => BADGE_STYLES.recipe({ variant }))
            expect(new Set(classNames).size).toBe(variants.length)
        })
    })

    describe('color styling', () => {
        const colors: BadgeColor[] = [
            'primary',
            'secondary',
            'destructive',
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
            const { container } = render(<Badge className={'my-custom-class'} label={'badge'} />)
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
            const { container } = render(<Badge borderRadius={'md'} label={'badge'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('forwards width prop to Box', () => {
            const { container } = render(<Badge width={'fit'} label={'badge'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('forwards data-* attributes', () => {
            const { container } = render(<Badge data-testid={'my-badge'} label={'badge'} />)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('my-badge')
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
