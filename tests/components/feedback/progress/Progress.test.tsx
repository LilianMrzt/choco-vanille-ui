import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    Progress,
    PROGRESS_STYLES,
    type ProgressColor,
    type ProgressSize,
} from '@components/feedback/progress'

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

describe('Progress', () => {
    describe('default rendering', () => {
        it('renders a progressbar role', () => {
            render(<Progress value={50} aria-label="Progress" />)
            expect(screen.getByRole('progressbar')).toBeTruthy()
        })

        it('sets aria-valuenow to the clamped value', () => {
            render(<Progress value={42} aria-label="Progress" />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuenow'),
            ).toBe('42')
        })

        it('sets aria-valuetext to the percentage by default', () => {
            render(<Progress value={42} aria-label="Progress" />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuetext'),
            ).toBe('42%')
        })

        it('sets aria-valuetext to the custom quantity label when provided', () => {
            render(<Progress value={42} quantityLabel={'2/5'} aria-label="Progress" />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuetext'),
            ).toBe('2/5')
        })

        it('clamps values below 0 to 0', () => {
            render(<Progress value={-10} aria-label="Progress" />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuenow'),
            ).toBe('0')
        })

        it('clamps values above 100 to 100', () => {
            render(<Progress value={150} aria-label="Progress" />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuenow'),
            ).toBe('100')
        })

        it('renders the fill with a width matching the value', () => {
            const { container } = render(<Progress value={37} aria-label="Progress" />)
            const fill = container.querySelector(
                '[data-progress-fill]',
            ) as HTMLElement
            expect(fill.style.width).toBe('37%')
        })
    })

    describe('labels', () => {
        it('renders the label when provided', () => {
            render(<Progress value={50} label="Loading" />)
            expect(screen.getByText('Loading')).toBeTruthy()
        })

        it('renders an automatic percentage quantity label', () => {
            render(<Progress value={67} quantityLabel aria-label="Progress" />)
            expect(screen.getByText('67%')).toBeTruthy()
        })

        it('renders a custom quantity label', () => {
            render(<Progress value={50} quantityLabel="2/4" aria-label="Progress" />)
            expect(screen.getByText('2/4')).toBeTruthy()
        })

        it('does not render a quantity label when omitted', () => {
            render(<Progress value={50} aria-label="Progress" />)
            expect(screen.queryByText('50%')).toBeNull()
        })
    })

    describe('size styling', () => {
        const sizes: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(<Progress value={50} size={size} aria-label="Progress" />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) => PROGRESS_STYLES.recipe({ size }))
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('border radius styling', () => {
        it('defaults to sm border radius', () => {
            const { container } = render(<Progress value={50} aria-label="Progress" />)
            const track = container.querySelector(
                '[role="progressbar"]',
            ) as HTMLElement
            expect(track.className).toContain(
                PROGRESS_STYLES.recipe({ borderRadius: 6, size: 'sm' }),
            )
        })

        it('applies a custom border radius', () => {
            const { container } = render(
                <Progress value={50} borderRadius={'full'} aria-label="Progress" />,
            )
            const track = container.querySelector(
                '[role="progressbar"]',
            ) as HTMLElement
            expect(track.className).toContain(
                PROGRESS_STYLES.recipe({ borderRadius: 'full', size: 'sm' }),
            )
        })
    })

    describe('width customization', () => {
        it('defaults to 100% width', () => {
            const { container } = render(<Progress value={50} aria-label="Progress" />)
            expect(getFirstChild(container).style.width).toBe('100%')
        })

        it('applies a custom width', () => {
            const { container } = render(<Progress value={50} width={'10rem'} aria-label="Progress" />)
            expect(getFirstChild(container).style.width).toBe('10rem')
        })
    })

    describe('color styling', () => {
        const colors: ProgressColor[] = [
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
            const { container } = render(<Progress value={50} color={color} aria-label="Progress" />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) =>
                PROGRESS_STYLES.recipe({ color }),
            )
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Progress value={50} className="my-custom-class" aria-label="Progress" />,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the outermost DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(<Progress ref={ref} value={50} aria-label="Progress" />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('displayName', () => {
        it('is set to "Progress"', () => {
            expect(Progress.displayName).toBe('Progress')
        })
    })
})
