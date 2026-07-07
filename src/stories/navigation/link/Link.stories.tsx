import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Link } from '@components/navigation/link'
import type { IconSize } from '@components/foundation/icon'
import type { TypographySize, TypographyWeight } from '@components/foundation/typography'
import { md } from '@stories/utils/markdown'

const FONT_SIZES: TypographySize[] = ['2xs', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']
const FONT_WEIGHTS: TypographyWeight[] = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']
const ICON_SIZES: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

const meta = {
    title: 'Navigation/Link',
    component: Link,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A text link that renders a native \`<a>\` element for accessibility while supporting
client-side navigation through an \`onClick\` handler. This makes it easy to wire up
to React Router (or any other router) without losing the semantic benefits of a real
hyperlink. Optional start and end icons can be added with Iconify icon names.

**Usage**

~~~tsx
import { useNavigate } from 'react-router'

function Example() {
    const navigate = useNavigate()

    return (
        <Link
            href="/dashboard"
            label="Dashboard"
            onClick={() => navigate('/dashboard')}
            endIcon="lucide:arrow-right"
        />
    )
}
~~~

**Accessibility**

| Prop / Attribute | Required | Type       | Notes                                                                          |
| ---------------- | -------- | ---------- | ------------------------------------------------------------------------------ |
| \`label\`          | ✅ Yes   | \`string\`   | Becomes the link's accessible name — always provide a meaningful value.        |
| \`href\`           | No       | \`string\`   | Rendered as the native \`href\`. Defaults to \`#\`.                               |
| \`onClick\`        | No       | \`function\`  | When provided, \`event.preventDefault()\` is called automatically.               |
| \`startIcon\`      | No       | \`string\`    | Iconify icon name rendered before the label. Decorative by default.            |
| \`endIcon\`        | No       | \`string\`    | Iconify icon name rendered after the label. Decorative by default.             |
| \`fontSize\`       | No       | \`TypographySize\` | Size of the label text. Defaults to \`base\`.                              |
| \`fontWeight\`     | No       | \`TypographyWeight\` | Weight of the label text. Defaults to \`medium\`.                        |
| \`iconSize\`       | No       | \`IconSize\` | Size of the start/end icons. Defaults to \`md\`.                                |
| \`aria-disabled\`  | No       | \`boolean\`   | Visually dims the link and removes pointer events when \`true\`.                 |
| \`aria-*\`         | No       | —          | All native \`<a>\` ARIA attributes are forwarded to the underlying element.      |

- The underlying element is a native \`<a>\`, so it is focusable, announced as a link by
  screen readers, and keyboard-operable with Enter.
- When \`onClick\` is supplied, the default browser navigation is suppressed so the
  handler can perform client-side routing.
- Icons are decorative by default; provide an \`aria-label\` on the Link if the icon
  carries meaning on its own.
                `,
            },
        },
    },
    argTypes: {
        href: { control: 'text' },
        label: { control: 'text' },
        startIcon: { control: 'text' },
        endIcon: { control: 'text' },
        fontSize: { control: 'select', options: FONT_SIZES },
        fontWeight: { control: 'select', options: FONT_WEIGHTS },
        iconSize: { control: 'select', options: ICON_SIZES },
        target: { control: 'text' },
        rel: { control: 'text' },
        onClick: { action: 'clicked' },
    },
    args: {
        href: '/',
        label: 'Link',
    },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('link', { name: args.label as string }),
        ).toBeInTheDocument()
    },
}
