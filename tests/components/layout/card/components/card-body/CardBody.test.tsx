import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CardBody from '@components/layout/card/components/card-body/CardBody.tsx'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('CardBody', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<CardBody>content</CardBody>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<CardBody>content</CardBody>)
            expect(screen.getByText('content')).toBeTruthy()
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<CardBody as="section">content</CardBody>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('section')
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<CardBody>content</CardBody>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(<CardBody className="my-card-body">content</CardBody>)
            expect(getFirstChild(container).className).toContain('my-card-body')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<CardBody data-testid="card-body">content</CardBody>)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('card-body')
        })

        it('forwards aria-* attributes', () => {
            render(<CardBody aria-label="card body label">content</CardBody>)
            expect(screen.getByLabelText('card body label')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLElement>()
            render(<CardBody ref={ref}>content</CardBody>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLElement>()
            render(<CardBody as="section" ref={ref}>content</CardBody>)
            expect(ref.current!.tagName.toLowerCase()).toBe('section')
        })
    })

    describe('displayName', () => {
        it('is set to "CardBody"', () => {
            expect(CardBody.displayName).toBe('CardBody')
        })
    })
})
