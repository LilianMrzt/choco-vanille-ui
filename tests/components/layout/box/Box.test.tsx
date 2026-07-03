import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Box from '@components/layout/box/Box.tsx'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('Box', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Box>content</Box>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<Box>content</Box>)
            expect(screen.getByText('content')).toBeTruthy()
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<Box as="section">content</Box>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('section')
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<Box>content</Box>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(<Box className="my-box">content</Box>)
            expect(getFirstChild(container).className).toContain('my-box')
        })

        it('applies variant classes', () => {
            const { container } = render(
                <Box display="flex" p="md" bg="card">
                    content
                </Box>,
            )
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<Box data-testid="box">content</Box>)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe('box')
        })

        it('forwards aria-* attributes', () => {
            render(<Box aria-label="box label">content</Box>)
            expect(screen.getByLabelText('box label')).toBeTruthy()
        })

        it('forwards id attribute', () => {
            const { container } = render(<Box id="my-box">content</Box>)
            expect(getFirstChild(container).getAttribute('id')).toBe('my-box')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLElement>()
            render(<Box ref={ref}>content</Box>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLElement>()
            render(<Box as="section" ref={ref}>content</Box>)
            expect(ref.current!.tagName.toLowerCase()).toBe('section')
        })
    })

    describe('displayName', () => {
        it('is set to "Box"', () => {
            expect(Box.displayName).toBe('Box')
        })
    })
})
