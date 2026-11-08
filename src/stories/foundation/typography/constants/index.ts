import type { Meta } from '@storybook/react-vite'

import type {
    TypographySize,
    TypographyVariant,
    TypographyWeight,
} from '@components/foundation/typography'
import { md } from '@stories/_shared/utils/markdown'
import type { TypographyStoryArgs } from '@stories/foundation/typography/types'

export const VARIANTS: TypographyVariant[] = [
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

export const SIZES: TypographySize[] = [
    10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72,
]

export const WEIGHTS: TypographyWeight[] = [
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

export const MARGINS = [
    undefined,
    0,
    1,
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    24,
    28,
    32,
    48,
    64,
    80,
    96,
    112,
    128,
    'auto',
] as const

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute        | Required    | Type                               | Notes                                                                                                              |
| ----------------------- | ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| \`variant\`               | No          | \`h1\`–\`h6\`, \`p\`, \`span\`, \`label\`, … | Determines semantic element and default styling. Never pick a heading level for its size — use \`fontSize\` instead. |
| \`as\`                    | No          | Any HTML element                   | Overrides the rendered element while keeping the visual style (e.g. an \`h3\`-styled \`<span>\` inside a \`<li>\`).      |
| \`title\` (for \`abbr\`)    | Conditional | \`string\`                           | Required when \`variant="abbr"\` to expose the expanded form to screen readers and hover tooltips.                   |
| \`htmlFor\` (for \`label\`) | Conditional | \`string\`                           | Links a \`label\` variant to its form control; alternative is wrapping the control as a child.                       |

When \`variant\` is omitted, a known typography element passed to \`as\` also selects its matching style.
The rendered element determines the accepted native attributes and ref target.

Single-line truncation requires constrained width and uses inline-block for inline
text elements. Explicit \`display\` or \`style\` may override it. When both
\`ellipsis\` and \`maxLines\` are set, the line limit takes precedence. Provide
another way to read essential clipped content.

- Respect heading hierarchy: use one \`h1\` per page and nest levels in order without skipping.
- Pair \`del\` and \`ins\` together to communicate document revisions accessibly.
`

export const ARG_TYPES = {
    as: {
        control: 'select',
        options: [undefined, ...VARIANTS],
        description:
            'Native element override; custom components are not editable here.',
    },
    variant: {
        control: 'select',
        options: [undefined, ...VARIANTS],
        description: 'Defaults to the recognized as element or span.',
    },
    fontSize: { control: 'select', options: [undefined, ...SIZES] },
    fontWeight: { control: 'select', options: [undefined, ...WEIGHTS] },
    color: {
        control: 'text',
        description:
            'CSS color or custom property reference. No inline default; style.color wins.',
    },
    margin: { control: 'select', options: MARGINS },
    ellipsis: {
        control: 'boolean',
        description: 'Single-line truncation; requires constrained width.',
    },
    maxLines: {
        control: { type: 'number', min: 1, step: 1 },
        description:
            'Positive integer line limit; takes precedence over ellipsis.',
    },
    fontFamily: {
        control: 'select',
        options: [undefined, 'sans', 'serif', 'mono'],
        description: 'Theme font family.',
    },
    fontStyle: {
        control: 'select',
        options: [undefined, 'normal', 'italic', 'oblique'],
    },
    verticalAlign: { control: 'text' },
    lineHeight: {
        control: 'text',
        description: 'CSS line height; numeric values are unitless.',
    },
    whiteSpace: {
        control: 'select',
        options: [
            undefined,
            'normal',
            'nowrap',
            'pre',
            'pre-wrap',
            'pre-line',
            'break-spaces',
        ],
    },
    overflowWrap: {
        control: 'select',
        options: [undefined, 'normal', 'break-word', 'anywhere'],
    },
    wordBreak: {
        control: 'select',
        options: [undefined, 'normal', 'break-all', 'keep-all'],
    },
    textWrap: {
        control: 'select',
        options: [undefined, 'wrap', 'nowrap', 'balance', 'pretty'],
    },
    textDecoration: { control: 'text' },
    textTransform: { control: 'text', description: 'CSS text transformation.' },
    display: { control: 'text', description: 'CSS display value.' },
    width: { control: 'text', description: 'CSS width.' },
    minWidth: { control: 'text', description: 'CSS minimum width.' },
    maxWidth: { control: 'text', description: 'CSS maximum width.' },
    opacity: { control: 'number', description: 'CSS opacity.' },
    flex: { control: 'text', description: 'CSS flex shorthand.' },
    flexGrow: { control: 'number', description: 'CSS flex growth.' },
    flexShrink: { control: 'number', description: 'CSS flex shrinkage.' },
    letterSpacing: { control: 'text', description: 'CSS letter spacing.' },
    htmlFor: {
        control: 'text',
        description: 'Associated control ID for a label.',
    },
    children: { control: 'text', description: 'Text shown in this example.' },
    className: { control: 'text', description: 'Additional text class.' },
    style: { control: 'object', description: 'Inline style overrides.' },
} satisfies NonNullable<Meta<TypographyStoryArgs>['argTypes']>

export const DEFAULT_ARGS = {
    children: 'The quick brown fox jumps over the lazy dog.',
} satisfies NonNullable<Meta<TypographyStoryArgs>['args']>
