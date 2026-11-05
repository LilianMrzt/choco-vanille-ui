import { createRef, type ComponentProps, type KeyboardEvent, type MouseEvent } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, expectTypeOf, it, vi } from 'vitest'

import {
    Table,
    TABLE_CELL_STYLES,
    TABLE_HEAD_STYLES,
    TABLE_STYLES,
    type TableCellAlign,
    type TableCellProps,
    type TableColGroupProps,
    type TableHeadProps,
    type TableProps,
    type TableRowProps,
} from '@components/data-display/table'
import * as tableApi from '@components/data-display/table'

describe('Table public contracts', () => {
    it('exposes typed compound slots without duplicate flat exports', () => {
        expectTypeOf<ComponentProps<typeof Table>>().toEqualTypeOf<TableProps>()
        expectTypeOf<ComponentProps<typeof Table.Head>>().toEqualTypeOf<TableHeadProps>()
        expectTypeOf<ComponentProps<typeof Table.Row>>().toEqualTypeOf<TableRowProps>()
        expectTypeOf<TableCellProps['align']>().toEqualTypeOf<TableCellAlign | undefined>()
        expectTypeOf<TableColGroupProps>().toMatchTypeOf<{ span?: number }>()
        expectTypeOf<TableProps>().toMatchTypeOf<{ cellPadding?: number | string }>()
        expect(tableApi).not.toHaveProperty('TableHead')
        expect(tableApi).not.toHaveProperty('TableRow')
        expect(Object.keys(TABLE_STYLES)).toEqual(['cellPaddingBlockVar', 'wrapper', 'recipe'])
        expect(Object.keys(TABLE_HEAD_STYLES)).toEqual([
            'recipe', 'sortable', 'sortWrapper', 'sortIcon', 'sortIconActive',
        ])
    })

    it('preserves root native attributes, ref and style on the semantic table', () => {
        const ref = createRef<HTMLTableElement>()
        render(
            <Table
                aria-label={'Invoice ledger'}
                bordered
                cellPadding={3}
                className={'consumer-table'}
                data-ledger={'main'}
                fixed
                ref={ref}
                striped
                style={{ width: '50%', tableLayout: 'auto' }}
            >
                <Table.Body><Table.Row><Table.Cell>Invoice</Table.Cell></Table.Row></Table.Body>
            </Table>,
        )
        const table = screen.getByRole('table', { name: 'Invoice ledger' })
        expect(ref.current).toBe(table)
        expect(table.getAttribute('cellpadding')).toBe('3')
        expect(table.getAttribute('data-ledger')).toBe('main')
        expect(table.getAttribute('data-striped')).toBe('true')
        expect(table.getAttribute('data-bordered')).toBe('true')
        expect(table.className).toContain('consumer-table')
        expect(table.style.width).toBe('50%')
        expect(table.style.tableLayout).toBe('auto')
        const wrapper = table.parentElement
        expect(wrapper?.tagName).toBe('DIV')
        expect(wrapper?.tabIndex).toBe(0)
        expect(wrapper?.style.overflowX).toBe('auto')
        expect(wrapper?.style.position).toBe('relative')
        expect(wrapper?.style.width).toBe('100%')
        for (const prop of ['size', 'striped', 'bordered', 'fixed']) {
            expect(table.hasAttribute(prop)).toBe(false)
        }
    })

    it('preserves native column-group span and column style precedence', () => {
        const { container } = render(
            <Table>
                <Table.ColGroup
                    data-group={'spanned'}
                    span={2}
                />
                <Table.ColGroup>
                    <Table.Col
                        maxWidth={'20rem'}
                        minWidth={'5rem'}
                        span={2}
                        style={{ width: '40%' }}
                        width={'25%'}
                    />
                </Table.ColGroup>
            </Table>,
        )
        expect(container.querySelector('[data-group="spanned"]')?.getAttribute('span')).toBe('2')
        const column = container.querySelector('col')
        expect(column?.getAttribute('span')).toBe('2')
        expect(column?.style.width).toBe('40%')
        expect(column?.style.minWidth).toBe('5rem')
        expect(column?.style.maxWidth).toBe('20rem')
        expect(column?.hasAttribute('width')).toBe(false)
        expect(column?.hasAttribute('minWidth')).toBe(false)
    })

    it('preserves spans, custom style and all numeric/truncation classes without custom attributes', () => {
        render(
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell
                            align={'center'}
                            colSpan={2}
                            numeric
                            rowSpan={3}
                            style={{ textAlign: 'left' }}
                            truncate
                        >
                            250
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>,
        )
        const cell = screen.getByRole('cell')
        expect(cell.getAttribute('colspan')).toBe('2')
        expect(cell.getAttribute('rowspan')).toBe('3')
        expect(cell.className).toContain(TABLE_CELL_STYLES.numeric)
        expect(cell.className).toContain(TABLE_CELL_STYLES.truncate)
        expect(cell.style.textAlign).toBe('left')
        for (const prop of ['align', 'numeric', 'truncate']) {
            expect(cell.hasAttribute(prop)).toBe(false)
        }
    })

    it('preserves native aria-sort when direction is absent and explicitly overrides it otherwise', () => {
        const { rerender } = render(
            <Table>
                <Table.Header>
                    <Table.Row><Table.Head aria-sort={'other'}>Amount</Table.Head></Table.Row>
                </Table.Header>
            </Table>,
        )
        expect(screen.getByRole('columnheader').getAttribute('aria-sort')).toBe('other')
        expect(screen.getByRole('columnheader').querySelector('svg')).toBeNull()
        rerender(
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.Head
                            aria-sort={'other'}
                            sortDirection={'asc'}
                        >
                            Amount
                        </Table.Head>
                    </Table.Row>
                </Table.Header>
            </Table>,
        )
        const head = screen.getByRole('columnheader', { name: 'Amount' })
        expect(head.getAttribute('aria-sort')).toBe('ascending')
        expect(head.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
        const content = head.firstElementChild
        expect(content?.tagName).toBe('SPAN')
        expect(content?.getAttribute('style')).toContain('align-items: center')
    })

    it.each([
        { slot: 'head', key: '{Enter}' },
        { slot: 'head', key: ' ' },
        { slot: 'row', key: '{Enter}' },
        { slot: 'row', key: ' ' },
    ])('runs consumer key handling before cancellable $slot activation for $key', async ({ slot, key }) => {
        const user = userEvent.setup()
        const order: string[] = []
        const handleClick = vi.fn(() => order.push('click'))
        const handleKeyDown = vi.fn((event: KeyboardEvent<HTMLElement>) => {
            order.push('keydown')
            event.preventDefault()
        })
        render(
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.Head
                            onClick={handleClick}
                            onKeyDown={handleKeyDown}
                            sortable
                        >
                            Amount
                        </Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row
                        onClick={handleClick}
                        onKeyDown={handleKeyDown}
                        selectable
                    >
                        <Table.Cell>Invoice</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>,
        )
        const target = slot === 'head'
            ? screen.getByRole('columnheader')
            : screen.getByRole('row', { name: 'Invoice' })
        target.focus()
        await user.keyboard(key)
        expect(handleKeyDown).toHaveBeenCalledTimes(1)
        expect(handleClick).not.toHaveBeenCalled()
        expect(order).toEqual(['keydown'])
    })

    it('delivers one native click after consumer key handling without cancellation', async () => {
        const user = userEvent.setup()
        const order: string[] = []
        const handleClick = vi.fn((event: MouseEvent<HTMLTableCellElement>) => {
            expect(event.currentTarget).toBe(screen.getByRole('columnheader'))
            order.push('click')
        })
        render(
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.Head
                            onClick={handleClick}
                            onKeyDown={() => order.push('keydown')}
                            sortable
                        >
                            Amount
                        </Table.Head>
                    </Table.Row>
                </Table.Header>
            </Table>,
        )
        screen.getByRole('columnheader').focus()
        await user.keyboard('{Enter}')
        expect(order).toEqual(['keydown', 'click'])
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('preserves native tabIndex and row aria-selected overrides', () => {
        render(
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.Head
                            sortable
                            tabIndex={-1}
                        >
                            Amount
                        </Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row
                        aria-selected={false}
                        selectable
                        selected
                        tabIndex={-1}
                    >
                        <Table.Cell>Invoice</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>,
        )
        expect(screen.getByRole('columnheader').tabIndex).toBe(-1)
        const row = screen.getByRole('row', { name: 'Invoice' })
        expect(row.tabIndex).toBe(-1)
        expect(row.getAttribute('aria-selected')).toBe('false')
        expect(row.hasAttribute('selectable')).toBe(false)
        expect(row.hasAttribute('selected')).toBe(false)
    })

    it('renders all sections with native semantics during server rendering', () => {
        const markup = renderToStaticMarkup(
            <Table>
                <Table.Caption>Invoices</Table.Caption>
                <Table.ColGroup><Table.Col /></Table.ColGroup>
                <Table.Header><Table.Row><Table.Head>Amount</Table.Head></Table.Row></Table.Header>
                <Table.Body><Table.Row><Table.Cell>$250.00</Table.Cell></Table.Row></Table.Body>
                <Table.Footer><Table.Row><Table.Cell>Total</Table.Cell></Table.Row></Table.Footer>
            </Table>,
        )
        for (const tag of ['table', 'caption', 'colgroup', 'col', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td']) {
            expect(markup).toContain(`<${tag}`)
        }
        expect(markup).not.toContain('role="grid"')
        expect(markup).not.toContain('role="button"')
    })
})
