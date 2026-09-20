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

import {
    Button,
    type ButtonColor,
    type ButtonSize,
    type ButtonVariant,
} from '@components/actions/button'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const VARIANTS: ButtonVariant[] = ['contained', 'outlined', 'ghost']
const COLORS: ButtonColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
]
const SIZES: ButtonSize[] = ['sm', 'md', 'lg']
const SPACING = [
    undefined,
    'none',
    'px',
    'xxs',
    'xs',
    'xs2',
    'sm',
    'sm2',
    'md',
    'md2',
    'lg',
    'lg2',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    'auto',
] as const
const WIDTHS = [undefined, '100%', 'fit-content'] as const
const ALIGN_SELF = [
    undefined,
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
] as const

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type      | Notes                                                                          |
| ---------------- | -------- | --------- | ------------------------------------------------------------------------------ |
| \`label\`          | ✅ Yes   | \`string\`  | Becomes the button's accessible name — always provide a meaningful value.      |
| \`disabled\`       | No       | \`boolean\` | Prevents interaction and removes the native button from the tab order.         |
| \`aria-*\`         | No       | —         | All native \`<button>\` ARIA attributes are forwarded to the underlying element. |

- The underlying element is a native \`<button>\`, ensuring keyboard operability (Space / Enter) and the correct ARIA role out of the box.
- For icon-only actions, use \`IconButton\` instead — it enforces a mandatory \`aria-label\`.
`

const ButtonDocsPage = () => (
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
    title: 'Actions/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            page: ButtonDocsPage,
            description: {
                component: md /* language=markdown */ `
A versatile button component that triggers an action when clicked or activated with the keyboard.
Supports three visual **variants**, seven semantic **color** intents, and three **sizes**.
An optional start or end icon can be placed around the label.

**Usage**

~~~tsx
<Button label="Save" />
<Button label="Save" variant="contained" color="primary" />
<Button label="Delete" variant="outlined" color="destructive" startIcon={TrashIcon} />
<Button label="Next" variant="ghost" endIcon={ChevronRightIcon} />
~~~
        `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        startIcon: { control: 'text' },
        endIcon: { control: 'text' },
        margin: { control: 'select', options: SPACING },
        marginTop: { control: 'select', options: SPACING },
        marginRight: { control: 'select', options: SPACING },
        marginBottom: { control: 'select', options: SPACING },
        marginLeft: { control: 'select', options: SPACING },
        width: { control: 'select', options: WIDTHS },
        alignSelf: { control: 'select', options: ALIGN_SELF },
        disabled: { control: 'boolean' },
        active: { control: 'boolean' },
    },
    args: {
        label: 'Button',
    },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>;

/**
 * Interactive playground — use the Controls panel to experiment with every
 * available prop. The "Show code" snippet below reflects a typical consumer
 * invocation; the controls reflect actual prop values for the current render.
 */
export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(/* language=tsx */ `
<Button label="Save" variant="contained" color="primary" />`),
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('button', { name: args.label as string }),
        ).toBeInTheDocument()
    },
}

/** The three available visual variants, all using the `primary` color. */
export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'The three available visual variants, all using the `primary` color.',
            },
            ...storySource(/* language=tsx */ `
<Button label="Contained" variant="contained" color="primary" />
<Button label="Outlined" variant="outlined" color="primary" />
<Button label="Ghost" variant="ghost" color="primary" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {VARIANTS.map((variant) => (
                <Button
                    key={variant}
                    label={variant.charAt(0).toUpperCase() + variant.slice(1)}
                    variant={variant}
                    color={'primary'}
                />
            ))}
        </div>
    ),
}

/** All seven semantic color intents in the default `contained` variant. */
export const Colors: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'All seven semantic color intents in the default `contained` variant.',
            },
            ...storySource(/* language=tsx */ `
<Button label="Primary" color="primary" />
<Button label="Secondary" color="secondary" />
<Button label="Tertiary" color="tertiary" />
<Button label="Destructive" color="destructive" />
<Button label="Success" color="success" />
<Button label="Warning" color="warning" />
<Button label="Info" color="info" />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                maxWidth: '40rem',
            }}
        >
            {COLORS.map((color) => (
                <Button
                    key={color}
                    label={color.charAt(0).toUpperCase() + color.slice(1)}
                    color={color}
                />
            ))}
        </div>
    ),
}

/** The three available sizes. The default is `md`. */
export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The three available sizes. The default is `md`.',
            },
            ...storySource(/* language=tsx */ `
<Button label="Small" size="sm" />
<Button label="Medium" size="md" />
<Button label="Large" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {SIZES.map((size) => (
                <Button
                    key={size}
                    label={size.toUpperCase()}
                    size={size}
                />
            ))}
        </div>
    ),
}

/**
 * Pass any [Iconify](https://icon-sets.iconify.design/) identifier to
 * `startIcon` or `endIcon`. The icon size and color are derived automatically
 * from the button's current `variant` and `size`.
 */
export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story: md /* language=markdown */ `
Pass any [Iconify](https://icon-sets.iconify.design/) icon name to \`startIcon\` or \`endIcon\`.
The icon size and color are derived automatically from the button's current \`variant\` and \`size\`.
        `,
            },
            ...storySource(/* language=tsx */ `
<Button label="Delete" startIcon={TrashIcon} variant="outlined" color="destructive" />
<Button label="Next" endIcon={ChevronRightIcon} />
<Button label="Upload" startIcon={UploadIcon} endIcon={ChevronRightIcon} color="primary" />`),
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'center',
            }}
        >
            <Button
                label={'Delete'}
                startIcon={TrashIcon}
                variant={'outlined'}
                color={'destructive'}
            />
            <Button
                label={'Next'}
                endIcon={ChevronRightIcon}
            />
            <Button
                label={'Upload'}
                startIcon={UploadIcon}
                endIcon={ChevronRightIcon}
                color={'primary'}
            />
        </div>
    ),
}

/**
 * Special interactive states:
 * - **Disabled** — prevents interaction and removes the button from the tab order.
 * - **Active** — signals that the button controls an open panel (e.g. a menu or popover)
 *   via `data-active="true"`.
 */
export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: md /* language=markdown */ `
Special interactive states:

- **Disabled** — \`disabled\` prevents interaction and removes the button from the tab order.
- **Active** — \`active\` signals that the button controls an open panel (e.g. a menu or popover) via \`data-active="true"\`.
        `,
            },
            ...storySource(/* language=tsx */ `
<Button label="Disabled" disabled />
<Button label="Active" active />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Button
                label={'Disabled'}
                disabled
            />
            <Button
                label={'Active'}
                active
            />
        </div>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('button', { name: 'Disabled' }),
        ).toBeDisabled()
        await expect(
            canvas.getByRole('button', { name: 'Active' }),
        ).toBeInTheDocument()
    },
}
