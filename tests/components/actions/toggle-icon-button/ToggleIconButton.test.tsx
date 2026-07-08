import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    ToggleIconButton,
    TOGGLE_ICON_BUTTON_STYLES,
    type ToggleIconButtonColor,
    type ToggleIconButtonSize,
} from '@components/actions/toggle-icon-button'

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

describe('ToggleIconButton', () => {
    describe('default rendering', () => {
        it('renders a <button> element by default', () => {
            const { container } = render(
                <ToggleIconButton icon="lucide:bold" aria-label="Bold" />,
            )
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('button')
        })

        it('renders the icon inside the button', () => {
            const { container } = render(
                <ToggleIconButton icon="lucide:bold" aria-label="Bold" />,
            )
            expect(container.querySelector('button > *')).toBeTruthy()
        })

        it('uses the aria-label as the accessible name', () => {
            render(<ToggleIconButton icon="lucide:bold" aria-label="Bold" />)
            expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy()
        })
    })

    describe('pressed state', () => {
        it('toggles pressed state when clicked', async () => {
            render(<ToggleIconButton icon="lucide:bold" aria-label="Bold" />)
            const button = screen.getByRole('button', { name: 'Bold' })

            expect(button.getAttribute('aria-pressed')).toBe('false')
            await userEvent.click(button)
            expect(button.getAttribute('aria-pressed')).toBe('true')
            await userEvent.click(button)
            expect(button.getAttribute('aria-pressed')).toBe('false')
        })

        it('calls onPressedChange when pressed state changes', async () => {
            const onPressedChange = vi.fn()
            render(
                <ToggleIconButton
                    icon="lucide:bold"
                    aria-label="Bold"
                    onPressedChange={onPressedChange}
                />,
            )
            await userEvent.click(screen.getByRole('button'))
            expect(onPressedChange).toHaveBeenCalledWith(true, expect.any(Object))
        })

        it('supports controlled pressed state', () => {
            const { rerender } = render(
                <ToggleIconButton
                    icon="lucide:bold"
                    aria-label="Bold"
                    pressed={false}
                />,
            )
            expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe(
                'false',
            )

            rerender(
                <ToggleIconButton
                    icon="lucide:bold"
                    aria-label="Bold"
                    pressed={true}
                />,
            )
            expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe(
                'true',
            )
        })
    })

    describe('color styling', () => {
        const colors: ToggleIconButtonColor[] = [
            'primary',
            'secondary',
            'destructive',
            'success',
            'warning',
            'info',
        ]

        it.each(colors)('applies a non-empty class for color="%s"', (color) => {
            const { container } = render(
                <ToggleIconButton color={color} icon="lucide:bold" aria-label="Bold" />,
            )
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) =>
                TOGGLE_ICON_BUTTON_STYLES.recipe({ color }),
            )
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('size styling', () => {
        const sizes: ToggleIconButtonSize[] = ['xs', 'sm', 'md', 'lg']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(
                <ToggleIconButton size={size} icon="lucide:bold" aria-label="Bold" />,
            )
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) =>
                TOGGLE_ICON_BUTTON_STYLES.recipe({ size }),
            )
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <ToggleIconButton
                    className={'my-custom-class'}
                    icon="lucide:bold"
                    aria-label="Bold"
                />,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(
                <ToggleIconButton icon="lucide:bold" aria-label="Bold" />,
            )
            for (const cls of TOGGLE_ICON_BUTTON_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled prop is passed', () => {
            render(
                <ToggleIconButton disabled icon="lucide:bold" aria-label="Bold" />,
            )
            expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(
                true,
            )
        })

        it('does not toggle when disabled', async () => {
            render(
                <ToggleIconButton disabled icon="lucide:bold" aria-label="Bold" />,
            )
            const button = screen.getByRole('button')
            await userEvent.click(button)
            expect(button.getAttribute('aria-pressed')).toBe('false')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <ToggleIconButton
                    data-testid={'btn'}
                    icon="lucide:bold"
                    aria-label="Bold"
                />,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('btn')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLButtonElement>()
            render(
                <ToggleIconButton ref={ref} icon="lucide:bold" aria-label="Bold" />,
            )
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('button')
        })
    })

    describe('displayName', () => {
        it('is set to "ToggleIconButton"', () => {
            expect(ToggleIconButton.displayName).toBe('ToggleIconButton')
        })
    })
})
