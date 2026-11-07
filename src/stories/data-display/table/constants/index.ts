import type { TableStoryArgs } from '@stories/data-display/table/types'
import type { Meta } from '@storybook/react-vite'
import { fn } from 'storybook/test'

export const INVOICES = [
    { invoice: 'INV-001', amount: 250 },
    { invoice: 'INV-002', amount: 150 },
    { invoice: 'INV-003', amount: 350 },
] as const

/** Public density values used by Controls and the focused comparison. */
export const TABLE_DENSITIES = ['sm', 'md', 'lg'] as const

export const DEFAULT_ARGS = {
    size: 'md',
    striped: false,
    bordered: false,
    fixed: false,
    caption: 'Recent invoices',
    columnWidth: '',
    columnMinWidth: '',
    columnMaxWidth: '',
    headAlign: 'left',
    sortable: false,
    sortDirection: 'unset',
    hoverable: false,
    selectable: false,
    selectedInvoice: '',
    intent: 'unset',
    cellAlign: 'left',
    numeric: true,
    truncate: false,
    footerLabel: 'Total',
    onSort: fn(),
    onSelect: fn(),
} satisfies NonNullable<Meta<TableStoryArgs>['args']>

export const ARG_TYPES = {
    size: {
        control: 'select',
        options: TABLE_DENSITIES,
        description: 'Cell density: 4px, 8px or 12px vertical padding.',
        table: { category: 'Table', defaultValue: { summary: 'md' } },
    },
    striped: {
        control: 'boolean',
        description: 'Alternating backgrounds on even body rows without an intent.',
        table: { category: 'Table', defaultValue: { summary: 'false' } },
    },
    bordered: {
        control: 'boolean',
        description: 'Borders every header and data cell.',
        table: { category: 'Table', defaultValue: { summary: 'false' } },
    },
    fixed: {
        control: 'boolean',
        description: 'Fixed table layout for predictable column widths and truncation.',
        table: { category: 'Table', defaultValue: { summary: 'false' } },
    },
    caption: {
        control: 'text',
        description: 'Demo text passed to Caption.children as the accessible table name.',
        table: { category: 'Compound: Caption' },
    },
    columnWidth: {
        control: 'text',
        description: 'Demo CSS width of the first Col; blank omits it. Use fixed layout.',
        table: { category: 'Compound: Col', defaultValue: { summary: 'undefined' } },
    },
    columnMinWidth: {
        control: 'text',
        description: 'Demo first Col minimum width; blank omits it. Browser layout rules apply.',
        table: { category: 'Compound: Col', defaultValue: { summary: 'undefined' } },
    },
    columnMaxWidth: {
        control: 'text',
        description: 'Demo first Col maximum width; blank omits it. Browser layout rules apply.',
        table: { category: 'Compound: Col', defaultValue: { summary: 'undefined' } },
    },
    headAlign: {
        control: 'select',
        options: ['left', 'center', 'right'],
        description: 'Demo align prop forwarded to both Head cells.',
        table: { category: 'Compound: Head', defaultValue: { summary: 'left' } },
    },
    sortable: {
        control: 'boolean',
        description: 'Enables amount header sorting by click, Enter or Space.',
        table: { category: 'Compound: Head', defaultValue: { summary: 'false' } },
    },
    sortDirection: {
        control: 'select',
        options: ['unset', 'none', 'asc', 'desc'],
        description: 'Demo direction on the Amount Head only. Unset omits the public prop.',
        table: { category: 'Compound: Head', defaultValue: { summary: 'undefined' } },
    },
    onSort: {
        control: false,
        description: 'Demo spy called with Head.onClick native event before args update.',
        table: { category: 'Compound: Head' },
    },
    hoverable: {
        control: 'boolean',
        description: 'Hover styling for each body Row.',
        table: { category: 'Compound: Row', defaultValue: { summary: 'false' } },
    },
    selectable: {
        control: 'boolean',
        description: 'Enables single invoice selection by click, Enter or Space.',
        table: { category: 'Compound: Row', defaultValue: { summary: 'false' } },
    },
    selectedInvoice: {
        control: 'select',
        options: ['', 'INV-001', 'INV-002', 'INV-003'],
        description: 'Demo identity determining each Row.selected. Blank clears selection.',
        table: { category: 'Compound: Row' },
    },
    intent: {
        control: 'select',
        options: ['unset', 'success', 'warning', 'danger', 'info'],
        description: 'Body Row intent; unset omits it. Add content conveying its meaning.',
        table: { category: 'Compound: Row', defaultValue: { summary: 'undefined' } },
    },
    onSelect: {
        control: false,
        description: 'Demo spy called with Row.onClick native event before args update.',
        table: { category: 'Compound: Row' },
    },
    cellAlign: {
        control: 'select',
        options: ['left', 'center', 'right'],
        description: 'Align forwarded to body and footer Cells; numeric overrides it.',
        table: { category: 'Compound: Cell', defaultValue: { summary: 'left' } },
    },
    numeric: {
        control: 'boolean',
        description: 'Numeric prop on amount Cells. Demo starts true; component defaults false.',
        table: { category: 'Compound: Cell', defaultValue: { summary: 'false' } },
    },
    truncate: {
        control: 'boolean',
        description: 'Truncates invoice Cells; constrain the first column with fixed layout.',
        table: { category: 'Compound: Cell', defaultValue: { summary: 'false' } },
    },
    footerLabel: {
        control: 'text',
        description: 'Demo footer label passed to the first footer Cell.children.',
        table: { category: 'Compound: Footer' },
    },
    'aria-label': {
        control: 'text',
        description: 'Optional native accessible name overriding the caption name.',
        table: { category: 'Native table' },
    },
    title: {
        control: 'text',
        description: 'Native table tooltip.',
        table: { category: 'Native table' },
    },
    children: {
        control: false,
        description: 'Semantic compound content, fixed by this demonstration.',
        table: { category: 'Table' },
    },
    className: {
        control: false,
        description: 'Consumer CSS class on the table; excluded because it requires external CSS.',
        table: { category: 'Table' },
    },
    style: {
        control: false,
        description: 'Native table style overrides default CSS; excluded as custom styling code.',
        table: { category: 'Table' },
    },
    ref: {
        control: false,
        description: 'Ref to HTMLTableElement, not its scroll wrapper; non-serializable.',
        table: { category: 'Table' },
    },
    onClick: {
        control: false,
        description: 'Native bubbling table click handler; non-serializable.',
        table: { category: 'Native table' },
    },
    onKeyDown: {
        control: false,
        description: 'Native bubbling table key handler; non-serializable.',
        table: { category: 'Native table' },
    },
} satisfies NonNullable<Meta<TableStoryArgs>['argTypes']>
