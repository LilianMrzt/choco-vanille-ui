import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Flex } from '@components/layout/flex'
import { Box } from '@components/layout/box'
import { md } from '@stories/utils/markdown'

const DIRECTION = ['row', 'column', 'row-reverse', 'column-reverse'] as const
const WRAP = [undefined, 'nowrap', 'wrap', 'wrap-reverse'] as const
const ALIGN = [
    undefined,
    'start',
    'end',
    'center',
    'stretch',
    'baseline',
] as const
const JUSTIFY = [
    undefined,
    'start',
    'end',
    'center',
    'between',
    'around',
    'evenly',
    'stretch',
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
    title: 'Layout/Flex',
    component: Flex,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A layout primitive that renders a \`<div>\` (or any element via the inherited \`as\` prop) with \`display: flex\` and a set of design-token-based props for direction, alignment, gap, padding, background and border-radius.

\`Flex\` extends \`Box\` and simply pre-sets \`display\` to \`flex\` or \`inline-flex\` (via the \`inline\` prop). All \`Box\` props are available.

**Usage**

\`\`\`tsx
// Horizontal row with centered items and a gap
<Flex alignItems="center" gap="md">
  <Avatar />
  <Typography variant="span">Jane Doe</Typography>
</Flex>

// Vertical column with stretch alignment
<Flex flexDirection="column" alignItems="stretch" gap="lg">
  <Card />
  <Card />
</Flex>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`as\` | No | HTML element | Use semantic elements (\`nav\`, \`section\`, \`ul\`…) when the container has a structural or landmark role. |
| \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required when using a landmark \`as\` value with multiple instances on the same page. |

- \`Flex\` has no implicit ARIA semantics — it does not receive focus or announce itself as a landmark unless you set the correct \`as\` value.
                `,
            },
        },
    },
    argTypes: {
        flexDirection: { control: 'select', options: DIRECTION },
        flexWrap: { control: 'select', options: WRAP },
        alignItems: { control: 'select', options: ALIGN },
        justifyContent: { control: 'select', options: JUSTIFY },
        inline: { control: 'boolean' },
        gap: { control: 'select', options: SPACING },
        padding: { control: 'select', options: SPACING },
        borderRadius: { control: 'select', options: ROUNDED },
        backgroundColor: { control: 'select', options: BG },
    },
    args: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 'sm',
    },
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<typeof meta>;

const Item = ({ label }: { label: string }) => (
    <Box
        padding={'md'}
        borderRadius={'sm'}
        backgroundColor={'primarySubtle'}
        style={{ fontSize: '0.875rem' }}
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
        <Flex {...args}>
            <Item label={'Item 1'} />
            <Item label={'Item 2'} />
            <Item label={'Item 3'} />
        </Flex>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText('Item 1')).toBeInTheDocument()
    },
}