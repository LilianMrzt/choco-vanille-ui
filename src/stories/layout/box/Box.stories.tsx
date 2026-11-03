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
import { vars } from '@theme/styles/contract/contract.css.ts'
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
const TEXT_ALIGN = [
    undefined,
    'left',
    'center',
    'right',
    'justify',
    'start',
    'end',
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
A polymorphic layout primitive with spacing tokens and free CSS color values, including theme variables and external custom properties.

Color props are inline declarations; consumer \`style\` wins. Omit color props when stylesheet interaction states should control colors.

It is the foundation of \`Flex\` and \`Grid\` — both extend \`Box\` with their respective display constraints.

**Usage**

\`\`\`tsx
// Default div with padding, background and rounded corners
<Box padding="lg" backgroundColor={vars.color.surface.main} borderRadius="md">
  Content
</Box>

// Polymorphic: rendered as a <section> with a muted background
<Box as="section" padding="xl" backgroundColor={vars.color.surface.muted}>
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
        textAlign: { control: 'select', options: TEXT_ALIGN },
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
        color: { control: 'text', description: 'CSS color, including var(--custom-color). Inherits when omitted; style.color wins.' },
        backgroundColor: { control: 'text', description: 'CSS background color, including vars.color references. No default; style wins.' },
        borderColor: { control: 'text', description: 'CSS border color or shorthand, including custom properties. No default; style wins.' },
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
        backgroundColor: vars.color.surface.muted,
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
import { Box, vars } from '@choco-vanille/ui'

<Box as="div" padding="lg" backgroundColor={vars.color.surface.muted} borderRadius="md">Box content</Box>`),
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText(args.children as string)).toBeInTheDocument()
    },
}

export const Colors: Story = {
    args: {
        color: 'var(--custom-color, rebeccapurple)',
        backgroundColor: vars.color.surface.muted,
        borderColor: vars.color.border.strong,
        borderStyle: 'solid',
        borderWidth: '1px',
    },
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
import { Box, vars } from '@choco-vanille/ui'

<Box
  as="div"
  padding="lg"
  borderRadius="md"
  color="var(--custom-color, rebeccapurple)"
  backgroundColor={vars.color.surface.muted}
  borderColor={vars.color.border.strong}
  borderStyle="solid"
  borderWidth="1px"
>
  Box content
</Box>`),
        },
    },
}