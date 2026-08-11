import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    Toggle,
    TOGGLE_STYLES,
    type ToggleVariant,
    type ToggleColor,
    type ToggleSize,
} from '@components/actions/toggle'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'

// Helper

const getButton = () => screen.getByRole('button')
const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

// Suites

describe('Toggle', () => {
    describe('default rendering', () => {
        it('renders a <button> element', () => {
            const { container } = render(<Toggle label={'Bold'} />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('button')
        })

        it('renders the label text', () => {
            render(<Toggle label={'Bold'} />)
            expect(screen.getByText('Bold')).toBeTruthy()
        })

        it('renders an icon-only button when icon prop is provided', () => {
            const { container } = render(
                <Toggle icon={CheckIcon} aria-label={'Check'} />,
            )
            expect(container.querySelector('svg')).toBeTruthy()
            expect(getFirstChild(container).getAttribute('data-icon-only')).toBe('')
        })

        it('renders start and end icons alongside the label', () => {
            const { container } = render(
                <Toggle
                    label={'Save'}
                    startIcon={CheckIcon}
                    endIcon={ChevronRightIcon}
                />,
            )
            expect(container.querySelectorAll('svg').length).toBe(2)
        })

        it('does not set data-icon-only when using label mode', () => {
            const { container } = render(<Toggle label={'Bold'} />)
            expect(
                getFirstChild(container).getAttribute('data-icon-only'),
            ).toBeNull()
        })
    })

    describe('variant styling', () => {
        const variants: ToggleVariant[] = ['ghost', 'outlined']

        it.each(variants)(
            'applies a non-empty class for variant="%s"',
            (variant) => {
                const { container } = render(
                    <Toggle variant={variant} label={'btn'} />,
                )
                expect(getFirstChild(container).className.length).toBeGreaterThan(0)
            },
        )

        it('falls back to the outlined variant when none is provided', () => {
            const { container } = render(<Toggle label={'btn'} />)
            expect(getFirstChild(container).className).toBe(
                TOGGLE_STYLES.recipe({ variant: 'outlined', size: 'md' }),
            )
        })

        it('produces distinct class names for each variant', () => {
            const classNames = variants.map((variant) =>
                TOGGLE_STYLES.recipe({ variant }),
            )
            expect(new Set(classNames).size).toBe(variants.length)
        })
    })

    describe('color styling', () => {
        const colors: ToggleColor[] = [
            'primary',
            'secondary',
            'destructive',
            'success',
            'warning',
            'info',
        ]

        it.each(colors)('applies a non-empty class for color="%s"', (color) => {
            const { container } = render(<Toggle color={color} label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) => TOGGLE_STYLES.recipe({ color }))
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('size styling', () => {
        const sizes: ToggleSize[] = ['sm', 'md', 'lg']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(<Toggle size={size} label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) => TOGGLE_STYLES.recipe({ size }))
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Toggle className={'my-toggle'} label={'btn'} />,
            )
            expect(getFirstChild(container).className).toContain('my-toggle')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(<Toggle label={'btn'} />)
            for (const cls of TOGGLE_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('pressed state — uncontrolled', () => {
        it('starts unpressed by default', () => {
            const { container } = render(<Toggle label={'Bold'} />)
            expect(getFirstChild(container).getAttribute('data-pressed')).toBeNull()
        })

        it('becomes pressed after a click', async () => {
            const { container } = render(<Toggle label={'Bold'} />)
            await userEvent.click(getButton())
            expect(
                getFirstChild(container).getAttribute('data-pressed'),
            ).not.toBeNull()
        })

        it('toggles back to unpressed on a second click', async () => {
            const { container } = render(<Toggle label={'Bold'} />)
            await userEvent.click(getButton())
            await userEvent.click(getButton())
            expect(getFirstChild(container).getAttribute('data-pressed')).toBeNull()
        })

        it('starts pressed when defaultPressed={true}', () => {
            const { container } = render(<Toggle defaultPressed label={'Bold'} />)
            expect(
                getFirstChild(container).getAttribute('data-pressed'),
            ).not.toBeNull()
        })
    })

    describe('pressed state — controlled', () => {
        it('renders as pressed when pressed={true}', () => {
            const { container } = render(<Toggle pressed label={'Bold'} />)
            expect(
                getFirstChild(container).getAttribute('data-pressed'),
            ).not.toBeNull()
        })

        it('renders as unpressed when pressed={false}', () => {
            const { container } = render(<Toggle pressed={false} label={'Bold'} />)
            expect(getFirstChild(container).getAttribute('data-pressed')).toBeNull()
        })
    })

    describe('onPressedChange callback', () => {
        it('calls onPressedChange with true when an unpressed toggle is clicked', async () => {
            const onPressedChange = vi.fn()
            render(<Toggle label={'Bold'} onPressedChange={onPressedChange} />)
            await userEvent.click(getButton())
            expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything())
        })

        it('calls onPressedChange with false when a pressed toggle is clicked', async () => {
            const onPressedChange = vi.fn()
            render(
                <Toggle
                    defaultPressed
                    label={'Bold'}
                    onPressedChange={onPressedChange}
                />,
            )
            await userEvent.click(getButton())
            expect(onPressedChange).toHaveBeenCalledWith(false, expect.anything())
        })
    })

    describe('disabled state', () => {
        it('marks the button as disabled', () => {
            render(<Toggle disabled label={'Bold'} />)
            expect((getButton() as HTMLButtonElement).disabled).toBe(true)
        })

        it('does not call onClick when disabled', async () => {
            const onClick = vi.fn()
            render(<Toggle disabled onClick={onClick} label={'Bold'} />)
            await userEvent.click(getButton())
            expect(onClick).not.toHaveBeenCalled()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <Toggle data-testid={'toggle'} label={'btn'} />,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'toggle',
            )
        })

        it('forwards aria-* attributes', () => {
            const { container } = render(
                <Toggle aria-describedby={'hint'} label={'Bold'} />,
            )
            expect(getFirstChild(container).getAttribute('aria-describedby')).toBe(
                'hint',
            )
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying button element', () => {
            const ref = createRef<HTMLButtonElement>()
            render(<Toggle ref={ref} label={'Bold'} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('button')
        })
    })

    describe('displayName', () => {
        it('is set to "Toggle"', () => {
            expect(Toggle.displayName).toBe('Toggle')
        })
    })
})
