import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button, BUTTON_STYLES, type ButtonVariant, type ButtonColor, type ButtonSize } from '@components/actions/button'

// Helper

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

// Suites

describe('Button', () => {
    describe('default rendering', () => {
        it('renders a <button> element by default', () => {
            const { container } = render(<Button label={'Click me'} />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('button')
        })

        it('renders its label via a Typography span', () => {
            render(<Button label={'Save'} />)
            expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy()
            expect(screen.getByText('Save').tagName.toLowerCase()).toBe('span')
        })

        it('renders start and end icons when provided', () => {
            const { container } = render(
                <Button
                    label="Save"
                    startIcon="lucide:check"
                    endIcon="lucide:arrow-right"
                />,
            )
            expect(container.querySelectorAll('svg').length).toBe(2)
        })
    })

    describe('variant styling', () => {
        const variants: ButtonVariant[] = ['contained', 'outlined', 'ghost']

        it.each(variants)('applies a non-empty class for variant="%s"', (variant) => {
            const { container } = render(<Button variant={variant} label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('falls back to the contained variant when none is provided', () => {
            const { container } = render(<Button label={'btn'} />)
            expect(getFirstChild(container).className).toBe(BUTTON_STYLES.recipe({ variant: 'contained', size: 'md' }))
        })

        it('produces distinct class names for each variant', () => {
            const classNames = variants.map((variant) => BUTTON_STYLES.recipe({ variant }))
            expect(new Set(classNames).size).toBe(variants.length)
        })
    })

    describe('color styling', () => {
        const colors: ButtonColor[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info']

        it.each(colors)('applies a non-empty class for color="%s"', (color) => {
            const { container } = render(<Button color={color} label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) => BUTTON_STYLES.recipe({ color }))
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('size styling', () => {
        const sizes: ButtonSize[] = ['sm', 'md', 'lg']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(<Button size={size} label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) => BUTTON_STYLES.recipe({ size }))
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(<Button className={'my-custom-class'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(<Button label={'btn'} />)
            for (const cls of BUTTON_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled prop is passed', () => {
            render(<Button disabled label={'btn'} />)
            expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true)
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<Button data-testid={'btn'} label={'btn'} />)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('btn')
        })

        it('forwards aria-* attributes', () => {
            render(<Button aria-label={'Save document'} label={'btn'} />)
            expect(screen.getByRole('button', { name: 'Save document' })).toBeTruthy()
        })

        it('forwards type attribute', () => {
            const { container } = render(<Button type={'submit'} label={'btn'} />)
            expect(getFirstChild(container).getAttribute('type')).toBe('submit')
        })
    })

    describe('click handling', () => {
        it('calls onClick when clicked', async () => {
            const onClick = vi.fn()
            render(<Button onClick={onClick} label={'btn'} />)
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const onClick = vi.fn()
            render(<Button disabled onClick={onClick} label={'btn'} />)
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).not.toHaveBeenCalled()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLButtonElement>()
            render(<Button ref={ref} label={'btn'} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('button')
        })
    })

    describe('displayName', () => {
        it('is set to "Button"', () => {
            expect(Button.displayName).toBe('Button')
        })
    })
})
