import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    CircularProgress,
    PROGRESS_STYLES,
    type ProgressColor,
    type ProgressSize,
} from '@components/feedback/progress'

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

describe('CircularProgress', () => {
    describe('default rendering', () => {
        it('renders a progressbar role', () => {
            render(<CircularProgress value={50} />)
            expect(screen.getByRole('progressbar')).toBeTruthy()
        })

        it('sets aria-valuenow to the clamped value', () => {
            render(<CircularProgress value={42} />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuenow'),
            ).toBe('42')
        })

        it('sets aria-valuetext to the percentage by default', () => {
            render(<CircularProgress value={42} />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuetext'),
            ).toBe('42%')
        })

        it('sets aria-valuetext to the custom quantity label when provided', () => {
            render(<CircularProgress value={42} quantityLabel={'2/5'} />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuetext'),
            ).toBe('2/5')
        })

        it('clamps values below 0 to 0', () => {
            render(<CircularProgress value={-10} />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuenow'),
            ).toBe('0')
        })

        it('clamps values above 100 to 100', () => {
            render(<CircularProgress value={150} />)
            expect(
                screen.getByRole('progressbar').getAttribute('aria-valuenow'),
            ).toBe('100')
        })

        it('renders the track and indicator circles', () => {
            const { container } = render(<CircularProgress value={50} />)
            expect(container.querySelectorAll('circle')).toHaveLength(2)
        })
    })

    describe('labels', () => {
        it('renders the label when provided', () => {
            render(<CircularProgress value={50} label="Loading" />)
            expect(screen.getByText('Loading')).toBeTruthy()
        })

        it('renders an automatic percentage quantity label centered', () => {
            render(<CircularProgress value={67} quantityLabel />)
            expect(screen.getByText('67%')).toBeTruthy()
        })

        it('renders a custom quantity label', () => {
            render(<CircularProgress value={50} quantityLabel="2/4" />)
            expect(screen.getByText('2/4')).toBeTruthy()
        })

        it('does not render a quantity label when omitted', () => {
            render(<CircularProgress value={50} />)
            expect(screen.queryByText('50%')).toBeNull()
        })
    })

    describe('size styling', () => {
        const sizes: ProgressSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { container } = render(<CircularProgress value={50} size={size} />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) =>
                PROGRESS_STYLES.circular({ size }),
            )
            expect(new Set(classNames).size).toBe(sizes.length)
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
            const { container } = render(
                <CircularProgress value={50} color={color} />,
            )
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each color', () => {
            const classNames = colors.map((color) =>
                PROGRESS_STYLES.circularIndicator({ color }),
            )
            expect(new Set(classNames).size).toBe(colors.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <CircularProgress value={50} className="my-custom-class" />,
            )
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the outermost DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(<CircularProgress ref={ref} value={50} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('displayName', () => {
        it('is set to "CircularProgress"', () => {
            expect(CircularProgress.displayName).toBe('CircularProgress')
        })
    })
})
