import type { Meta, StoryObj } from '@storybook/react-vite'
import { within, expect } from 'storybook/test'
import type { ComponentProps } from 'react'

import { Table, type TableSize } from '@/components/data-display/table'
import { md } from '@stories/utils/markdown'

const INVOICES = [
    { invoice: 'INV-001', status: 'Paid', method: 'Credit card', amount: 250.0 },
    { invoice: 'INV-002', status: 'Pending', method: 'PayPal', amount: 150.0 },
    {
        invoice: 'INV-003',
        status: 'Unpaid',
        method: 'Bank transfer',
        amount: 350.0,
    },
    { invoice: 'INV-004', status: 'Paid', method: 'Credit card', amount: 450.0 },
    { invoice: 'INV-005', status: 'Paid', method: 'PayPal', amount: 550.0 },
]

const fmt = (n: number) => `$${n.toFixed(2)}`
const total = INVOICES.reduce((s, r) => s + r.amount, 0)

const SIZES: TableSize[] = ['sm', 'md', 'lg']

type TablePlaygroundArgs = ComponentProps<typeof Table> & {
  headerAlign?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sortDirection?: '—' | 'none' | 'asc' | 'desc';
  hoverable?: boolean;
  selectable?: boolean;
  intent?: 'none' | 'success' | 'warning' | 'destructive' | 'info';
};

const meta: Meta<TablePlaygroundArgs> = {
    title: 'Data Display/Table',
    component: Table,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A semantic HTML table built from composable sub-components and Vanilla Extract styles.

**Usage**

\`\`\`tsx
<Table size="md" striped fixed>
  <Table.ColGroup>
    <Table.Col width="60px" />
    <Table.Col width="15%" />
    <Table.Col />
    <Table.Col width="10rem" />
  </Table.ColGroup>
  <Table.Caption>Recent invoices.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head align="center">#</Table.Head>
      <Table.Head sortable sortDirection="asc" onClick={handleSort}>Status</Table.Head>
      <Table.Head>Description</Table.Head>
      <Table.Head align="right">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row selectable selected={isSelected} onClick={handleSelect} intent="success">
      <Table.Cell align="center">1</Table.Cell>
      <Table.Cell>Paid</Table.Cell>
      <Table.Cell truncate>Long description...</Table.Cell>
      <Table.Cell numeric>$250.00</Table.Cell>
    </Table.Row>
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.Cell colSpan={3}>Total</Table.Cell>
      <Table.Cell numeric>$250.00</Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`Table.Caption\` | Recommended | \`ReactNode\` | Provides the accessible name for the table. Always include one, or use \`aria-label\` when no caption is present. |
| \`Table.Head\` | No | \`<th>\` | Maps to \`role="columnheader"\` automatically — no extra ARIA needed for simple tables. |
| \`scope\` on \`Table.Head\` | No | \`string\` | Add for explicit column scoping in complex or multi-level header tables. |
| \`sortDirection\` on \`Table.Head\` | No | \`'asc' \\| 'desc' \\| 'none'\` | Sets \`aria-sort\` on \`<th>\` automatically. |
| \`selectable\` on \`Table.Row\` | No | \`boolean\` | Sets \`aria-selected\` on \`<tr>\` automatically when combined with \`selected\`. |
| \`aria-label\` on \`Table\` | Conditional | \`string\` | Use when \`Table.Caption\` is omitted. |

- The scrollable wrapper is keyboard-reachable (\`tabIndex={0}\`) so users can scroll without a mouse.
- \`selectable\` rows are pointer-activated only — add \`onKeyDown\` for full keyboard support.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Table\` | Root wrapper with size, striped, bordered and fixed props. |
| \`Table.Caption\` | Accessible name or description for the table. |
| \`Table.ColGroup\` | Wrapper for column definitions. |
| \`Table.Col\` | Defines column width and styling. |
| \`Table.Header\` | Groups header rows. |
| \`Table.Body\` | Groups data rows. |
| \`Table.Footer\` | Groups summary or total rows. |
| \`Table.Row\` | A single table row with hoverable, selectable and intent props. |
| \`Table.Head\` | A header cell with align, sortable and sortDirection props. |
| \`Table.Cell\` | A data cell with align, numeric, truncate and colSpan props. |
                `,
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: SIZES,
            description:
        'Row density — controls cell vertical padding via an inherited CSS custom property.',
            table: { category: 'Table', defaultValue: { summary: 'md' } },
        },
        striped: {
            control: 'boolean',
            description: 'Alternating muted background on even body rows.',
            table: { category: 'Table', defaultValue: { summary: 'false' } },
        },
        bordered: {
            control: 'boolean',
            description: 'Borders on all four sides of every `<th>` and `<td>`.',
            table: { category: 'Table', defaultValue: { summary: 'false' } },
        },
        fixed: {
            control: 'boolean',
            description:
        'Sets `table-layout: fixed`. Required for `Table.ColGroup` / `Table.Col` widths.',
            table: { category: 'Table', defaultValue: { summary: 'false' } },
        },
        headerAlign: {
            control: 'select',
            options: ['left', 'center', 'right'],
            description:
        'Text alignment of every header cell (the Amount column always stays right-aligned).',
            table: { category: 'Table.Header', defaultValue: { summary: 'left' } },
        },
        sortable: {
            control: 'boolean',
            description: 'Makes all header cells interactive.',
            table: { category: 'Table.Header', defaultValue: { summary: 'false' } },
        },
        sortDirection: {
            control: 'select',
            options: ['—', 'none', 'asc', 'desc'],
            description: 'Sort direction shown on all header cells.',
            table: { category: 'Table.Header', defaultValue: { summary: '—' } },
        },
        hoverable: {
            control: 'boolean',
            description: 'Muted background on `:hover` for every body row.',
            table: { category: 'Table.Row', defaultValue: { summary: 'false' } },
        },
        selectable: {
            control: 'boolean',
            description: '`cursor: pointer` + hover + `aria-selected`.',
            table: { category: 'Table.Row', defaultValue: { summary: 'false' } },
        },
        intent: {
            control: 'select',
            options: ['none', 'success', 'warning', 'destructive', 'info'],
            description: 'Semantic colour applied to every body row.',
            table: { category: 'Table.Row', defaultValue: { summary: 'none' } },
        },
    },
    args: {
        size: 'md',
        striped: false,
        bordered: false,
        fixed: false,
        headerAlign: 'left',
        sortable: false,
        sortDirection: '—',
        hoverable: false,
        selectable: false,
        intent: 'none',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '100%', maxWidth: '760px' }}>
                <Story />
            </div>
        ),
    ],
}

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to configure the table, its headers and its rows.',
            },
        },
    },
    render: (args) => {
        const {
            headerAlign,
            sortable,
            sortDirection,
            hoverable,
            selectable,
            intent,
            ...tableArgs
        } = args
        const rowIntent = intent === 'none' ? undefined : intent
        const resolvedSortDir = sortDirection === '—' ? undefined : sortDirection

        return (
            <Table {...tableArgs}>
                <Table.Caption>{'A list of your recent invoices.'}</Table.Caption>
                <Table.Header>
                    <Table.Row>
                        <Table.Head
                            align={headerAlign}
                            sortable={sortable}
                            sortDirection={resolvedSortDir}
                        >
                            {'Invoice'}
                        </Table.Head>
                        <Table.Head
                            align={headerAlign}
                            sortable={sortable}
                            sortDirection={resolvedSortDir}
                        >
                            {'Status'}
                        </Table.Head>
                        <Table.Head
                            align={headerAlign}
                            sortable={sortable}
                            sortDirection={resolvedSortDir}
                        >
                            {'Method'}
                        </Table.Head>
                        <Table.Head align={'right'}>{'Amount'}</Table.Head>
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
                        <Table.Cell colSpan={3}>{'Total'}</Table.Cell>
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

export const Striped: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Alternating muted background on even body rows.',
            },
        },
    },
    render: () => (
        <Table striped>
            <Table.Caption>{'Recent invoices with striped rows.'}</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head>{'Invoice'}</Table.Head>
                    <Table.Head>{'Status'}</Table.Head>
                    <Table.Head>{'Method'}</Table.Head>
                    <Table.Head align={'right'}>{'Amount'}</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {INVOICES.map((row) => (
                    <Table.Row key={row.invoice}>
                        <Table.Cell>{row.invoice}</Table.Cell>
                        <Table.Cell>{row.status}</Table.Cell>
                        <Table.Cell>{row.method}</Table.Cell>
                        <Table.Cell numeric>{fmt(row.amount)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ),
}

export const Bordered: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Borders on all four sides of every header and data cell.',
            },
        },
    },
    render: () => (
        <Table bordered>
            <Table.Caption>{'Recent invoices with bordered cells.'}</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head>{'Invoice'}</Table.Head>
                    <Table.Head>{'Status'}</Table.Head>
                    <Table.Head>{'Method'}</Table.Head>
                    <Table.Head align={'right'}>{'Amount'}</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {INVOICES.map((row) => (
                    <Table.Row key={row.invoice}>
                        <Table.Cell>{row.invoice}</Table.Cell>
                        <Table.Cell>{row.status}</Table.Cell>
                        <Table.Cell>{row.method}</Table.Cell>
                        <Table.Cell numeric>{fmt(row.amount)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ),
}

export const FixedLayout: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Fixed table layout with explicit column widths via `Table.ColGroup`.',
            },
        },
    },
    render: () => (
        <Table fixed>
            <Table.ColGroup>
                <Table.Col width={'25%'} />
                <Table.Col width={'25%'} />
                <Table.Col width={'25%'} />
                <Table.Col width={'25%'} />
            </Table.ColGroup>
            <Table.Caption>{'Recent invoices with fixed column widths.'}</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head>{'Invoice'}</Table.Head>
                    <Table.Head>{'Status'}</Table.Head>
                    <Table.Head>{'Method'}</Table.Head>
                    <Table.Head align={'right'}>{'Amount'}</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {INVOICES.map((row) => (
                    <Table.Row key={row.invoice}>
                        <Table.Cell>{row.invoice}</Table.Cell>
                        <Table.Cell>{row.status}</Table.Cell>
                        <Table.Cell>{row.method}</Table.Cell>
                        <Table.Cell numeric>{fmt(row.amount)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ),
}

export const Sortable: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Sortable column headers with visual direction indicators.',
            },
        },
    },
    render: () => (
        <Table>
            <Table.Caption>{'Recent invoices with sortable headers.'}</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head
                        sortable
                        sortDirection={'asc'}
                    >
                        {'Invoice'}
                    </Table.Head>
                    <Table.Head
                        sortable
                        sortDirection={'none'}
                    >
                        {'Status'}
                    </Table.Head>
                    <Table.Head
                        sortable
                        sortDirection={'none'}
                    >
                        {'Method'}
                    </Table.Head>
                    <Table.Head
                        align={'right'}
                        sortable
                        sortDirection={'desc'}
                    >
                        {'Amount'}
                    </Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {INVOICES.map((row) => (
                    <Table.Row key={row.invoice}>
                        <Table.Cell>{row.invoice}</Table.Cell>
                        <Table.Cell>{row.status}</Table.Cell>
                        <Table.Cell>{row.method}</Table.Cell>
                        <Table.Cell numeric>{fmt(row.amount)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ),
}

export const SelectableRows: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Rows with hover and selection affordances.',
            },
        },
    },
    render: () => (
        <Table>
            <Table.Caption>{'Recent invoices with selectable rows.'}</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head>{'Invoice'}</Table.Head>
                    <Table.Head>{'Status'}</Table.Head>
                    <Table.Head>{'Method'}</Table.Head>
                    <Table.Head align={'right'}>{'Amount'}</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {INVOICES.map((row, index) => (
                    <Table.Row
                        key={row.invoice}
                        selectable
                        selected={index === 0}
                    >
                        <Table.Cell>{row.invoice}</Table.Cell>
                        <Table.Cell>{row.status}</Table.Cell>
                        <Table.Cell>{row.method}</Table.Cell>
                        <Table.Cell numeric>{fmt(row.amount)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ),
}

export const IntentRows: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Semantic row intents for status or emphasis.',
            },
        },
    },
    render: () => (
        <Table>
            <Table.Caption>{'Recent invoices with semantic row intents.'}</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head>{'Invoice'}</Table.Head>
                    <Table.Head>{'Status'}</Table.Head>
                    <Table.Head>{'Method'}</Table.Head>
                    <Table.Head align={'right'}>{'Amount'}</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row intent={'success'}>
                    <Table.Cell>{'INV-001'}</Table.Cell>
                    <Table.Cell>{'Paid'}</Table.Cell>
                    <Table.Cell>{'Credit card'}</Table.Cell>
                    <Table.Cell numeric>{fmt(250)}</Table.Cell>
                </Table.Row>
                <Table.Row intent={'warning'}>
                    <Table.Cell>{'INV-002'}</Table.Cell>
                    <Table.Cell>{'Pending'}</Table.Cell>
                    <Table.Cell>{'PayPal'}</Table.Cell>
                    <Table.Cell numeric>{fmt(150)}</Table.Cell>
                </Table.Row>
                <Table.Row intent={'destructive'}>
                    <Table.Cell>{'INV-003'}</Table.Cell>
                    <Table.Cell>{'Unpaid'}</Table.Cell>
                    <Table.Cell>{'Bank transfer'}</Table.Cell>
                    <Table.Cell numeric>{fmt(350)}</Table.Cell>
                </Table.Row>
                <Table.Row intent={'info'}>
                    <Table.Cell>{'INV-004'}</Table.Cell>
                    <Table.Cell>{'Processing'}</Table.Cell>
                    <Table.Cell>{'Credit card'}</Table.Cell>
                    <Table.Cell numeric>{fmt(450)}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    ),
}