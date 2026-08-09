import { createRef } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Separator from '@components/layout/separator/Separator.tsx'

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

describe('Separator', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Separator />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<Separator as="span" />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('span')
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<Separator />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(<Separator className="my-separator" />)
            expect(getFirstChild(container).className).toContain('my-separator')
        })
    })

    describe('orientation', () => {
        it('applies classes for horizontal orientation', () => {
            const { container } = render(<Separator orientation="horizontal" />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('applies classes for vertical orientation', () => {
            const { container } = render(<Separator orientation="vertical" />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('synchronizes aria-orientation with the visual orientation', () => {
            const { container } = render(<Separator orientation="vertical" />)
            expect(getFirstChild(container).getAttribute('aria-orientation')).toBe(
                'vertical',
            )
        })
    })

    describe('color', () => {
        it('applies classes for a theme color', () => {
            const { container } = render(<Separator color="primary" />)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })
    })

    describe('label', () => {
        it('renders the label between the separator lines', () => {
            const { container } = render(<Separator label="Or continue" />)
            const separator = getFirstChild(container)

            expect(separator.textContent).toBe('Or continue')
            expect(separator.className).toContain('hasLabel')
        })
    })

    describe('text color', () => {
        it('accepts a theme color for the label', () => {
            const { container } = render(<Separator label="Or continue" textColor="primary" />)
            expect(getFirstChild(container).textContent).toBe('Or continue')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<Separator data-testid="separator" />)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'separator',
            )
        })

        it('forwards aria-* attributes', () => {
            const { container } = render(<Separator aria-hidden="true" />)
            expect(getFirstChild(container).getAttribute('aria-hidden')).toBe('true')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLElement>()
            render(<Separator ref={ref} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLElement>()
            render(<Separator as="span" ref={ref} />)
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "Separator"', () => {
            expect(Separator.displayName).toBe('Separator')
        })
    })
})
