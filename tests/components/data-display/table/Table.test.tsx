import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
    tableRecipe,
    type TableSize,
} from '@components/data-display/table'

// Helpers

/** Renders a minimal but fully valid table structure. */
const renderTable = (props: React.ComponentProps<typeof Table> = {}) =>
    render(
        <Table {...props}>
            <TableCaption>Test caption</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead align={'right'}>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Row 1</TableCell>
                    <TableCell align={'right'}>$100</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Row 2</TableCell>
                    <TableCell align={'right'}>$200</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell align={'right'}>$300</TableCell>
                </TableRow>
            </TableFooter>
        </Table>,
    )

// Table

describe('Table', () => {
    describe('default rendering', () => {
        it('renders a <table> element', () => {
            renderTable()
            expect(screen.getByRole('table')).toBeTruthy()
        })

        it('wraps the table in a scrollable div', () => {
            const { container } = renderTable()
            const wrapper = container.firstElementChild as HTMLElement
            expect(wrapper.tagName.toLowerCase()).toBe('div')
            expect(wrapper.style.overflowX !== undefined).toBe(true)
        })

        it('renders a caption', () => {
            renderTable()
            expect(screen.getByText('Test caption')).toBeTruthy()
        })

        it('renders column headers', () => {
            renderTable()
            expect(screen.getAllByRole('columnheader')).toHaveLength(2)
        })

        it('renders data rows', () => {
            renderTable()
            expect(screen.getAllByRole('row')).toHaveLength(4) // 1 header + 2 body + 1 footer
        })
    })

    describe('size variant', () => {
        const sizes: TableSize[] = ['sm', 'md', 'lg']

        it.each(sizes)('applies a non-empty class for size="%s"', (size) => {
            const { getByRole } = render(<Table size={size} />)
            expect(getByRole('table').className.length).toBeGreaterThan(0)
        })

        it('produces distinct class names for each size', () => {
            const classNames = sizes.map((size) => tableRecipe({ size }))
            expect(new Set(classNames).size).toBe(sizes.length)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            render(<Table className={'my-table'} />)
            expect(screen.getByRole('table').className).toContain('my-table')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards aria-label', () => {
            render(<Table aria-label={'Invoice list'} />)
            expect(screen.getByRole('table', { name: 'Invoice list' })).toBeTruthy()
        })

        it('forwards data-* attributes', () => {
            render(<Table data-testid={'my-table'} />)
            expect(screen.getByTestId('my-table')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the <table> element', () => {
            const ref = createRef<HTMLTableElement>()
            render(<Table ref={ref} />)
            expect(ref.current).not.toBeNull()
            expect(ref.current!.tagName.toLowerCase()).toBe('table')
        })
    })

    describe('displayName', () => {
        it('is set to "Table"', () => {
            expect(Table.displayName).toBe('Table')
        })
    })
})

// TableHeader

describe('TableHeader', () => {
    it('renders a <thead> element', () => {
        render(
            <table>
                <TableHeader>
                    <tr>
                        <th>Col</th>
                    </tr>
                </TableHeader>
            </table>,
        )
        expect(document.querySelector('thead')).toBeTruthy()
    })

    it('merges custom className', () => {
        render(
            <table>
                <TableHeader className={'custom-header'}>
                    <tr><th>H</th></tr>
                </TableHeader>
            </table>,
        )
        expect(document.querySelector('thead')!.className).toContain('custom-header')
    })

    it('displayName is "TableHeader"', () => {
        expect(TableHeader.displayName).toBe('TableHeader')
    })
})

// TableBody

describe('TableBody', () => {
    it('renders a <tbody> element', () => {
        render(
            <table>
                <TableBody>
                    <tr><td>Cell</td></tr>
                </TableBody>
            </table>,
        )
        expect(document.querySelector('tbody')).toBeTruthy()
    })

    it('displayName is "TableBody"', () => {
        expect(TableBody.displayName).toBe('TableBody')
    })
})

// TableFooter

describe('TableFooter', () => {
    it('renders a <tfoot> element', () => {
        render(
            <table>
                <TableFooter>
                    <tr><td>Total</td></tr>
                </TableFooter>
            </table>,
        )
        expect(document.querySelector('tfoot')).toBeTruthy()
    })

    it('displayName is "TableFooter"', () => {
        expect(TableFooter.displayName).toBe('TableFooter')
    })
})

// TableRow

describe('TableRow', () => {
    it('renders a <tr> element', () => {
        render(
            <table>
                <tbody>
                    <TableRow><td>Cell</td></TableRow>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row')).toBeTruthy()
    })

    it('applies className when hoverable', () => {
        render(
            <table>
                <tbody>
                    <TableRow hoverable><td>Cell</td></TableRow>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row').className.length).toBeGreaterThan(0)
    })

    it('applies className when selected', () => {
        render(
            <table>
                <tbody>
                    <TableRow selected><td>Cell</td></TableRow>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row').className.length).toBeGreaterThan(0)
    })

    it('merges custom className', () => {
        render(
            <table>
                <tbody>
                    <TableRow className={'custom-row'}><td>Cell</td></TableRow>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row').className).toContain('custom-row')
    })

    it('displayName is "TableRow"', () => {
        expect(TableRow.displayName).toBe('TableRow')
    })
})

// TableHead

describe('TableHead', () => {
    it('renders a <th> element', () => {
        render(
            <table>
                <thead>
                    <tr>
                        <TableHead>Header</TableHead>
                    </tr>
                </thead>
            </table>,
        )
        expect(screen.getByRole('columnheader', { name: 'Header' })).toBeTruthy()
    })

    it('forwards scope attribute', () => {
        render(
            <table>
                <thead>
                    <tr>
                        <TableHead scope={'col'}>Header</TableHead>
                    </tr>
                </thead>
            </table>,
        )
        expect(screen.getByRole('columnheader').getAttribute('scope')).toBe('col')
    })

    it('displayName is "TableHead"', () => {
        expect(TableHead.displayName).toBe('TableHead')
    })
})

// TableCell

describe('TableCell', () => {
    it('renders a <td> element', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <TableCell>Data</TableCell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell', { name: 'Data' })).toBeTruthy()
    })

    it('forwards colSpan', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <TableCell colSpan={3}>Spanning</TableCell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell').getAttribute('colspan')).toBe('3')
    })

    it('displayName is "TableCell"', () => {
        expect(TableCell.displayName).toBe('TableCell')
    })
})

// TableCaption

describe('TableCaption', () => {
    it('renders a <caption> element', () => {
        render(
            <table>
                <TableCaption>My table caption</TableCaption>
            </table>,
        )
        expect(screen.getByText('My table caption').tagName.toLowerCase()).toBe('caption')
    })

    it('merges custom className', () => {
        render(
            <table>
                <TableCaption className={'custom-caption'}>Cap</TableCaption>
            </table>,
        )
        expect(screen.getByText('Cap').className).toContain('custom-caption')
    })

    it('displayName is "TableCaption"', () => {
        expect(TableCaption.displayName).toBe('TableCaption')
    })
})
