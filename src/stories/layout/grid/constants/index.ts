import type { Meta } from '@storybook/react-vite'

import { Grid } from '@components/layout/grid'
import { md } from '@stories/_shared/utils/markdown'

export const COLUMNS = [
    undefined,
    'none',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
] as const

export const AUTO_ROWS = [undefined, 'auto', 'min', 'max', 'fr'] as const

export const FLOW = [
    undefined,
    'row',
    'column',
    'dense',
    'row-dense',
    'column-dense',
] as const

export const ALIGN = [
    undefined,
    'start',
    'end',
    'center',
    'stretch',
    'baseline',
] as const

export const JUSTIFY_ITEMS = [undefined, 'start', 'end', 'center', 'stretch'] as const

export const ALIGN_CONTENT = [
    undefined,
    'start',
    'end',
    'center',
    'stretch',
    'space-between',
    'space-around',
    'space-evenly',
] as const

export const JUSTIFY_CONTENT = [
    undefined,
    'start',
    'end',
    'center',
    'stretch',
    'space-between',
    'space-around',
    'space-evenly',
] as const

export const SPACING = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128] as const

export const ROUNDED = [undefined, 0, 4, 6, 8, 10, 14, 20, 'full'] as const

export const BORDER_WIDTH = [undefined, '0', '1px', '2px', '4px', '8px'] as const

export const BORDER_STYLE = [
    undefined,
    'solid',
    'dashed',
    'dotted',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
    'none',
    'hidden',
] as const

export const BOX_SHADOW = [undefined, 'none', 'xs', 'sm', 'md', 'lg', 'xl'] as const

export const WH = [undefined, '100%', '100vw', 'fit-content', 'min-content', 'max-content', 'auto'] as const

export const MIN_MAX = [undefined, 'none', '100%', '100vw', 'fit-content', 'min-content', 'max-content'] as const

export const OVERFLOW = [
    undefined,
    'visible',
    'hidden',
    'auto',
    'scroll',
    'clip',
] as const

export const POSITION = [
    undefined,
    'static',
    'relative',
    'absolute',
    'fixed',
    'sticky',
] as const

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`as\` | No | HTML element | Use semantic elements for structural content. |
| DOM order | — | — | Keep a logical DOM sequence. |
`

export const ARG_TYPES = {
    as: { control: 'select', options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav', 'ul', 'ol'] },
    columns: { control: 'select', options: COLUMNS },
    gridAutoRows: { control: 'select', options: AUTO_ROWS },
    gridTemplateRows: { control: 'select', options: [undefined, 'none', 'auto', 'min', 'max', '1fr', '0fr'] },
    gridAutoFlow: { control: 'select', options: FLOW },
    alignItems: { control: 'select', options: ALIGN },
    justifyItems: { control: 'select', options: JUSTIFY_ITEMS },
    justifyContent: { control: 'select', options: JUSTIFY_CONTENT },
    alignContent: { control: 'select', options: ALIGN_CONTENT },
    gap: { control: 'select', options: SPACING },
    columnGap: { control: 'select', options: SPACING },
    rowGap: { control: 'select', options: SPACING },
    padding: { control: 'select', options: SPACING },
    paddingX: { control: 'select', options: SPACING },
    paddingY: { control: 'select', options: SPACING },
    paddingTop: { control: 'select', options: SPACING },
    paddingRight: { control: 'select', options: SPACING },
    paddingBottom: { control: 'select', options: SPACING },
    paddingLeft: { control: 'select', options: SPACING },
    margin: { control: 'select', options: [...SPACING, 'auto'] },
    marginX: { control: 'select', options: [...SPACING, 'auto'] },
    marginY: { control: 'select', options: [...SPACING, 'auto'] },
    marginTop: { control: 'select', options: [...SPACING, 'auto'] },
    marginRight: { control: 'select', options: [...SPACING, 'auto'] },
    marginBottom: { control: 'select', options: [...SPACING, 'auto'] },
    marginLeft: { control: 'select', options: [...SPACING, 'auto'] },
    borderRadius: { control: 'select', options: ROUNDED },
    backgroundColor: { control: 'text', description: 'CSS color or custom-property reference; style wins.' },
    borderColor: { control: 'text', description: 'CSS color or custom-property reference; style wins.' },
    boxShadow: { control: 'select', options: BOX_SHADOW },
    width: { control: 'select', options: WH },
    height: { control: 'select', options: WH },
    minWidth: { control: 'select', options: MIN_MAX },
    maxWidth: { control: 'select', options: MIN_MAX },
    minHeight: { control: 'select', options: MIN_MAX },
    maxHeight: { control: 'select', options: MIN_MAX },
    overflow: { control: 'select', options: OVERFLOW },
    overflowX: { control: 'select', options: OVERFLOW },
    overflowY: { control: 'select', options: OVERFLOW },
    position: { control: 'select', options: POSITION },
    borderWidth: { control: 'select', options: BORDER_WIDTH },
    borderTopWidth: { control: 'select', options: BORDER_WIDTH },
    borderRightWidth: { control: 'select', options: BORDER_WIDTH },
    borderBottomWidth: { control: 'select', options: BORDER_WIDTH },
    borderLeftWidth: { control: 'select', options: BORDER_WIDTH },
    borderStyle: { control: 'select', options: BORDER_STYLE },
    children: { control: false, description: 'This example supplies nine cells.' },
    className: { control: 'text', description: 'Additional container class.' },
    style: { control: 'object', description: 'Inline style overrides.' },
    ref: { control: false, description: 'Ref passed to the rendered element.' },
} satisfies NonNullable<Meta<typeof Grid>['argTypes']>

export const DEFAULT_ARGS = {
    columns: 3,
    gap: 12,
} satisfies NonNullable<Meta<typeof Grid>['args']>
