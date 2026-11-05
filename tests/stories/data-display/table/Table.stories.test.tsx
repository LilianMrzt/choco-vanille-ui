import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createElement, type MouseEventHandler } from 'react'
import { describe, expect, it, vi } from 'vitest'
import ts from 'typescript'

import meta, { Sizes } from '@stories/data-display/table/Table.stories'

const storyState = vi.hoisted(() => ({
    args: {},
    updateArgs: vi.fn(),
}))

vi.mock('storybook/preview-api', () => ({
    useArgs: () => [storyState.args, storyState.updateArgs],
}))

vi.mock('@storybook/addon-docs/blocks', () => ({
    Canvas: () => null,
    Controls: () => null,
    Description: () => null,
    Markdown: () => null,
    Stories: () => null,
    Title: () => null,
}))

describe('Table stories', () => {
    it('wires root and compound controls without leaking demonstration args to the DOM', () => {
        storyState.args = {
            ...meta.args,
            caption: 'Invoice ledger',
            size: 'sm',
            fixed: true,
            bordered: true,
            striped: true,
            columnWidth: '20%',
            columnMinWidth: '2rem',
            columnMaxWidth: '12rem',
            headAlign: 'right',
            sortDirection: 'asc',
            intent: 'warning',
            hoverable: true,
            selectable: true,
            selectedInvoice: 'INV-002',
            cellAlign: 'center',
            numeric: false,
            truncate: true,
            footerLabel: 'Balance',
        }
        const { container } = render(createElement(meta.render, meta.args))
        const table = screen.getByRole('table', { name: 'Invoice ledger' })
        expect(table.getAttribute('data-striped')).toBe('true')
        expect(table.getAttribute('data-bordered')).toBe('true')
        expect(table.getAttribute('caption')).toBeNull()
        const rows = within(table).getAllByRole('row')
        expect(rows[1]?.textContent).toContain('INV-002')
        expect(rows[1]?.getAttribute('aria-selected')).toBe('true')
        expect(rows[1]?.getAttribute('data-intent')).toBe('warning')
        expect(screen.getByText('Balance')).toBeTruthy()
        const column = container.querySelector('col')
        expect(column?.style.width).toBe('20%')
        expect(column?.style.minWidth).toBe('2rem')
        expect(column?.style.maxWidth).toBe('12rem')
        for (const prop of ['columnWidth', 'headAlign', 'selectedInvoice', 'cellAlign', 'footerLabel']) {
            expect(table.hasAttribute(prop)).toBe(false)
        }
    })

    it('updates selection and sort args while invoking spies, and follows control/reset changes', async () => {
        const user = userEvent.setup()
        const onSort = vi.fn()
        const onSelect = vi.fn()
        storyState.updateArgs.mockClear()
        storyState.args = { ...meta.args, sortable: true, selectable: true, onSort, onSelect }
        const { rerender } = render(createElement(meta.render, meta.args))
        await user.click(screen.getByRole('columnheader', { name: 'Amount' }))
        expect(onSort).toHaveBeenCalledTimes(1)
        expect(storyState.updateArgs).toHaveBeenLastCalledWith({ sortDirection: 'asc' })
        storyState.args = { ...storyState.args, sortDirection: 'asc' }
        rerender(createElement(meta.render, meta.args))
        expect(screen.getByRole('columnheader', { name: 'Amount' }).getAttribute('aria-sort')).toBe('ascending')
        const row = screen.getByRole('row', { name: 'INV-002 $150.00' })
        row.focus()
        await user.keyboard('{Enter}')
        expect(onSelect).toHaveBeenCalledTimes(1)
        expect(storyState.updateArgs).toHaveBeenLastCalledWith({ selectedInvoice: 'INV-002' })
        storyState.args = { ...storyState.args, selectedInvoice: 'INV-002' }
        rerender(createElement(meta.render, meta.args))
        expect(screen.getByRole('row', { name: 'INV-002 $150.00' }).getAttribute('aria-selected')).toBe('true')
        storyState.args = { ...meta.args }
        rerender(createElement(meta.render, meta.args))
        expect(screen.getByRole('columnheader', { name: 'Amount' }).getAttribute('aria-sort')).toBeNull()
        expect(screen.getByRole('row', { name: 'INV-002 $150.00' }).getAttribute('aria-selected')).toBeNull()
    })

    it('respects cancellation from demo callback consumers', async () => {
        const user = userEvent.setup()
        const onSort: MouseEventHandler<HTMLTableCellElement> = (event) => event.preventDefault()
        const onSelect: MouseEventHandler<HTMLTableRowElement> = (event) => event.preventDefault()
        storyState.updateArgs.mockClear()
        storyState.args = { ...meta.args, sortable: true, selectable: true, onSort, onSelect }
        render(createElement(meta.render, meta.args))
        await user.click(screen.getByRole('columnheader', { name: 'Amount' }))
        await user.click(screen.getByRole('row', { name: 'INV-001 $250.00' }))
        expect(storyState.updateArgs).not.toHaveBeenCalled()
    })

    it('documents real dynamic consumer composition and explicit compound control categories', () => {
        const source = meta.parameters.docs.source.transform('', {
            args: {
                ...meta.args,
                caption: 'Invoice {ledger} {{size}} $&',
                bordered: true,
                columnWidth: '25%',
                numeric: false,
                sortDirection: 'desc',
                selectedInvoice: 'INV-003',
                sortable: true,
                selectable: true,
            },
        })
        expect(source).toContain("from '@choco-vanille/ui'")
        expect(source).toContain('<Table.Caption>{"Invoice {ledger} {{size}} $&"}</Table.Caption>')
        expect(source).toContain('bordered={true}')
        expect(source).toContain('width={"25%"}')
        expect(source).toContain('numeric={false}')
        expect(source).toContain('useState<TableSortDirection | undefined>("desc")')
        expect(source).toContain('useState("INV-003")')
        expect(source).toContain('onClick={handleSort}')
        expect(source).toContain('onClick={handleSelect}')
        expect(source).toContain('<Table.Header>')
        expect(source).toContain('<Table.Body>')
        expect(source).toContain('<Table.Footer>')
        expect(source).not.toContain('TablePlayground')
        const result = ts.transpileModule(source, {
            fileName: 'Table.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics).toEqual([])
        expect(meta.argTypes.headAlign.table.category).toBe('Compound: Head')
        expect(meta.argTypes.selectedInvoice.table.category).toBe('Compound: Row')
        expect(meta.argTypes.numeric.table.category).toBe('Compound: Cell')
        expect(meta.argTypes.ref.control).toBe(false)
    })

    it('shows only the public density axis with populated tables and matching static source', () => {
        const { container } = render(createElement(Sizes.render))
        const tables = screen.getAllByRole('table')
        expect(tables).toHaveLength(3)
        expect(screen.getByRole('table', { name: 'Density: sm' })).toBeTruthy()
        expect(screen.getByRole('table', { name: 'Density: md' })).toBeTruthy()
        expect(screen.getByRole('table', { name: 'Density: lg' })).toBeTruthy()
        expect(container.querySelectorAll('td')).toHaveLength(6)
        const source = Sizes.parameters.docs.source.code
        const result = ts.transpileModule(source, {
            fileName: 'TableSizes.consumer.tsx',
            compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
            reportDiagnostics: true,
        })
        expect(result.diagnostics).toEqual([])
        expect(source.match(/<Table size=/g)).toHaveLength(3)
        expect(source).toContain('<Table.Caption>Density: sm</Table.Caption>')
        expect(source).toContain('<Table.Caption>Density: md</Table.Caption>')
        expect(source).toContain('<Table.Caption>Density: lg</Table.Caption>')
        expect(Sizes.parameters.docs.source.transform(source)).toBe(source)
        expect(Sizes.parameters.controls.disable).toBe(true)
    })
})
