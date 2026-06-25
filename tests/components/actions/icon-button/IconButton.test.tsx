import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { IconButton, iconButtonRecipe, type IconButtonVariant, type IconButtonColor, type IconButtonSize } from '@components/actions/icon-button'

// Helper

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

// Suites

describe('IconButton', () => {
    describe('default rendering', () => {
        it('renders a <button> element', () => {
            const { container } = render(<IconButton icon={'mdi:pencil'} aria-label={'Éditer'} />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('button')
        })

        it('sets aria-label on the button element', () => {
            render(<IconButton icon={'mdi:pencil'} aria-label={'Éditer'} />)
            expect(screen.getByRole('button', { name: 'Éditer' })).toBeTruthy()
        })

        it('renders an icon inside the button', () => {
            const { container } = render(<IconButton icon={'mdi:pencil'} aria-label={'Éditer'} />)
            expect(getFirstChild(container).firstElementChild).toBeTruthy()
        })
    })

    describe('variant styling', () => {
        const variants: IconButtonVariant[] = ['contained', 'outlined', 'ghost']

        it.each(variants)('applies a non-empty class for variant="%s"', (variant) => {
            const { container } = render(<IconButton variant={variant} icon={'mdi:pencil'} aria-label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('falls back to the contained variant when none is provided', () => {
            const { container } = render(<IconButton icon={'mdi:pencil'} aria-label={'btn'} />)
            expect(getFirstChild(container).className).toBe(iconButtonRecipe({ variant: 'contained', size: 'md' }))
        })

        it('produces distinct class names for each variant', () => {
            const classNames = variants.map((variant) => iconButtonRecipe({ variant }))
            expect(new Set(classNames).size).toBe(variants.length)
        })
    })

    describe('color styling', () => {
        const colors: IconButtonColor[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info']

        it.each(colors)('applies a non-empty class for color="%s"', (color) => {
            const { container } = render(<IconButton color={color} icon={'mdi:pencil'} aria-label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) => iconButtonRecipe({ color }))
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('size styling', () => {
        const sizes: IconButtonSize[] = ['sm', 'md', 'lg']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(<IconButton size={size} icon={'mdi:pencil'} aria-label={'btn'} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) => iconButtonRecipe({ size }))
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(<IconButton className={'my-custom-class'} icon={'mdi:pencil'} aria-label={'btn'} />)
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(<IconButton icon={'mdi:pencil'} aria-label={'btn'} />)
            for (const cls of iconButtonRecipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled prop is passed', () => {
            render(<IconButton disabled icon={'mdi:pencil'} aria-label={'btn'} />)
            expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true)
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<IconButton data-testid={'icon-btn'} icon={'mdi:pencil'} aria-label={'btn'} />)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('icon-btn')
        })

        it('forwards type attribute', () => {
            const { container } = render(<IconButton type={'submit'} icon={'mdi:pencil'} aria-label={'btn'} />)
            expect(getFirstChild(container).getAttribute('type')).toBe('submit')
        })
    })

    describe('click handling', () => {
        it('calls onClick when clicked', async () => {
            const onClick = vi.fn()
            render(<IconButton onClick={onClick} icon={'mdi:pencil'} aria-label={'btn'} />)
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const onClick = vi.fn()
            render(<IconButton disabled onClick={onClick} icon={'mdi:pencil'} aria-label={'btn'} />)
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).not.toHaveBeenCalled()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLButtonElement>()
            render(<IconButton ref={ref} icon={'mdi:pencil'} aria-label={'btn'} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('button')
        })
    })

    describe('displayName', () => {
        it('is set to "IconButton"', () => {
            expect(IconButton.displayName).toBe('IconButton')
        })
    })
})
