import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table } from '@components/data-display/table'

describe('Table.Cell', () => {
    it('renders a <td> element', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell>Data</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell', { name: 'Data' })).toBeTruthy()
    })

    it('forwards colSpan and rowSpan', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell colSpan={3} rowSpan={2}>
                            Spanning
                        </Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        const cell = screen.getByRole('cell')
        expect(cell.getAttribute('colspan')).toBe('3')
        expect(cell.getAttribute('rowspan')).toBe('2')
    })

    it('applies a non-empty className for each align variant', () => {
        const { rerender } = render(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell align={'left'}>Left</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell').className.length).toBeGreaterThan(0)

        rerender(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell align={'center'}>Center</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell').className.length).toBeGreaterThan(0)

        rerender(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell align={'right'}>Right</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell').className.length).toBeGreaterThan(0)
    })

    it('applies className when numeric is true', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell numeric>100</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell').className.length).toBeGreaterThan(0)
    })

    it('applies className when truncate is true', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell truncate>Long text</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell').className.length).toBeGreaterThan(0)
    })

    it('merges a custom className', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell className={'custom-cell'}>Data</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell').className).toContain('custom-cell')
    })

    it('forwards data-* attributes', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell data-testid={'table-cell'}>Data</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByTestId('table-cell').tagName.toLowerCase()).toBe('td')
    })

    it('forwards the ref to the <td> element', () => {
        const ref = createRef<HTMLTable.CellElement>()
        render(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell ref={ref}>Data</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(ref.current).not.toBeNull()
        expect(ref.current!.tagName.toLowerCase()).toBe('td')
    })

    it('displayName is "TableCell"', () => {
        expect(Table.Cell.displayName).toBe('TableCell')
    })
})
