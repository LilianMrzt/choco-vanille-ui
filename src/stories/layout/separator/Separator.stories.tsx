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

import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Separator } from '@components/layout/separator'
import { THEME_COLORS } from '@stories/_shared/constants/themeColors.const.ts'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const ORIENTATION = ['horizontal', 'vertical'] as const
const COLORS = [
    'transparent',
    'primary',
    'secondary',
    'neutral',
    'danger',
    'success',
    'warning',
    'info',
] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-hidden\` | No | \`boolean\` | Hide decorative separators from assistive technologies. |
| \`orientation\` | No | \`'horizontal' \| 'vertical'\` | Controls visual and ARIA orientation. |
| \`label\` | No | \`string\` | Displays text between two separator lines. |
| \`textColor\` | No | \`ThemeColor\` | Color of the label; defaults to \`textTertiary\`. |
`

const SeparatorDocsPage = () => (
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
    title: 'Layout/Separator',
    component: Separator,
    parameters: {
        layout: 'padded',
        docs: {
            page: SeparatorDocsPage,
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A thin visual divider built on top of \`Box\`. Use it to separate content horizontally or vertically.

\`Separator\` extends \`Box\` and therefore inherits all layout props (padding, margin, background color, border radius, etc.).

**Usage**

\`\`\`tsx
// Horizontal rule between two blocks
<Stack gap="md">
  <Typography>Above</Typography>
  <Separator />
  <Typography>Below</Typography>
</Stack>

// Vertical rule inside a row
<Flex alignItems="center" gap="md">
  <Typography>Left</Typography>
  <Separator orientation="vertical" />
  <Typography>Right</Typography>
</Flex>
\`\`\`

                `,
            },
        },
    },
    argTypes: {
        orientation: { control: 'select', options: ORIENTATION },
        color: { control: 'select', options: THEME_COLORS },
        textColor: { control: 'select', options: THEME_COLORS },
        label: { control: 'text' },
    },
    args: {
        orientation: 'horizontal',
    },
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to switch between horizontal and vertical orientations.',
            },
            ...storySource(/* language=tsx */ `
<Box padding="lg" backgroundColor="surface" borderRadius="md">
    <Flex flexDirection="column" gap="md">
        <span>Above</span>
        <Separator orientation="horizontal" label="Or continue" />
        <span>Below</span>
    </Flex>
</Box>`),
        },
    },
    render: (args) => (
        <Box
            padding={'lg'}
            backgroundColor={'surface'}
            borderRadius={'md'}
            style={{
                height: args.orientation === 'vertical' ? '120px' : undefined,
                width: args.orientation === 'vertical' ? 'fit-content' : undefined,
            }}
        >
            {args.orientation === 'vertical' ? (
                <Flex
                    alignItems={'center'}
                    gap={'md'}
                    style={{ height: '100%' }}
                >
                    <span>Left</span>
                    <Separator {...args} />
                    <span>Right</span>
                </Flex>
            ) : (
                <Flex
                    flexDirection={'column'}
                    gap={'md'}
                >
                    <span>Above</span>
                    <Separator {...args} />
                    <span>Below</span>
                </Flex>
            )}
        </Box>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('separator')).toBeInTheDocument()
    },
}

export const WithLabel: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Flex flexDirection="column" gap="lg">
    <Separator label="Or continue" />
    <Flex alignItems="center" gap="md" height="120px">
        <span>Left</span>
        <Separator orientation="vertical" label="Or" />
        <span>Right</span>
    </Flex>
</Flex>`),
        },
    },
    render: () => (
        <Flex
            flexDirection={'column'}
            gap={'lg'}
        >
            <Separator label={'Or continue'} />
            <Flex
                alignItems={'center'}
                gap={'md'}
                height={'120px'}
            >
                <span>Left</span>
                <Separator
                    orientation={'vertical'}
                    label={'Or'}
                />
                <span>Right</span>
            </Flex>
        </Flex>
    ),
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Separator color="transparent" />
<Separator color="primary" />
<Separator color="secondary" />
<Separator color="neutral" />
<Separator color="danger" />
<Separator color="success" />
<Separator color="warning" />
<Separator color="info" />`),
        },
    },
    render: () => (
        <Flex
            flexDirection={'column'}
            gap={'md'}
            width={'20rem'}
        >
            {COLORS.map((color) => (
                <Separator
                    key={color}
                    color={color}
                />
            ))}
        </Flex>
    ),
}

export const Orientations: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Flex alignItems="center" gap="md" height="120px">
    <span>Left</span>
    <Separator orientation="vertical" />
    <span>Right</span>
</Flex>
<Flex flexDirection="column" gap="md">
    <span>Above</span>
    <Separator orientation="horizontal" />
    <span>Below</span>
</Flex>`),
        },
    },
    render: () => (
        <Flex
            flexDirection={'column'}
            gap={'lg'}
        >
            <Flex
                alignItems={'center'}
                gap={'md'}
                height={'120px'}
            >
                <span>Left</span>
                <Separator orientation={'vertical'} />
                <span>Right</span>
            </Flex>
            <Flex
                flexDirection={'column'}
                gap={'md'}
            >
                <span>Above</span>
                <Separator orientation={'horizontal'} />
                <span>Below</span>
            </Flex>
        </Flex>
    ),
}
