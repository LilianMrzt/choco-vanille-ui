import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from '@components/surfaces/card'

const CardFooter = Card.Footer

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('CardFooter', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<CardFooter>content</CardFooter>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<CardFooter>content</CardFooter>)
            expect(screen.getByText('content')).toBeTruthy()
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<CardFooter as="footer">content</CardFooter>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('footer')
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<CardFooter>content</CardFooter>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(<CardFooter className="my-card-footer">content</CardFooter>)
            expect(getFirstChild(container).className).toContain('my-card-footer')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<CardFooter data-testid="card-footer">content</CardFooter>)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('card-footer')
        })

        it('forwards aria-* attributes', () => {
            render(<CardFooter aria-label="card footer label">content</CardFooter>)
            expect(screen.getByLabelText('card footer label')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLElement>()
            render(<CardFooter ref={ref}>content</CardFooter>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLElement>()
            render(<CardFooter as="footer" ref={ref}>content</CardFooter>)
            expect(ref.current!.tagName.toLowerCase()).toBe('footer')
        })
    })

    describe('displayName', () => {
        it('is set to "Card.Footer"', () => {
            expect(CardFooter.displayName).toBe('Card.Footer')
        })
    })
})
