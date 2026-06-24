import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button, type ButtonVariant, type ButtonSize } from '@components/actions/button'

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

        it('renders nothing inside when label is omitted', () => {
            const { container } = render(<Button />)
            expect(getFirstChild(container)!.textContent).toBe('')
        })
    })

    describe('variant classes', () => {
        const variants: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost']

        it.each(variants)('applies classes for variant="%s"', (variant) => {
            const { container } = render(<Button variant={variant} label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('applies default variant classes when no variant is provided', () => {
            const { container } = render(<Button label={'btn'} />)
            expect(getFirstChild(container).className).toContain('bg-primary')
        })

        it('applies destructive classes', () => {
            const { container } = render(<Button variant={'destructive'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('bg-destructive')
        })

        it('applies outline classes', () => {
            const { container } = render(<Button variant={'outline'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('border')
        })

        it('applies ghost classes', () => {
            const { container } = render(<Button variant={'ghost'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('hover:bg-accent')
        })
    })

    describe('interactive state classes', () => {
        it('applies hover classes for the default variant', () => {
            const { container } = render(<Button label={'btn'} />)
            expect(getFirstChild(container).className).toContain('hover:bg-primary/90')
        })

        it('applies active classes for the default variant', () => {
            const { container } = render(<Button label={'btn'} />)
            expect(getFirstChild(container).className).toContain('active:bg-primary/80')
        })

        it('applies active classes for the destructive variant', () => {
            const { container } = render(<Button variant={'destructive'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('active:bg-destructive/80')
        })
    })

    describe('style — no shadow, reduced radius', () => {
        it('does not apply any box-shadow class', () => {
            const { container } = render(<Button label={'btn'} />)
            expect(getFirstChild(container).className).not.toMatch(/\bshadow\b/)
        })

        it('uses rounded-sm (not rounded-md)', () => {
            const { container } = render(<Button label={'btn'} />)
            expect(getFirstChild(container).className).toContain('rounded-sm')
            expect(getFirstChild(container).className).not.toContain('rounded-md')
        })
    })

    describe('size classes', () => {
        const sizes: ButtonSize[] = ['default', 'sm', 'lg', 'icon']

        it.each(sizes)('applies classes for size="%s"', (size) => {
            const { container } = render(<Button size={size} label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('applies sm size class', () => {
            const { container } = render(<Button size={'sm'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('h-9')
        })

        it('applies lg size class', () => {
            const { container } = render(<Button size={'lg'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('h-11')
        })

        it('applies icon size class', () => {
            const { container } = render(<Button size={'icon'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('w-10')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(<Button className={'my-custom-class'} label={'btn'} />)
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies base inline-flex class', () => {
            const { container } = render(<Button label={'btn'} />)
            expect(getFirstChild(container).className).toContain('inline-flex')
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled prop is passed', () => {
            render(<Button disabled label={'btn'} />)
            expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true)
        })

        it('applies disabled opacity class', () => {
            const { container } = render(<Button disabled label={'btn'} />)
            expect(getFirstChild(container).className).toContain('disabled:opacity-50')
        })

        it('applies disabled pointer-events class', () => {
            const { container } = render(<Button disabled label={'btn'} />)
            expect(getFirstChild(container).className).toContain('disabled:pointer-events-none')
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
