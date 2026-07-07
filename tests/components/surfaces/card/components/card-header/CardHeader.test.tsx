import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CardHeader from '@components/surfaces/card/components/card-header/CardHeader.tsx'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('CardHeader', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<CardHeader>content</CardHeader>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<CardHeader>content</CardHeader>)
            expect(screen.getByText('content')).toBeTruthy()
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<CardHeader as="header">content</CardHeader>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('header')
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<CardHeader>content</CardHeader>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(<CardHeader className="my-card-header">content</CardHeader>)
            expect(getFirstChild(container).className).toContain('my-card-header')
        })
    })

    describe('title and description', () => {
        it('renders the title as an h3 by default', () => {
            render(<CardHeader title="Card Title" />)
            expect(screen.getByRole('heading', { level: 3, name: 'Card Title' })).toBeTruthy()
        })

        it('renders the title with the requested heading level', () => {
            render(<CardHeader title="Card Title" titleAs="h1" />)
            expect(screen.getByRole('heading', { level: 1, name: 'Card Title' })).toBeTruthy()
        })

        it('renders the description', () => {
            render(<CardHeader title="Card Title" description="Card description" />)
            expect(screen.getByText('Card description')).toBeTruthy()
        })

        it('forwards titleProps to the title element', () => {
            render(<CardHeader title="Card Title" titleProps={{ 'data-testid': 'title' }} />)
            expect(screen.getByTestId('title')).toBeTruthy()
        })

        it('forwards descriptionProps to the description element', () => {
            render(
                <CardHeader
                    title="Card Title"
                    description="Card description"
                    descriptionProps={{ 'data-testid': 'description' }}
                />,
            )
            expect(screen.getByTestId('description')).toBeTruthy()
        })
    })

    describe('actions and children', () => {
        it('renders actions', () => {
            render(<CardHeader title="Card Title" actions={<button type="button">Action</button>} />)
            expect(screen.getByRole('button', { name: 'Action' })).toBeTruthy()
        })

        it('renders children alongside title and description', () => {
            render(
                <CardHeader title="Card Title">
                    <span data-testid="custom-child">Custom child</span>
                </CardHeader>,
            )
            expect(screen.getByTestId('custom-child')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<CardHeader data-testid="card-header">content</CardHeader>)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('card-header')
        })

        it('forwards aria-* attributes', () => {
            render(<CardHeader aria-label="card header label">content</CardHeader>)
            expect(screen.getByLabelText('card header label')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLElement>()
            render(<CardHeader ref={ref}>content</CardHeader>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLElement>()
            render(<CardHeader as="header" ref={ref}>content</CardHeader>)
            expect(ref.current!.tagName.toLowerCase()).toBe('header')
        })
    })

    describe('displayName', () => {
        it('is set to "Card.Header"', () => {
            expect(CardHeader.displayName).toBe('Card.Header')
        })
    })
})
