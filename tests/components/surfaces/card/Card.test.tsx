import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from '@components/surfaces/card'
import { Card as PublicCard } from '@/index'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('Card', () => {
    it('exposes the compound API through the public entry', () => {
        expect(PublicCard).toBe(Card)
        expect(PublicCard.Header).toBe(Card.Header)
        expect(PublicCard.Body).toBe(Card.Body)
        expect(PublicCard.Footer).toBe(Card.Footer)
    })

    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Card>content</Card>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<Card>content</Card>)
            expect(screen.getByText('content')).toBeTruthy()
        })

        it('uses a solid border by default', () => {
            const { container } = render(<Card>content</Card>)
            expect(getFirstChild(container).style.borderStyle).toBe('solid')
        })

        it('leaves default colors in the stylesheet so consumer classes can override them', () => {
            const { container } = render(<Card>content</Card>)
            const card = getFirstChild(container)
            expect(card.style.color).toBe('')
            expect(card.style.backgroundColor).toBe('')
            expect(card.style.borderColor).toBe('')
        })

        it('accepts free CSS color references and preserves consumer style precedence', () => {
            const { container } = render(
                <Card
                    backgroundColor={'var(--app-surface)'}
                    borderColor={'var(--app-border)'}
                    color={'var(--app-text)'}
                    style={{ color: 'red' }}
                />,
            )
            const card = getFirstChild(container)
            expect(card.style.backgroundColor).toBe('var(--app-surface)')
            expect(card.style.borderColor).toBe('var(--app-border)')
            expect(card.style.color).toBe('red')
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<Card as="section">content</Card>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('section')
        })

        it('supports semantic list elements', () => {
            const { container } = render(<Card as="li">content</Card>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('li')
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
