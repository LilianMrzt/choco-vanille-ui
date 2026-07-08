import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    ToggleButton,
    TOGGLE_BUTTON_STYLES,
    type ToggleButtonColor,
    type ToggleButtonSize,
} from '@components/actions/toggle-button'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('ToggleButton', () => {
    describe('default rendering', () => {
        it('renders a <button> element by default', () => {
            const { container } = render(<ToggleButton label={'Toggle'} />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('button')
        })

        it('renders its label via a Typography span', () => {
            render(<ToggleButton label={'Bold'} />)
            expect(screen.getByRole('button', { name: 'Bold' })).toBeTruthy()
            expect(screen.getByText('Bold').tagName.toLowerCase()).toBe('span')
        })

        it('renders start and end icons when provided', () => {
            const { container } = render(
                <ToggleButton
                    label="Save"
                    startIcon="lucide:check"
                    endIcon="lucide:arrow-right"
                />,
            )
            expect(container.querySelectorAll('button > *').length).toBe(3)
        })
    })

    describe('pressed state', () => {
        it('toggles pressed state when clicked', async () => {
            render(<ToggleButton label={'Toggle'} />)
            const button = screen.getByRole('button', { name: 'Toggle' })

            expect(button.getAttribute('aria-pressed')).toBe('false')
            await userEvent.click(button)
            expect(button.getAttribute('aria-pressed')).toBe('true')
            await userEvent.click(button)
            expect(button.getAttribute('aria-pressed')).toBe('false')
        })

        it('calls onPressedChange when pressed state changes', async () => {
            const onPressedChange = vi.fn()
            render(<ToggleButton label={'Toggle'} onPressedChange={onPressedChange} />)
            await userEvent.click(screen.getByRole('button'))
            expect(onPressedChange).toHaveBeenCalledWith(true, expect.any(Object))
        })

        it('supports controlled pressed state', () => {
            const { rerender } = render(<ToggleButton label={'Toggle'} pressed={false} />)
            expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('false')

            rerender(<ToggleButton label={'Toggle'} pressed={true} />)
            expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('true')
        })
    })

    describe('color styling', () => {
        const colors: ToggleButtonColor[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info']

        it.each(colors)('applies a non-empty class for color="%s"', (color) => {
            const { container } = render(<ToggleButton color={color} label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) => TOGGLE_BUTTON_STYLES.recipe({ color }))
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('size styling', () => {
        const sizes: ToggleButtonSize[] = ['sm', 'md', 'lg']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(<ToggleButton size={size} label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) => TOGGLE_BUTTON_STYLES.recipe({ size }))
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(<ToggleButton className={'my-custom-class'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(<ToggleButton label={'btn'} />)
            for (const cls of TOGGLE_BUTTON_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled prop is passed', () => {
            render(<ToggleButton disabled label={'btn'} />)
            expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true)
        })

        it('does not toggle when disabled', async () => {
            render(<ToggleButton disabled label={'btn'} />)
            const button = screen.getByRole('button')
            await userEvent.click(button)
            expect(button.getAttribute('aria-pressed')).toBe('false')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<ToggleButton data-testid={'btn'} label={'btn'} />)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('btn')
        })

        it('forwards aria-* attributes', () => {
            render(<ToggleButton aria-label={'Save document'} label={'btn'} />)
            expect(screen.getByRole('button', { name: 'Save document' })).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLButtonElement>()
            render(<ToggleButton ref={ref} label={'btn'} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('button')
        })
    })

    describe('displayName', () => {
        it('is set to "ToggleButton"', () => {
            expect(ToggleButton.displayName).toBe('ToggleButton')
        })
    })
})
