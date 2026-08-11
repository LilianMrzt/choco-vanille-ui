import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AvatarRoot from '@components/data-display/avatar/components/avatar-root/AvatarRoot.tsx'
import { AVATAR_STYLES } from '@components/data-display/avatar/components/avatar-root/styles/AvatarRoot.css.ts'
import type {
    AvatarColor,
    AvatarShape,
    AvatarSize,
} from '@components/data-display/avatar/types/Avatar.types.ts'

const SIZES: AvatarSize[] = ['sm', 'md', 'lg', 'xl']
const SHAPES: AvatarShape[] = ['circle', 'square']
const COLORS: AvatarColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
]
describe('AvatarRoot', () => {
    describe('default rendering', () => {
        it('renders a <span> element', () => {
            const { container } = render(<AvatarRoot>content</AvatarRoot>)
            expect(
                (container.firstElementChild as HTMLElement).tagName.toLowerCase(),
            ).toBe('span')
        })

        it('renders its children', () => {
            render(
                <AvatarRoot>
                    <span data-testid="child">child</span>
                </AvatarRoot>,
            )
            expect(screen.getByTestId('child')).toBeTruthy()
        })
    })

    describe('size prop', () => {
        it.each(SIZES)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(
                <AvatarRoot size={size}>content</AvatarRoot>,
            )
            expect(
                (container.firstElementChild as HTMLElement).className.length,
            ).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classes = SIZES.map((size) => AVATAR_STYLES.recipe({ size }))
            expect(new Set(classes).size).toBe(SIZES.length)
        })
    })

    describe('shape prop', () => {
        it.each(SHAPES)('applies a non-empty class for shape="%s"', (shape) => {
            const { container } = render(
                <AvatarRoot shape={shape}>content</AvatarRoot>,
            )
            expect(
                (container.firstElementChild as HTMLElement).className.length,
            ).toBeGreaterThan(0)
        })

        it('produces distinct class names for each shape', () => {
            const classes = SHAPES.map((shape) => AVATAR_STYLES.recipe({ shape }))
            expect(new Set(classes).size).toBe(SHAPES.length)
        })
    })

    describe('color prop', () => {
        it.each(COLORS)('applies a non-empty class for color="%s"', (color) => {
            const { container } = render(
                <AvatarRoot color={color}>content</AvatarRoot>,
            )
            expect(
                (container.firstElementChild as HTMLElement).className.length,
            ).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classes = COLORS.map((color) => AVATAR_STYLES.recipe({ color }))
            expect(new Set(classes).size).toBe(COLORS.length)
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<AvatarRoot>content</AvatarRoot>)
            expect(
                (container.firstElementChild as HTMLElement).className.length,
            ).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(
                <AvatarRoot className="my-root">content</AvatarRoot>,
            )
            expect((container.firstElementChild as HTMLElement).className).toContain(
                'my-root',
            )
        })
    })

    describe('accessible name', () => {
        it('forwards aria-label to the root element', () => {
            const { container } = render(
                <AvatarRoot aria-label="John Doe">content</AvatarRoot>,
            )
            expect(
                (container.firstElementChild as HTMLElement).getAttribute('aria-label'),
            ).toBe('John Doe')
        })

        it('forwards role to the root element', () => {
            const { container } = render(<AvatarRoot role="img">content</AvatarRoot>)
            expect(
                (container.firstElementChild as HTMLElement).getAttribute('role'),
            ).toBe('img')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying <span>', () => {
            const ref = createRef<HTMLSpanElement>()
            render(<AvatarRoot ref={ref}>content</AvatarRoot>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <AvatarRoot data-testid="root">content</AvatarRoot>,
            )
            expect(
                (container.firstElementChild as HTMLElement).getAttribute(
                    'data-testid',
                ),
            ).toBe('root')
        })
    })

    describe('displayName', () => {
        it('is set to "Avatar.Root"', () => {
            expect(AvatarRoot.displayName).toBe('Avatar.Root')
        })
    })
})
