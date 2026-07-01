import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'

import { Table, type TableSize } from '@/components/data-display/table'

const INVOICES = [
    { invoice: 'INV-001', status: 'Paid', method: 'Credit card', amount: 250.00 },
    { invoice: 'INV-002', status: 'Pending', method: 'PayPal', amount: 150.00 },
    { invoice: 'INV-003', status: 'Unpaid', method: 'Bank transfer', amount: 350.00 },
    { invoice: 'INV-004', status: 'Paid', method: 'Credit card', amount: 450.00 },
    { invoice: 'INV-005', status: 'Paid', method: 'PayPal', amount: 550.00 },
]

const fmt = (n: number) => `$${n.toFixed(2)}`
const total = INVOICES.reduce((s, r) => s + r.amount, 0)

const SIZES: TableSize[] = ['sm', 'md', 'lg']

const meta = {
    title: 'Data Display/Table',
    component: Table,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: [
                    'A semantic HTML table built from composable sub-components and Vanilla Extract styles.',
                    '',
                    '**Usage**',
                    '',
                    '```tsx',
                    "import { Table } from '@my-org/ui-kit'",
                    '',
                    '<Table size="md" striped fixed>',
                    '  <Table.ColGroup>',
                    '    <Table.Col width="60px" />',
                    '    <Table.Col width="15%" />',
                    '    <Table.Col />',
                    '    <Table.Col width="10rem" />',
                    '  </Table.ColGroup>',
                    '  <Table.Caption>Recent invoices.</Table.Caption>',
                    '  <Table.Header>',
                    '    <Table.Row>',
                    '      <Table.Head align="center">#</Table.Head>',
                    '      <Table.Head sortable sortDirection="asc" onClick={handleSort}>Status</Table.Head>',
                    '      <Table.Head>Description</Table.Head>',
                    '      <Table.Head align="right">Amount</Table.Head>',
                    '    </Table.Row>',
                    '  </Table.Header>',
                    '  <Table.Body>',
                    '    <Table.Row selectable selected={isSelected} onClick={handleSelect} intent="success">',
                    '      <Table.Cell align="center">1</Table.Cell>',
                    '      <Table.Cell>Paid</Table.Cell>',
                    '      <Table.Cell truncate>Long description...</Table.Cell>',
                    '      <Table.Cell numeric>$250.00</Table.Cell>',
                    '    </Table.Row>',
                    '  </Table.Body>',
                    '  <Table.Footer>',
                    '    <Table.Row>',
                    '      <Table.Cell colSpan={3}>Total</Table.Cell>',
                    '      <Table.Cell numeric>$250.00</Table.Cell>',
                    '    </Table.Row>',
                    '  </Table.Footer>',
                    '</Table>',
                    '```',
                    '',
                    '**Accessibility**',
                    '',
                    '| Element / Prop | Notes |',
                    '|---|---|',
                    '| `Table.Caption` | Provides the accessible name for the table. Always include one, or use `aria-label` when no caption is present. |',
                    '| `Table.Head` (`<th>`) | Maps to `role="columnheader"` automatically — no extra ARIA needed for simple tables. |',
                    '| `scope="col"` | Add to `Table.Head` for explicit column scoping in complex or multi-level header tables. |',
                    '| `sortDirection` | Sets `aria-sort="ascending"` / `"descending"` / `"none"` on `<th>` automatically. |',
                    '| `selectable` | Sets `aria-selected` on `<tr>` automatically when combined with `selected`. |',
                    '| `aria-label` | Use on `Table` when `Table.Caption` is omitted. |',
                    '| Keyboard | `selectable` rows are pointer-activated only — add `onKeyDown` for full keyboard support. |',
                ].join('\n'),
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: SIZES,
            description: 'Row density — controls cell vertical padding via an inherited CSS custom property.',
            table: { category: 'Table', defaultValue: { summary: 'md' } },
        },
        striped: {
            control: 'boolean',
            description: 'Alternating muted background on even body rows. Rows with an `intent` always override the stripe colour.',
            table: { category: 'Table', defaultValue: { summary: 'false' } },
        },
        bordered: {
            control: 'boolean',
            description: 'Borders on all four sides of every `<th>` and `<td>` — useful for dense data grids.',
            table: { category: 'Table', defaultValue: { summary: 'false' } },
        },
        fixed: {
            control: 'boolean',
            description: 'Sets `table-layout: fixed`. Required for `Table.ColGroup` / `Table.Col` widths to take effect reliably.',
            table: { category: 'Table', defaultValue: { summary: 'false' } },
        },
    },
    args: {
        size: 'md',
        striped: false,
        bordered: false,
        fixed: false,
    },
    decorators: [
        (Story) => (
            <div style={{ width: '100%', maxWidth: '760px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Playground — use the Controls panel to configure the table, its headers and its rows.',
            },
        },
    },
    argTypes: {
        headerAlign: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description: 'Text alignment of every header cell (the Amount column always stays right-aligned).',
            table: { category: 'Header', defaultValue: { summary: 'left' } },
        },
        sortable: {
            control: 'boolean',
            description: 'Makes all header cells interactive — cursor pointer + hover tint. Pair with `sortDirection` to show a sort indicator.',
            table: { category: 'Header', defaultValue: { summary: 'false' } },
        },
        sortDirection: {
            control: 'select',
            options: ['—', 'none', 'asc', 'desc'],
            description: 'Sort direction shown on all header cells. `none` shows ↕, `asc` shows ↑, `desc` shows ↓. Sets `aria-sort` automatically.',
            table: { category: 'Header', defaultValue: { summary: '—' } },
        },
        hoverable: {
            control: 'boolean',
            description: 'Muted background on `:hover` for every body row.',
            table: { category: 'Rows', defaultValue: { summary: 'false' } },
        },
        selectable: {
            control: 'boolean',
            description: '`cursor: pointer` + hover + `aria-selected` — pair with `onClick` on rows.',
            table: { category: 'Rows', defaultValue: { summary: 'false' } },
        },
        intent: {
            control: 'select',
            options: ['none', 'success', 'warning', 'destructive', 'info'],
            description: 'Semantic colour applied to every body row.',
            table: { category: 'Rows', defaultValue: { summary: 'none' } },
        },
    } as unknown as Story['argTypes'],
    args: {
        headerAlign: 'left',
        sortable: false,
        sortDirection: '—',
        hoverable: false,
        selectable: false,
        intent: 'none',
    } as Story['args'],
    render: (args) => {
        const { headerAlign, sortable, sortDirection, hoverable, selectable, intent, ...tableArgs } = args as typeof args & {
            headerAlign: 'left' | 'center' | 'right'
            sortable: boolean
            sortDirection: '—' | 'none' | 'asc' | 'desc'
            hoverable: boolean
            selectable: boolean
            intent: 'none' | 'success' | 'warning' | 'destructive' | 'info'
        }
        const rowIntent = intent === 'none' ? undefined : intent
        const resolvedSortDir = sortDirection === '—' ? undefined : sortDirection

        return (
            <Table {...tableArgs}>
                <Table.Caption>A list of your recent invoices.</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Head
                            align={headerAlign}
                            sortable={sortable}
                            sortDirection={resolvedSortDir}
                        >
                            Invoice
                        </Table.Head>
                        <Table.Head
                            align={headerAlign}
                            sortable={sortable}
                            sortDirection={resolvedSortDir}
                        >
                            Status
                        </Table.Head>
                        <Table.Head
                            align={headerAlign}
                            sortable={sortable}
                            sortDirection={resolvedSortDir}
                        >
                            Method
                        </Table.Head>
                        <Table.Head align={'right'}>Amount</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {INVOICES.map((row) => (
                        <Table.Row
                            key={row.invoice}
                            hoverable={hoverable}
                            selectable={selectable}
                            intent={rowIntent}
                        >
                            <Table.Cell>{row.invoice}</Table.Cell>
                            <Table.Cell>{row.status}</Table.Cell>
                            <Table.Cell>{row.method}</Table.Cell>
                            <Table.Cell numeric>{fmt(row.amount)}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.Cell colSpan={3}>Total</Table.Cell>
                        <Table.Cell numeric>{fmt(total)}</Table.Cell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('table')).toBeTruthy()
    },
}
