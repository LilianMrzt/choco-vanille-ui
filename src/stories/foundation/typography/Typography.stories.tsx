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

import { Typography } from '@/components/foundation/typography'
import type {
    TypographySize,
    TypographyVariant,
    TypographyWeight,
} from '@components/foundation/typography'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

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

const SIZES: TypographySize[] = [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]
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
const MARGINS = [undefined, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 80, 96, 112, 128, 'auto'] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute        | Required    | Type                               | Notes                                                                                                              |
| ----------------------- | ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \`variant\`               | ✅ Yes      | \`h1\`–\`h6\`, \`p\`, \`span\`, \`label\`, … | Determines semantic element and default styling. Never pick a heading level for its size — use \`fontSize\` instead. |
| \`as\`                    | No          | Any HTML element                   | Overrides the rendered element while keeping the visual style (e.g. an \`h3\`-styled \`<span>\` inside a \`<li>\`).      |
| \`title\` (for \`abbr\`)    | Conditional | \`string\`                           | Required when \`variant="abbr"\` to expose the expanded form to screen readers and hover tooltips.                   |
| \`htmlFor\` (for \`label\`) | Conditional | \`string\`                           | Links a \`label\` variant to its form control; alternative is wrapping the control as a child.                       |

When \`variant\` is omitted, a known typography element passed to \`as\` also selects its matching style.

- Respect heading hierarchy: use one \`h1\` per page and nest levels in order without skipping.
- Pair \`del\` and \`ins\` together to communicate document revisions accessibly.
`

const TypographyDocsPage = () => (
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
    title: 'Foundation/Typography',
    component: Typography,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A polymorphic text component that renders the correct semantic HTML element for a given \`variant\` and optionally overrides the element via the \`as\` prop.
It also exposes \`fontSize\`, \`fontWeight\`, \`color\`, \`margin\`, and \`ellipsis\` for fine-grained control.

\`color\` accepts free CSS values, including \`vars.color.primary.main\` and \`var(--custom-color)\`, not token names. Consumer \`style.color\` wins; omit \`color\` to preserve variant defaults and stylesheet interaction colors.

**Usage**

~~~tsx
<Typography variant="h1">Page Title</Typography>
<Typography variant="p">Body paragraph text.</Typography>

// Override the rendered element while keeping the h2 style
<Typography variant="h2" as="span">Visually h2, semantically a span</Typography>
~~~

**Performance**

\`Typography\` is wrapped in \`React.memo\` so re-renders are skipped when props are unchanged. Keep prop values stable (especially \`style\` and spread objects) to get the most benefit in long lists and dense UIs.
        `,
            },
        },
    },
    argTypes: {
        variant: { control: 'select', options: VARIANTS },
        fontSize: { control: 'select', options: [undefined, ...SIZES] },
        fontWeight: { control: 'select', options: [undefined, ...WEIGHTS] },
        color: { control: 'text', description: 'CSS color or custom property reference. No inline default; style.color wins.' },
        margin: { control: 'select', options: MARGINS },
        ellipsis: { control: 'boolean' },
        maxLines: { control: 'number' },
    },
    args: {
        children: 'The quick brown fox jumps over the lazy dog.',
    },
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            page: TypographyDocsPage,
            description: {
                story:
          'Interactive playground — use the Controls panel to adjust `variant`, `fontSize`, `fontWeight`, `color`, and `ellipsis` in real time.',
            },
            ...storySource(/* language=tsx */ `
<Typography variant="p">The quick brown fox jumps over the lazy dog.</Typography>`),
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText(args.children as string)).toBeInTheDocument()
    },
}

export const Colors: Story = {
    args: {
        color: vars.color.primary.main,
    },
    parameters: {
        docs: {
            description: {
                story: 'Use a theme variable or try var(--custom-color, rebeccapurple), currentColor, or a CSS color in Controls.',
            },
            ...storySource(/* language=tsx */ `
import { Typography, vars } from '@choco-vanille/ui'

<Typography color={vars.color.primary.main}>
  The quick brown fox jumps over the lazy dog.
</Typography>`),
        },
    },
}

export const Variants: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Typography variant="h1">h1</Typography>
<Typography variant="h2">h2</Typography>
<Typography variant="h3">h3</Typography>
<Typography variant="h4">h4</Typography>
<Typography variant="h5">h5</Typography>
<Typography variant="h6">h6</Typography>
<Typography variant="p">p</Typography>
<Typography variant="span">span</Typography>
<Typography variant="label">label</Typography>
<Typography variant="small">small</Typography>
<Typography variant="strong">strong</Typography>
<Typography variant="em">em</Typography>
<Typography variant="blockquote">blockquote</Typography>
<Typography variant="pre">pre</Typography>
<Typography variant="code">code</Typography>
<Typography variant="kbd">kbd</Typography>
<Typography variant="samp">samp</Typography>
<Typography variant="abbr">abbr</Typography>
<Typography variant="cite">cite</Typography>
<Typography variant="mark">mark</Typography>
<Typography variant="del">del</Typography>
<Typography variant="ins">ins</Typography>
<Typography variant="sub">sub</Typography>
<Typography variant="sup">sup</Typography>`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
            {VARIANTS.map((variant) => (
                <Typography
                    key={variant}
                    variant={variant}
                >
                    {variant}
                </Typography>
            ))}
        </div>
    ),
}

export const FontSizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Typography variant="p" fontSize={10}>10</Typography>
<Typography variant="p" fontSize={12}>12</Typography>
<Typography variant="p" fontSize={14}>14</Typography>
<Typography variant="p" fontSize={16}>16</Typography>
<Typography variant="p" fontSize={18}>18</Typography>
<Typography variant="p" fontSize={20}>20</Typography>
<Typography variant="p" fontSize={24}>24</Typography>
<Typography variant="p" fontSize={30}>30</Typography>
<Typography variant="p" fontSize={36}>36</Typography>
<Typography variant="p" fontSize={48}>48</Typography>
<Typography variant="p" fontSize={60}>60</Typography>
<Typography variant="p" fontSize={72}>72</Typography>`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
            {SIZES.map((fontSize) => (
                <Typography
                    key={fontSize}
                    variant={'p'}
                    fontSize={fontSize}
                >
                    {fontSize}
                </Typography>
            ))}
        </div>
    ),
}

export const FontWeights: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Typography variant="p" fontWeight="thin">thin</Typography>
<Typography variant="p" fontWeight="extralight">extralight</Typography>
<Typography variant="p" fontWeight="light">light</Typography>
<Typography variant="p" fontWeight="normal">normal</Typography>
<Typography variant="p" fontWeight="medium">medium</Typography>
<Typography variant="p" fontWeight="semibold">semibold</Typography>
<Typography variant="p" fontWeight="bold">bold</Typography>
<Typography variant="p" fontWeight="extrabold">extrabold</Typography>
<Typography variant="p" fontWeight="black">black</Typography>`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
            {WEIGHTS.map((fontWeight) => (
                <Typography
                    key={fontWeight}
                    variant={'p'}
                    fontWeight={fontWeight}
                >
                    {fontWeight}
                </Typography>
            ))}
        </div>
    ),
}
