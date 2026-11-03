import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
    IconButton,
    ICON_BUTTON_STYLES,
    type IconButtonVariant,
    type IconButtonColor,
    type IconButtonSize,
} from '@components/actions/icon-button'
import { BOX_STYLES } from '@components/layout/box'
import BoldIcon from '@resources/asset/BoldIcon.svg?react'

// Helper

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

// Suites

describe('IconButton', () => {
    describe('default rendering', () => {
        it('renders a <button> element', () => {
            const { container } = render(
                <IconButton icon={BoldIcon} aria-label={'Éditer'} />,
            )
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('button')
        })

        it('sets aria-label on the button element', () => {
            render(<IconButton icon={BoldIcon} aria-label={'Éditer'} />)
            expect(screen.getByRole('button', { name: 'Éditer' })).toBeTruthy()
        })

        it('renders an icon inside the button', () => {
            const { container } = render(
                <IconButton icon={BoldIcon} aria-label={'Éditer'} />,
            )
            expect(getFirstChild(container).firstElementChild).toBeTruthy()
        })
    })

    describe('variant styling', () => {
        const variants: IconButtonVariant[] = ['contained', 'outlined', 'ghost']

        it.each(variants)(
            'applies a non-empty class for variant="%s"',
            (variant) => {
                const { container } = render(
                    <IconButton variant={variant} icon={BoldIcon} aria-label={'btn'} />,
                )
                expect(getFirstChild(container).className.length).toBeGreaterThan(0)
            },
        )

        it('falls back to the contained variant when none is provided', () => {
            const { container } = render(
                <IconButton icon={BoldIcon} aria-label={'btn'} />,
            )
            expect(getFirstChild(container).className).toBe(
                ICON_BUTTON_STYLES.recipe({ variant: 'contained', size: 'md' }),
            )
        })

        it('produces distinct class names for each variant', () => {
            const classNames = variants.map((variant) =>
                ICON_BUTTON_STYLES.recipe({ variant }),
            )
            expect(new Set(classNames).size).toBe(variants.length)
        })
    })

    describe('color styling', () => {
        const colors: IconButtonColor[] = [
            'primary',
            'secondary',
            'destructive',
            'success',
            'warning',
            'info',
        ]

        it.each(colors)('applies a non-empty class for color="%s"', (color) => {
            const { container } = render(
                <IconButton color={color} icon={BoldIcon} aria-label={'btn'} />,
            )
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) =>
                ICON_BUTTON_STYLES.recipe({ color }),
            )
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('size styling', () => {
        const sizes: IconButtonSize[] = ['xs', 'sm', 'md', 'lg']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(
                <IconButton size={size} icon={BoldIcon} aria-label={'btn'} />,
            )
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) =>
                ICON_BUTTON_STYLES.recipe({ size }),
            )
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <IconButton
                    className={'my-custom-class'}
                    icon={BoldIcon}
                    aria-label={'btn'}
                />,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(
                <IconButton icon={BoldIcon} aria-label={'btn'} />,
            )
            for (const cls of ICON_BUTTON_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('layout props', () => {
        it('applies spacing tokens and CSS layout values', () => {
            const { container } = render(
                <IconButton
                    icon={BoldIcon}
                    aria-label={'btn'}
                    marginBottom={8}
                    width={'12rem'}
                    alignSelf={'flex-end'}
                />,
            )

            const button = getFirstChild(container)
            expect(button.className).toContain(
                BOX_STYLES.recipe({ marginBottom: 8 }),
            )
            expect(button.style.width).toBe('12rem')
            expect(button.style.alignSelf).toBe('flex-end')
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled prop is passed', () => {
            render(<IconButton disabled icon={BoldIcon} aria-label={'btn'} />)
            expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(
                true,
            )
        })
    })

    describe('active state', () => {
        it('sets data-active="true" when active prop is true', () => {
            const { container } = render(
                <IconButton active icon={BoldIcon} aria-label={'btn'} />,
            )
            expect(getFirstChild(container).getAttribute('data-active')).toBe('true')
        })

        it('does not set data-active when active prop is false', () => {
            const { container } = render(
                <IconButton active={false} icon={BoldIcon} aria-label={'btn'} />,
            )
            expect(getFirstChild(container).getAttribute('data-active')).toBeNull()
        })

        it('does not set data-active when active prop is omitted', () => {
            const { container } = render(
                <IconButton icon={BoldIcon} aria-label={'btn'} />,
            )
            expect(getFirstChild(container).getAttribute('data-active')).toBeNull()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <IconButton
                    data-testid={'icon-btn'}
                    icon={BoldIcon}
                    aria-label={'btn'}
                />,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'icon-btn',
            )
        })

        it('forwards type attribute', () => {
            const { container } = render(
                <IconButton type={'submit'} icon={BoldIcon} aria-label={'btn'} />,
            )
            expect(getFirstChild(container).getAttribute('type')).toBe('submit')
        })
    })

    describe('click handling', () => {
        it('calls onClick when clicked', async () => {
            const onClick = vi.fn()
            render(
                <IconButton onClick={onClick} icon={BoldIcon} aria-label={'btn'} />,
            )
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const onClick = vi.fn()
            render(
                <IconButton
                    disabled
                    onClick={onClick}
                    icon={BoldIcon}
                    aria-label={'btn'}
                />,
            )
            await userEvent.click(screen.getByRole('button'))
            expect(onClick).not.toHaveBeenCalled()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLButtonElement>()
            render(<IconButton ref={ref} icon={BoldIcon} aria-label={'btn'} />)
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
