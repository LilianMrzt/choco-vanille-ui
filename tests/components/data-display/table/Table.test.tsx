import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Table, tableRecipe, type TableSize } from '@components/data-display/table'

// Helpers

/** Renders a minimal but fully valid table structure. */
const renderTable = (props: React.ComponentProps<typeof Table> = {}) =>
    render(
        <Table {...props}>
            <Table.Caption>Test caption</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Name</Table.Head>
                    <Table.Head align={'right'}>Amount</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>Row 1</Table.Cell>
                    <Table.Cell align={'right'}>$100</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Row 2</Table.Cell>
                    <Table.Cell align={'right'}>$200</Table.Cell>
                </Table.Row>
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Cell>Total</Table.Cell>
                    <Table.Cell align={'right'}>$300</Table.Cell>
                </Table.Row>
            </Table.Footer>
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

// Table.Header

describe('Table.Header', () => {
    it('renders a <thead> element', () => {
        render(
            <table>
                <Table.Header>
                    <tr>
                        <th>Col</th>
                    </tr>
                </Table.Header>
            </table>,
        )
        expect(document.querySelector('thead')).toBeTruthy()
    })

    it('merges custom className', () => {
        render(
            <table>
                <Table.Header className={'custom-header'}>
                    <tr><th>H</th></tr>
                </Table.Header>
            </table>,
        )
        expect(document.querySelector('thead')!.className).toContain('custom-header')
    })

    it('displayName is "TableHeader"', () => {
        expect(Table.Header.displayName).toBe('TableHeader')
    })
})

// Table.Body

describe('Table.Body', () => {
    it('renders a <tbody> element', () => {
        render(
            <table>
                <Table.Body>
                    <tr><td>Cell</td></tr>
                </Table.Body>
            </table>,
        )
        expect(document.querySelector('tbody')).toBeTruthy()
    })

    it('displayName is "TableBody"', () => {
        expect(Table.Body.displayName).toBe('TableBody')
    })
})

// Table.Footer

describe('Table.Footer', () => {
    it('renders a <tfoot> element', () => {
        render(
            <table>
                <Table.Footer>
                    <tr><td>Total</td></tr>
                </Table.Footer>
            </table>,
        )
        expect(document.querySelector('tfoot')).toBeTruthy()
    })

    it('displayName is "TableFooter"', () => {
        expect(Table.Footer.displayName).toBe('TableFooter')
    })
})

// Table.Row

describe('Table.Row', () => {
    it('renders a <tr> element', () => {
        render(
            <table>
                <tbody>
                    <Table.Row><td>Cell</td></Table.Row>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row')).toBeTruthy()
    })

    it('applies className when hoverable', () => {
        render(
            <table>
                <tbody>
                    <Table.Row hoverable><td>Cell</td></Table.Row>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row').className.length).toBeGreaterThan(0)
    })

    it('applies className when selected', () => {
        render(
            <table>
                <tbody>
                    <Table.Row selected><td>Cell</td></Table.Row>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row').className.length).toBeGreaterThan(0)
    })

    it('merges custom className', () => {
        render(
            <table>
                <tbody>
                    <Table.Row className={'custom-row'}><td>Cell</td></Table.Row>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('row').className).toContain('custom-row')
    })

    it('displayName is "TableRow"', () => {
        expect(Table.Row.displayName).toBe('TableRow')
    })
})

// Table.Head

describe('Table.Head', () => {
    it('renders a <th> element', () => {
        render(
            <table>
                <thead>
                    <tr>
                        <Table.Head>Header</Table.Head>
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
                        <Table.Head scope={'col'}>Header</Table.Head>
                    </tr>
                </thead>
            </table>,
        )
        expect(screen.getByRole('columnheader').getAttribute('scope')).toBe('col')
    })

    it('displayName is "TableHead"', () => {
        expect(Table.Head.displayName).toBe('TableHead')
    })
})

// Table.Cell

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

    it('forwards colSpan', () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <Table.Cell colSpan={3}>Spanning</Table.Cell>
                    </tr>
                </tbody>
            </table>,
        )
        expect(screen.getByRole('cell').getAttribute('colspan')).toBe('3')
    })

    it('displayName is "TableCell"', () => {
        expect(Table.Cell.displayName).toBe('TableCell')
    })
})

// Table.Caption

describe('Table.Caption', () => {
    it('renders a <caption> element', () => {
        render(
            <table>
                <Table.Caption>My table caption</Table.Caption>
            </table>,
        )
        expect(screen.getByText('My table caption').tagName.toLowerCase()).toBe('caption')
    })

    it('merges custom className', () => {
        render(
            <table>
                <Table.Caption className={'custom-caption'}>Cap</Table.Caption>
            </table>,
        )
        expect(screen.getByText('Cap').className).toContain('custom-caption')
    })

    it('displayName is "TableCaption"', () => {
        expect(Table.Caption.displayName).toBe('TableCaption')
    })
})
