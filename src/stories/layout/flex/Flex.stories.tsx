import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex } from '@components/layout/flex'
import { Box } from '@components/layout/box'

const meta = {
    title: 'Layout/Flex',
    component: Flex,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A layout primitive that renders a \`<div>\` (or any element via the inherited \`as\` prop) with \`display: flex\` and a set of design-token-based props for direction, alignment, gap, padding, background and border-radius.

\`Flex\` extends \`Box\` and simply pre-sets \`display\` to \`flex\` or \`inline-flex\` (via the \`inline\` prop). All \`Box\` props are available.

**Usage**
\`\`\`tsx
// Horizontal row with centered items and a gap
<Flex align="center" gap="md">
  <Avatar />
  <Typography variant="span">Jane Doe</Typography>
</Flex>

// Vertical column with stretch alignment
<Flex direction="column" align="stretch" gap="lg">
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
        direction: { control: 'select', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
        wrap: { control: 'select', options: [undefined, 'nowrap', 'wrap', 'wrap-reverse'] },
        align: { control: 'select', options: [undefined, 'start', 'end', 'center', 'stretch', 'baseline'] },
        justify: { control: 'select', options: [undefined, 'start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'] },
        gap: { control: 'select', options: [undefined, 'none', 'px', 'xxs', 'xs', 'xs2', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
        p: { control: 'select', options: [undefined, 'none', 'px', 'xxs', 'xs', 'xs2', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
        rounded: { control: 'select', options: [undefined, 'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
        bg: { control: 'select', options: [undefined, 'transparent', 'background', 'card', 'muted', 'primary', 'primarySubtle', 'secondary', 'secondarySubtle'] },
    },
    args: {
        direction: 'row',
        align: 'center',
        gap: 'sm',
    },
} satisfies Meta<typeof Flex>

export default meta

type Story = StoryObj<typeof meta>

const Item = ({ label }: { label: string }) => (
    <Box
        p={'md'}
        rounded={'sm'}
        bg={'primarySubtle'}
        style={{ fontSize: '0.875rem' }}
    >
        {label}
    </Box>
)

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground. Adjust `direction`, `align`, `justify`, `gap`, `wrap`, and other props in the Controls panel to explore the full API.',
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
}

export const Directions: Story = {
    name: 'Flex directions',
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'The four `direction` values: `row` (default), `column`, `row-reverse`, and `column-reverse`. Choose based on the reading order and visual hierarchy of the content.',
            },
        },
    },
    render: () => (
        <Flex
            direction={'column'}
            gap={'xl'}
            p={'lg'}
        >
            {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map(dir => (
                <Box key={dir}>
                    <Box
                        mb={'xs'}
                        style={{ fontSize: '0.75rem', fontWeight: 600 }}
                    >{`direction="${dir}"`}</Box>
                    <Flex
                        direction={dir}
                        gap={'sm'}
                        p={'sm'}
                        rounded={'md'}
                        bg={'muted'}
                    >
                        <Item label={'A'} />
                        <Item label={'B'} />
                        <Item label={'C'} />
                    </Flex>
                </Box>
            ))}
        </Flex>
    ),
}

export const AlignJustify: Story = {
    name: 'Align & Justify',
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: 'Common combinations of `align` (cross-axis) and `justify` (main-axis). `justify="between"` distributes items evenly; `align="end"` anchors them to the bottom of the cross axis.',
            },
        },
    },
    render: () => (
        <Flex
            direction={'column'}
            gap={'xl'}
            p={'lg'}
        >
            <Box>
                <Box
                    mb={'xs'}
                    style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >{'justify="between" align="center"'}</Box>
                <Flex
                    justify={'between'}
                    align={'center'}
                    p={'md'}
                    rounded={'md'}
                    bg={'muted'}
                    style={{ height: '6rem' }}
                >
                    <Item label={'Left'} />
                    <Item label={'Center'} />
                    <Item label={'Right'} />
                </Flex>
            </Box>

            <Box>
                <Box
                    mb={'xs'}
                    style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >{'justify="center" align="end"'}</Box>
                <Flex
                    justify={'center'}
                    align={'end'}
                    p={'md'}
                    rounded={'md'}
                    bg={'muted'}
                    style={{ height: '6rem' }}
                >
                    <Item label={'A'} />
                    <Item label={'B'} />
                    <Item label={'C'} />
                </Flex>
            </Box>
        </Flex>
    ),
}

export const Wrap: Story = {
    name: 'Flex wrap',
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: '`wrap="wrap"` allows items to flow onto the next line when the container runs out of space — essential for responsive tag lists, button groups, and card grids.',
            },
        },
    },
    render: () => (
        <Flex
            wrap={'wrap'}
            gap={'sm'}
            p={'md'}
            rounded={'md'}
            bg={'muted'}
            style={{ maxWidth: '20rem' }}
        >
            {Array.from({ length: 10 }, (_, i) => (
                <Item
                    key={i}
                    label={`Item ${i + 1}`}
                />
            ))}
        </Flex>
    ),
}
