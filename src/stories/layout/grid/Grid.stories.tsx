import { vars } from '@theme/styles/contract/contract.css.ts'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { Grid } from '@components/layout/grid'
import { Box } from '@components/layout/box'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const COLUMNS = [
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
const AUTO_ROWS = [undefined, 'auto', 'min', 'max', 'fr'] as const
const FLOW = [
    undefined,
    'row',
    'column',
    'dense',
    'row-dense',
    'column-dense',
] as const
const ALIGN = [
    undefined,
    'start',
    'end',
    'center',
    'stretch',
    'baseline',
] as const
const JUSTIFY_ITEMS = [undefined, 'start', 'end', 'center', 'stretch'] as const
const ALIGN_CONTENT = [
    undefined,
    'start',
    'end',
    'center',
    'stretch',
    'space-between',
    'space-around',
    'space-evenly',
] as const
const JUSTIFY_CONTENT = [
    undefined,
    'start',
    'end',
    'center',
    'stretch',
    'space-between',
    'space-around',
    'space-evenly',
] as const
const SPACING = [
    undefined,
    'none',
    'px',
    'xxs',
    'xs',
    'xs2',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
] as const
const ROUNDED = [
    undefined,
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'full',
] as const
const BORDER_WIDTH = [undefined, '0', '1px', '2px', '4px', '8px'] as const
const BORDER_STYLE = [
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
const BOX_SHADOW = [
    undefined,
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'inner',
] as const
const WH = [undefined, 'full', 'screen', 'fit', 'min', 'max', 'auto'] as const
const MIN_MAX = [undefined, 'none', 'full', 'screen', 'fit', 'min', 'max'] as const
const OVERFLOW = [
    undefined,
    'visible',
    'hidden',
    'auto',
    'scroll',
    'clip',
] as const
const POSITION = [
    undefined,
    'static',
    'relative',
    'absolute',
    'fixed',
    'sticky',
] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`as\` | No | HTML element | Use semantic elements for structural content. |
| DOM order | — | — | Keep a logical DOM sequence. |
`

const GridDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Layout/Grid',
    component: Grid,
    parameters: {
        layout: 'padded',
        docs: {
            page: GridDocsPage,
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A layout primitive that renders a \`<div>\` with \`display: grid\` and token-based props for columns, gap, auto-flow, alignment, padding, background, and border-radius.

**Usage**

\`\`\`tsx
// 3-column card grid with a gap
<Grid columns={3} gap="md">
  <Card />
  <Card />
  <Card />
</Grid>
\`\`\`

                `,
            },
        },
    },
    argTypes: {
        as: { control: 'select', options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav', 'ul', 'ol'] },
        columns: { control: 'select', options: COLUMNS },
        gridAutoRows: { control: 'select', options: AUTO_ROWS },
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
    },
    args: {
        columns: 3,
        gap: 'md',
    },
} satisfies Meta<typeof Grid>

export default meta

type Story = StoryObj<typeof meta>;

const Cell = ({ label }: { label: string }) => (
    <Box
        padding={'md'}
        borderRadius={'sm'}
        backgroundColor={vars.color.primary.subtle}
        style={{ fontSize: '0.875rem', textAlign: 'center' }}
    >
        {label}
    </Box>
)

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(/* language=tsx */ `
<Grid columns={3} gap="md">
    <Box padding="md" borderRadius="sm" backgroundColor={vars.color.primary.subtle}>Cell 1</Box>
    <Box padding="md" borderRadius="sm" backgroundColor={vars.color.primary.subtle}>Cell 2</Box>
    <Box padding="md" borderRadius="sm" backgroundColor={vars.color.primary.subtle}>Cell 3</Box>
    <Box padding="md" borderRadius="sm" backgroundColor={vars.color.primary.subtle}>Cell 4</Box>
    <Box padding="md" borderRadius="sm" backgroundColor={vars.color.primary.subtle}>Cell 5</Box>
    <Box padding="md" borderRadius="sm" backgroundColor={vars.color.primary.subtle}>Cell 6</Box>
    <Box padding="md" borderRadius="sm" backgroundColor={vars.color.primary.subtle}>Cell 7</Box>
    <Box padding="md" borderRadius="sm" backgroundColor={vars.color.primary.subtle}>Cell 8</Box>
    <Box padding="md" borderRadius="sm" backgroundColor={vars.color.primary.subtle}>Cell 9</Box>
</Grid>`),
        },
    },
    render: (args) => (
        <Grid {...args}>
            {Array.from({ length: 9 }, (_, i) => (
                <Cell
                    key={i}
                    label={`Cell ${i + 1}`}
                />
            ))}
        </Grid>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Cell 1')).toBeInTheDocument()
    },
}