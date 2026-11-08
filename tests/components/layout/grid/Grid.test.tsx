import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Grid from '@components/layout/grid/Grid.tsx'

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

describe('Grid', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Grid>content</Grid>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders its children', () => {
            render(<Grid>content</Grid>)
            expect(screen.getByText('content')).toBeTruthy()
        })
    })

    describe('`as` prop', () => {
        it('renders the requested element', () => {
            const { container } = render(<Grid as="section">content</Grid>)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe(
                'section',
            )
        })
    })

    describe('CSS class application', () => {
        it('applies a non-empty className', () => {
            const { container } = render(<Grid>content</Grid>)
            expect(getFirstChild(container).className.length).toBeGreaterThan(0)
        })

        it('merges a custom className', () => {
            const { container } = render(
                <Grid className="my-grid">content</Grid>,
            )
            expect(getFirstChild(container).className).toContain('my-grid')
        })
    })

    describe('variant application', () => {
        it('applies non-empty classes for column variants', () => {
            const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
            columns.forEach((column) => {
                const { container } = render(
                    <Grid columns={column}>content</Grid>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies non-empty classes for autoRows variants', () => {
            const autoRows = ['auto', 'min', 'max', 'fr'] as const
            autoRows.forEach((value) => {
                const { container } = render(
                    <Grid gridAutoRows={value}>content</Grid>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies non-empty classes for flow variants', () => {
            const flows = [
                'row',
                'column',
                'dense',
                'row-dense',
                'column-dense',
            ] as const
            flows.forEach((flow) => {
                const { container } = render(
                    <Grid gridAutoFlow={flow}>content</Grid>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies non-empty classes for align variants', () => {
            const aligns = [
                'start',
                'end',
                'center',
                'stretch',
                'baseline',
            ] as const
            aligns.forEach((align) => {
                const { container } = render(
                    <Grid alignItems={align}>content</Grid>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies non-empty classes for justifyItems variants', () => {
            const values = ['start', 'end', 'center', 'stretch'] as const
            values.forEach((justifyItems) => {
                const { container } = render(
                    <Grid justifyItems={justifyItems}>content</Grid>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies non-empty classes for alignContent variants', () => {
            const values = [
                'start',
                'end',
                'center',
                'stretch',
                'between',
                'around',
                'evenly',
            ] as const
            values.forEach((alignContent) => {
                const { container } = render(
                    <Grid alignContent={alignContent}>content</Grid>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })

        it('applies non-empty classes for justifyContent variants', () => {
            const values = [
                'start',
                'end',
                'center',
                'stretch',
                'between',
                'around',
                'evenly',
            ] as const
            values.forEach((justifyContent) => {
                const { container } = render(
                    <Grid justifyContent={justifyContent}>content</Grid>,
                )
                expect(
                    getFirstChild(container).className.length,
                ).toBeGreaterThan(0)
            })
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <Grid data-testid="grid">content</Grid>,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'grid',
            )
        })

        it('forwards aria-* attributes', () => {
            render(<Grid aria-label="grid label">content</Grid>)
            expect(screen.getByLabelText('grid label')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(<Grid ref={ref}>content</Grid>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })

        it('ref points to the correct element when `as` is used', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <Grid as="section" ref={ref}>
                    content
                </Grid>,
            )
            expect(ref.current!.tagName.toLowerCase()).toBe('section')
        })
    })

    describe('displayName', () => {
        it('is set to "Grid"', () => {
            expect(typeof Grid).toBe('function')
        })
    })
})
