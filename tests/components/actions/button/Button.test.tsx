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
            const { container } = render(<Button>Click me</Button>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('button')
        })

        it('renders its text content', () => {
            render(<Button>Save</Button>)
            expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy()
        })
    })

    describe('variant classes', () => {
        const variants: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']

        it.each(variants)('applies classes for variant="%s"', (variant) => {
            const { container } = render(<Button variant={variant}>btn</Button>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('applies default variant classes when no variant is provided', () => {
            const { container } = render(<Button>btn</Button>)
            expect(getFirstChild(container).className).toContain('bg-primary')
        })

        it('applies destructive classes', () => {
            const { container } = render(<Button variant={'destructive'}>btn</Button>)
            expect(getFirstChild(container).className).toContain('bg-destructive')
        })

        it('applies outline classes', () => {
            const { container } = render(<Button variant={'outline'}>btn</Button>)
            expect(getFirstChild(container).className).toContain('border')
        })

        it('applies ghost classes', () => {
            const { container } = render(<Button variant={'ghost'}>btn</Button>)
            expect(getFirstChild(container).className).toContain('hover:bg-accent')
        })

        it('applies link classes', () => {
            const { container } = render(<Button variant={'link'}>btn</Button>)
            expect(getFirstChild(container).className).toContain('underline-offset-4')
        })
    })

    describe('size classes', () => {
        const sizes: ButtonSize[] = ['default', 'sm', 'lg', 'icon']

        it.each(sizes)('applies classes for size="%s"', (size) => {
            const { container } = render(<Button size={size}>btn</Button>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('applies sm size class', () => {
            const { container } = render(<Button size={'sm'}>btn</Button>)
            expect(getFirstChild(container).className).toContain('h-9')
        })

        it('applies lg size class', () => {
            const { container } = render(<Button size={'lg'}>btn</Button>)
            expect(getFirstChild(container).className).toContain('h-11')
        })

        it('applies icon size class', () => {
            const { container } = render(<Button size={'icon'}>btn</Button>)
            expect(getFirstChild(container).className).toContain('w-10')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(<Button className={'my-custom-class'}>btn</Button>)
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies base inline-flex class', () => {
            const { container } = render(<Button>btn</Button>)
            expect(getFirstChild(container).className).toContain('inline-flex')
        })
    })

    describe('asChild — Radix Slot polymorphism', () => {
        it('renders as the child element when asChild=true', () => {
            const { container } = render(
                <Button asChild>
                    <a href={'#'}>link</a>
                </Button>,
            )
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('a')
        })

        it('forwards button classes to the child element', () => {
            const { container } = render(
                <Button asChild variant={'outline'}>
                    <a href={'#'}>link</a>
                </Button>,
            )
            expect(getFirstChild(container).className).toContain('border')
        })

        it('still renders as <button> when asChild=false', () => {
            const { container } = render(<Button asChild={false}>btn</Button>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('button')
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled prop is passed', () => {
            render(<Button disabled>btn</Button>)
            expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true)
        })

        it('applies disabled opacity class', () => {
            const { container } = render(<Button disabled>btn</Button>)
            expect(getFirstChild(container).className).toContain('disabled:opacity-50')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<Button data-testid={'btn'}>btn</Button>)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('btn')
        })

        it('forwards aria-* attributes', () => {
            render(<Button aria-label={'Save document'}>btn</Button>)
            expect(screen.getByRole('button', { name: 'Save document' })).toBeTruthy()
        })

        it('forwards type attribute', () => {
            const { container } = render(<Button type={'submit'}>btn</Button>)
            expect(getFirstChild(container).getAttribute('type')).toBe('submit')
        })
    })

    describe('click handling', () => {
        it('calls onClick when clicked', async () => {
            const onClick = vi.fn()
            render(<Button onClick={onClick}>btn</Button>)
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const onClick = vi.fn()
            render(<Button disabled onClick={onClick}>btn</Button>)
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).not.toHaveBeenCalled()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLButtonElement>()
            render(<Button ref={ref}>btn</Button>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('button')
        })

        it('forwards the ref to the child element when asChild is used', () => {
            const ref = createRef<HTMLButtonElement>()
            render(
                <Button asChild ref={ref}>
                    <a href={'#'}>link</a>
                </Button>,
            )
            expect(ref.current!.tagName.toLowerCase()).toBe('a')
        })
    })

    describe('displayName', () => {
        it('is set to "Button"', () => {
            expect(Button.displayName).toBe('Button')
        })
    })
})
