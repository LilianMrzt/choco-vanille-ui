import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Typography } from '@/components/foundation/typography'
import type {
    TypographySize,
    TypographyVariant,
    TypographyWeight,
} from '@components/foundation/typography'
import { THEME_COLORS } from '@stories/_shared/constants/themeColors.const.ts'
import { md } from '@stories/utils/markdown'

const VARIANTS: TypographyVariant[] = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'label',
    'small',
    'strong',
    'em',
    'blockquote',
    'pre',
    'code',
    'kbd',
    'samp',
    'abbr',
    'cite',
    'mark',
    'del',
    'ins',
    'sub',
    'sup',
]

const SIZES: TypographySize[] = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
]

const WEIGHTS: TypographyWeight[] = [
    'thin',
    'extralight',
    'light',
    'normal',
    'medium',
    'semibold',
    'bold',
    'extrabold',
    'black',
]

const meta = {
    title: 'Foundation/Typography',
    component: Typography,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A polymorphic text component that renders the correct semantic HTML element for a given \`variant\` and optionally overrides the element via the \`as\` prop.
It also exposes \`fontSize\`, \`fontWeight\`, \`color\`, and \`ellipsis\` for fine-grained control.

**Usage**

~~~tsx
<Typography variant="h1">Page Title</Typography>
<Typography variant="p">Body paragraph text.</Typography>

// Override the rendered element while keeping the h2 style
<Typography variant="h2" as="span">Visually h2, semantically a span</Typography>
~~~

**Accessibility**

| Prop / Attribute        | Required    | Type                               | Notes                                                                                                              |
| ----------------------- | ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \`variant\`               | ✅ Yes      | \`h1\`–\`h6\`, \`p\`, \`span\`, \`label\`, … | Determines semantic element and default styling. Never pick a heading level for its size — use \`fontSize\` instead. |
| \`as\`                    | No          | Any HTML element                   | Overrides the rendered element while keeping the visual style (e.g. an \`h3\`-styled \`<span>\` inside a \`<li>\`).      |
| \`title\` (for \`abbr\`)    | Conditional | \`string\`                           | Required when \`variant="abbr"\` to expose the expanded form to screen readers and hover tooltips.                   |
| \`htmlFor\` (for \`label\`) | Conditional | \`string\`                           | Links a \`label\` variant to its form control; alternative is wrapping the control as a child.                       |

- Respect heading hierarchy: use one \`h1\` per page and nest levels in order without skipping.
- Pair \`del\` and \`ins\` together to communicate document revisions accessibly.
        `,
            },
        },
    },
    argTypes: {
        variant: { control: 'select', options: VARIANTS },
        fontSize: { control: 'select', options: [undefined, ...SIZES] },
        fontWeight: { control: 'select', options: [undefined, ...WEIGHTS] },
        color: { control: 'select', options: THEME_COLORS },
        ellipsis: { control: 'boolean' },
        maxLines: { control: 'number' },
    },
    args: {
        children: 'The quick brown fox jumps over the lazy dog.',
    },
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to adjust `variant`, `fontSize`, `fontWeight`, `color`, and `ellipsis` in real time.',
            },
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText(args.children as string)).toBeInTheDocument()
    },
}
