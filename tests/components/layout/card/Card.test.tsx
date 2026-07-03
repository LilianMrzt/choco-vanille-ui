import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from '@components/layout/card/Card.tsx'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('Card', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Card>content</Card>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<Card>content</Card>)
            expect(screen.getByText('content')).toBeTruthy()
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<Card as="section">content</Card>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('section')
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<Card>content</Card>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(<Card className="my-card">content</Card>)
            expect(getFirstChild(container).className).toContain('my-card')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<Card data-testid="card">content</Card>)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('card')
        })

        it('forwards aria-* attributes', () => {
            render(<Card aria-label="card label">content</Card>)
            expect(screen.getByLabelText('card label')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLElement>()
            render(<Card ref={ref}>content</Card>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLElement>()
            render(<Card as="section" ref={ref}>content</Card>)
            expect(ref.current!.tagName.toLowerCase()).toBe('section')
        })
    })

    describe('compound components', () => {
        it('exposes Header, Body and Footer sub-components', () => {
            expect(Card.Header).toBeDefined()
            expect(Card.Body).toBeDefined()
            expect(Card.Footer).toBeDefined()
        })

        it('renders a Card with Header, Body and Footer', () => {
            render(
                <Card>
                    <Card.Header title="Title" />
                    <Card.Body>Body content</Card.Body>
                    <Card.Footer>Footer content</Card.Footer>
                </Card>,
            )

            expect(screen.getByText('Title')).toBeTruthy()
            expect(screen.getByText('Body content')).toBeTruthy()
            expect(screen.getByText('Footer content')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Card"', () => {
            expect(Card.displayName).toBe('Card')
        })
    })
})
