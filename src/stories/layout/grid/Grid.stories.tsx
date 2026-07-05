import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Grid } from '@components/layout/grid'
import { Box } from '@components/layout/box'
import { md } from '@stories/utils/markdown'

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
    'between',
    'around',
    'evenly',
] as const
const JUSTIFY_CONTENT = [
    undefined,
    'start',
    'end',
    'center',
    'stretch',
    'between',
    'around',
    'evenly',
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
const BG = [
    undefined,
    'transparent',
    'background',
    'card',
    'muted',
    'primary',
    'primarySubtle',
    'secondary',
    'secondarySubtle',
] as const

const meta = {
    title: 'Layout/Grid',
    component: Grid,
    parameters: {
        layout: 'padded',
        docs: {
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

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`as\` | No | HTML element | Use \`as="ul"\` with \`<li>\` children when the grid represents a list; no ARIA needed for purely decorative grids. |
| DOM order | — | — | CSS grid order does not affect tab order or screen-reader reading order — keep a logical DOM sequence. |

- \`Grid\` has no implicit ARIA semantics; add semantic \`as\` values when the content has a structural role.
                `,
            },
        },
    },
    argTypes: {
        columns: { control: 'select', options: COLUMNS },
        autoRows: { control: 'select', options: AUTO_ROWS },
        flow: { control: 'select', options: FLOW },
        align: { control: 'select', options: ALIGN },
        justifyItems: { control: 'select', options: JUSTIFY_ITEMS },
        justifyContent: { control: 'select', options: JUSTIFY_CONTENT },
        alignContent: { control: 'select', options: ALIGN_CONTENT },
        gap: { control: 'select', options: SPACING },
        p: { control: 'select', options: SPACING },
        radius: { control: 'select', options: ROUNDED },
        bg: { control: 'select', options: BG },
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
        p={'md'}
        radius={'sm'}
        bg={'primarySubtle'}
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