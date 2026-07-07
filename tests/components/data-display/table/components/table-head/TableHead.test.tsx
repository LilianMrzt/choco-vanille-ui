import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Table } from '@components/data-display/table'

describe('Table.Head', () => {
    it('renders a <th> element with default scope="col"', () => {
        render(
            <table>
                <thead>
                    <tr>
                        <Table.Head>Header</Table.Head>
                    </tr>
                </thead>
            </table>,
        )
        const head = screen.getByRole('columnheader', { name: 'Header' })
        expect(head).toBeTruthy()
        expect(head.getAttribute('scope')).toBe('col')
    })

    it('allows scope to be overridden', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <Table.Head scope={'row'}>Row header</Table.Head>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('rowheader').getAttribute('scope')).toBe('row')
    })

    it('applies a non-empty className for each align variant', () => {
        const { rerender } = render(
            <table>
                <thead>
                    <tr>
                        <Table.Head align={'left'}>Left</Table.Head>
                    </tr>
                </thead>
            </table>,
        )
        expect(screen.getByRole('columnheader').className.length).toBeGreaterThan(0)

        rerender(
            <table>
                <thead>
                    <tr>
                        <Table.Head align={'center'}>Center</Table.Head>
                    </tr>
                </thead>
            </table>,
        )
        expect(screen.getByRole('columnheader').className.length).toBeGreaterThan(0)

        rerender(
            <table>
                <thead>
                    <tr>
                        <Table.Head align={'right'}>Right</Table.Head>
                    </tr>
                </thead>
            </table>,
        )
        expect(screen.getByRole('columnheader').className.length).toBeGreaterThan(0)
    })

    describe('sorting', () => {
        it('adds tabIndex and sortable styling when sortable is true', () => {
            render(
                <table>
                    <thead>
                        <tr>
                            <Table.Head sortable>Sortable</Table.Head>
                        </tr>
                    </thead>
                </table>,
            )
            const head = screen.getByRole('columnheader')
            expect(head.tabIndex).toBe(0)
            expect(head.className.length).toBeGreaterThan(0)
        })

        it.each(['asc', 'desc', 'none'] as const)(
            'sets aria-sort and wraps content when direction is "%s"',
            (sortDirection) => {
                render(
                    <table>
                        <thead>
                            <tr>
                                <Table.Head sortable sortDirection={sortDirection}>
                                    Sort
                                </Table.Head>
                            </tr>
                        </thead>
                    </table>,
                )
                const head = screen.getByRole('columnheader')
                expect(head.getAttribute('aria-sort')).toBe(
                    sortDirection === 'asc'
                        ? 'ascending'
                        : sortDirection === 'desc'
                            ? 'descending'
                            : 'none',
                )
                expect(head.querySelector('span')).toBeTruthy()
            },
        )

        it('triggers click on Enter key when sortable', () => {
            const handleClick = vi.fn()
            render(
                <table>
                    <thead>
                        <tr>
                            <Table.Head sortable onClick={handleClick}>
                                Sort
                            </Table.Head>
                        </tr>
                    </thead>
                </table>,
            )
            const head = screen.getByRole('columnheader')
            fireEvent.keyDown(head, { key: 'Enter' })
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('triggers click on Space key when sortable', () => {
            const handleClick = vi.fn()
            render(
                <table>
                    <thead>
                        <tr>
                            <Table.Head sortable onClick={handleClick}>
                                Sort
                            </Table.Head>
                        </tr>
                    </thead>
                </table>,
            )
            const head = screen.getByRole('columnheader')
            fireEvent.keyDown(head, { key: ' ' })
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not trigger click on Enter when not sortable', () => {
            const handleClick = vi.fn()
            render(
                <table>
                    <thead>
                        <tr>
                            <Table.Head onClick={handleClick}>Not sortable</Table.Head>
                        </tr>
                    </thead>
                </table>,
            )
            const head = screen.getByRole('columnheader')
            fireEvent.keyDown(head, { key: 'Enter' })
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('calls custom onKeyDown after sortable Enter handling', () => {
            const handleKeyDown = vi.fn()
            render(
                <table>
                    <thead>
                        <tr>
                            <Table.Head sortable onKeyDown={handleKeyDown}>
                                Sort
                            </Table.Head>
                        </tr>
                    </thead>
                </table>,
            )
            const head = screen.getByRole('columnheader')
            fireEvent.keyDown(head, { key: 'Enter' })
            expect(handleKeyDown).toHaveBeenCalledTimes(1)
        })
    })

    it('merges a custom className', () => {
        render(
            <table>
                <thead>
                    <tr>
                        <Table.Head className={'custom-head'}>Header</Table.Head>
                    </tr>
                </thead>
            </table>,
        )
        expect(screen.getByRole('columnheader').className).toContain('custom-head')
    })

    it('forwards data-* attributes', () => {
        render(
            <table>
                <thead>
                    <tr>
                        <Table.Head data-testid={'table-head'}>Header</Table.Head>
                    </tr>
                </thead>
            </table>,
        )
        expect(screen.getByTestId('table-head').tagName.toLowerCase()).toBe('th')
    })

    it('forwards the ref to the <th> element', () => {
        const ref = createRef<HTMLTableCellElement>()
        render(
            <table>
                <thead>
                    <tr>
                        <Table.Head ref={ref}>Header</Table.Head>
                    </tr>
                </thead>
            </table>,
        )
        expect(ref.current).not.toBeNull()
        expect(ref.current!.tagName.toLowerCase()).toBe('th')
    })

    it('displayName is "TableHead"', () => {
        expect(Table.Head.displayName).toBe('Table.Head')
    })
})
