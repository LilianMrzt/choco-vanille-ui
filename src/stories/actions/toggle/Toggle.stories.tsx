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
    Toggle,
    ToggleGroup,
    type ToggleColor,
    type ToggleSize,
    type ToggleVariant,
} from '@components/actions'
import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const VARIANTS: ToggleVariant[] = [
    'outlined',
    'ghost',
]
const COLORS: ToggleColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
]
const SIZES: ToggleSize[] = ['sm', 'md', 'lg']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required    | Type      | Notes                                                               |
| ---------------- | ----------- | --------- | ------------------------------------------------------------------- |
| \`label\`          | Conditional | \`string\`  | Required for text mode and used as the accessible name.             |
| \`aria-label\`     | Conditional | \`string\`  | Required for icon-only mode and used as the accessible name.        |
| \`disabled\`       | No          | \`boolean\` | Prevents interaction and removes the toggle from the tab order.     |
| \`aria-pressed\`   | Auto        | \`boolean\` | Reflects the current pressed state on the underlying native button. |

- The component renders a native \`<button>\` and supports keyboard activation with Space and Enter.
- Use \`ToggleGroup\` when several related toggles should share selection behavior and keyboard navigation.
`

const ToggleDocsPage = () => (
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
    title: 'Actions/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
        docs: {
            page: ToggleDocsPage,
            description: {
                component: md /* language=markdown */ `
A two-state control that can be used on its own or as an item in \`ToggleGroup\`.

**Usage**

~~~tsx
<Toggle label="Bold" />
<Toggle icon={BoldIcon} aria-label="Bold" />

<ToggleGroup>
  <ToggleGroup.Item value="bold" label="Bold" />
  <ToggleGroup.Item value="italic" label="Italic" />
</ToggleGroup>
~~~

Text mode requires \`label\`. Icon-only mode requires both \`icon\` and
\`aria-label\`.
        `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        icon: { control: 'text' },
        'aria-label': { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        subtle: { control: 'boolean' },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        startIcon: { control: 'text' },
        endIcon: { control: 'text' },
        disabled: { control: 'boolean' },
    },
    args: {
        label: 'Bold',
    },
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Toggle label="Bold" />`),
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('button', { name: args.label }),
        ).toBeInTheDocument()
    },
}

export const Variants: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Toggle label="outlined" variant="outlined" />
<Toggle label="ghost" variant="ghost" />
<Toggle label="outlined subtle" variant="outlined" subtle />
<Toggle label="ghost subtle" variant="ghost" subtle />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
            {VARIANTS.map((variant) => (
                <Toggle
                    key={variant}
                    label={variant}
                    variant={variant}
                />
            ))}
        </div>
    ),
}

export const Colors: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Toggle label="primary" color="primary" />
<Toggle label="secondary" color="secondary" />
<Toggle label="tertiary" color="tertiary" />
<Toggle label="destructive" color="destructive" />
<Toggle label="success" color="success" />
<Toggle label="warning" color="warning" />
<Toggle label="info" color="info" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {COLORS.map((color) => (
                <Toggle
                    key={color}
                    label={color}
                    color={color}
                />
            ))}
        </div>
    ),
}

export const Sizes: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Toggle label="SM" size="sm" />
<Toggle label="MD" size="md" />
<Toggle label="LG" size="lg" />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {SIZES.map((size) => (
                <Toggle
                    key={size}
                    label={size.toUpperCase()}
                    size={size}
                />
            ))}
        </div>
    ),
}

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Toggle label="Disabled" disabled />
<Toggle label="Pressed" defaultPressed />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Toggle
                label={'Disabled'}
                disabled
            />
            <Toggle
                label={'Pressed'}
                defaultPressed
            />
        </div>
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Toggle label="Bold" startIcon={BoldIcon} />
<Toggle label="Next" endIcon={ChevronRightIcon} />
<Toggle label="Upload" startIcon={UploadIcon} endIcon={ChevronRightIcon} />`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Toggle
                label={'Bold'}
                startIcon={BoldIcon}
            />
            <Toggle
                label={'Next'}
                endIcon={ChevronRightIcon}
            />
            <Toggle
                label={'Upload'}
                startIcon={UploadIcon}
                endIcon={ChevronRightIcon}
            />
        </div>
    ),
}

export const IconOnly: Story = {
    args: {
        label: undefined,
        icon: BoldIcon,
        'aria-label': 'Bold',
    },
    parameters: {
        docs: {
            ...storySource(/* language=tsx */ `
<Toggle icon={BoldIcon} aria-label="Bold" />`),
        },
    },
    play: async ({ canvasElement }) => {
        await expect(
            within(canvasElement).getByRole('button', { name: 'Bold' }),
        ).toBeInTheDocument()
    },
}

export const Group: Story = {
    parameters: {
        docs: {
            description: {
                story: md /* language=markdown */ `
\`ToggleGroup\` coordinates a set of \`ToggleGroup.Item\` components.

- By default, selecting an item unselects the previous item.
- Set \`multiple\` to \`true\` when several options can be selected.
- Use \`defaultValue\` for uncontrolled state.
- Use \`value\` and \`onValueChange\` for controlled state.
- \`orientation\` also controls arrow-key navigation.

Each item supports the same text and icon-only content modes as \`Toggle\`.
        `,
            },
            ...storySource(/* language=tsx */ `
<ToggleGroup defaultValue={['bold']}>
    <ToggleGroup.Item value="bold" label="Bold" />
    <ToggleGroup.Item value="italic" label="Italic" />
    <ToggleGroup.Item value="underline" label="Underline" />
</ToggleGroup>`),
        },
    },
    render: () => (
        <ToggleGroup defaultValue={['bold']}>
            <ToggleGroup.Item
                value={'bold'}
                label={'Bold'}
            />
            <ToggleGroup.Item
                value={'italic'}
                label={'Italic'}
            />
            <ToggleGroup.Item
                value={'underline'}
                label={'Underline'}
            />
        </ToggleGroup>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(
            canvas.getByRole('button', { name: 'Bold' }),
        ).toBeInTheDocument()
        await expect(
            canvas.getByRole('button', { name: 'Italic' }),
        ).toBeInTheDocument()
    },
}
