import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    Table
} from '@components/data-display/table'
import TableDocsPage from '@stories/data-display/table/components/table-docs-page/TableDocsPage'
import TablePlayground from '@stories/data-display/table/components/table-playground/TablePlayground'
import TableSizes from '@stories/data-display/table/components/table-sizes/TableSizes'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/data-display/table/constants'
import tableSizesSource from '@stories/data-display/table/sources/TableSizes.source.tsx.txt?raw'
import { type TableStoryArgs } from '@stories/data-display/table/types'
import { createTableSource } from '@stories/data-display/table/utils/create-table-source/createTableSource.utils'
import { playTableSelectableRows } from '@stories/data-display/table/utils/playTableSelectableRows.utils'
import { playTableSortable } from '@stories/data-display/table/utils/playTableSortable.utils'

const meta = {
    title: 'Data Display/Table',
    component: Table,
    tags: ['autodocs'],
    render: TablePlayground,
    parameters: {
        layout: 'padded',
        docs: {
            page: TableDocsPage,
            description: {
                component: 'Compose a semantic table with native sections, cells, captions and columns. Density, striping and fixed layout are presentation options; sorting and selection remain consumer-owned.',
            },
            source: {
                transform: (_source: string, context: Readonly<{ args: TableStoryArgs }>): string => createTableSource(_source, context),
            },
        },
    },
    args: DEFAULT_ARGS,
    argTypes: ARG_TYPES,
} satisfies Meta<TableStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Striped: Story = {
    args: { striped: true },
}

export const Bordered: Story = {
    args: { bordered: true },
}

export const FixedLayout: Story = {
    args: { fixed: true, columnWidth: '25%', truncate: true },
}

export const Sortable: Story = {
    args: { sortable: true, sortDirection: 'asc' },
    play: playTableSortable,
}

export const SelectableRows: Story = {
    args: { selectable: true, selectedInvoice: 'INV-001' },
    play: playTableSelectableRows,
}

export const IntentRows: Story = {
    args: { intent: 'warning', caption: 'Invoices awaiting review', hoverable: true },
}
export const Sizes = {
    render: TableSizes,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Small, medium and large cell density with the same data and default presentation. This comparison fixes each size; use Playground to edit other props.',
            },
            source: {
                language: 'tsx',
                type: 'code',
                transform: (source: string): string => source,
                code: tableSizesSource.trim(),
            },
        },
    },
} satisfies Story
