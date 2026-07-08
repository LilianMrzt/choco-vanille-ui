import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { Separator } from '@components/layout/separator'
import { THEME_COLORS } from '@stories/_shared/constants/themeColors.const.ts'
import { md } from '@stories/utils/markdown'

const ORIENTATION = ['horizontal', 'vertical'] as const
const COLORS = THEME_COLORS

const meta = {
    title: 'Layout/Separator',
    component: Separator,
    parameters: {
        layout: 'padded',
        docs: {
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

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`aria-hidden\` | No | \`boolean\` | Decorative separators should be hidden from assistive technologies. |
| \`orientation\` | No | \`'horizontal' \| 'vertical'\` | Default is \`horizontal\`. |
| \`color\` | No | \`ThemeColor\` | Any semantic color token from the theme. |

- A separator used purely for visual decoration should include \`aria-hidden="true"\` so it is not announced by screen readers.
                `,
            },
        },
    },
    argTypes: {
        orientation: { control: 'select', options: ORIENTATION },
        color: { control: 'select', options: COLORS },
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
        },
    },
    render: (args) => (
        <Box
            padding={'lg'}
            backgroundColor={'card'}
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
