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

import { Box, type BoxVariant } from '@components/layout/box'
import { THEME_COLORS } from '@stories/_shared/constants/themeColors.const.ts'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const BOX_VARIANTS: BoxVariant[] = [
    'div',
    'section',
    'article',
    'aside',
    'main',
    'header',
    'footer',
    'nav',
    'ul',
    'ol',
    'li',
    'form',
    'fieldset',
    'figure',
    'figcaption',
    'details',
    'summary',
    'dialog',
    'address',
    'span',
]

const DISPLAY = [
    'block',
    'flex',
    'inline-flex',
    'inline',
    'inline-block',
    'grid',
    'inline-grid',
    'none',
    'contents',
    'flow-root',
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
const BG = ['transparent', ...THEME_COLORS] as const
const WH = [undefined, 'full', 'screen', 'fit', 'min', 'max', 'auto'] as const
const MIN_MAX = [undefined, 'none', 'full', 'screen', 'fit', 'min', 'max'] as const
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
const FLEX = [undefined, '1', 'auto', 'initial', 'none'] as const
const ALIGN_SELF = [
    undefined,
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
] as const
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
| \`as\` | No | HTML element | Prefer semantic elements for structural content. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Name landmark elements when needed. |
`

const BoxDocsPage = () => (
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
    title: 'Layout/Box',
    component: Box,
    parameters: {
        layout: 'padded',
        docs: {
            page: BoxDocsPage,
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A polymorphic layout primitive that renders as any HTML element and exposes design-token-based props for display, padding, margin, gap, background, border-radius, width, height, overflow, and position.

It is the foundation of \`Flex\` and \`Grid\` — both extend \`Box\` with their respective display constraints.

**Usage**

\`\`\`tsx
// Default div with padding, background and rounded corners
<Box padding="lg" backgroundColor="card" borderRadius="md">
  Content
</Box>

// Polymorphic: rendered as a <section> with a muted background
<Box as="section" padding="xl" backgroundColor="muted">
  <Typography variant="h2">Section title</Typography>
</Box>
\`\`\`

                `,
            },
        },
    },
    argTypes: {
        as: { control: 'select', options: BOX_VARIANTS },
        display: { control: 'select', options: DISPLAY },
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
        gap: { control: 'select', options: SPACING },
        columnGap: { control: 'select', options: SPACING },
        rowGap: { control: 'select', options: SPACING },
        borderRadius: { control: 'select', options: ROUNDED },
        backgroundColor: { control: 'select', options: BG },
        borderColor: { control: 'select', options: BG },
        boxShadow: { control: 'select', options: BOX_SHADOW },
        width: { control: 'select', options: WH },
        height: { control: 'select', options: WH },
        minWidth: { control: 'select', options: MIN_MAX },
        maxWidth: { control: 'select', options: MIN_MAX },
        minHeight: { control: 'select', options: MIN_MAX },
        maxHeight: { control: 'select', options: MIN_MAX },
        flex: { control: 'select', options: FLEX },
        alignSelf: { control: 'select', options: ALIGN_SELF },
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
        children: 'Box content',
        as: 'div',
        padding: 'lg',
        backgroundColor: 'muted',
        borderRadius: 'md',
    },
} satisfies Meta<typeof Box>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(/* language=tsx */ `
<Box as="div" padding="lg" backgroundColor="muted" borderRadius="md">Box content</Box>`),
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText(args.children as string)).toBeInTheDocument()
    },
}