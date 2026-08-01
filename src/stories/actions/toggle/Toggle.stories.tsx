import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import {
    Toggle,
    ToggleGroup,
    type ToggleColor,
    type ToggleSize,
    type ToggleVariant,
} from '@components/actions'
import { md } from '@stories/utils/markdown'

const VARIANTS: ToggleVariant[] = ['outlined', 'ghost']
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

const meta = {
    title: 'Actions/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
A two-state control that can be used on its own or as an item in \`ToggleGroup\`.

**Usage**

~~~tsx
<Toggle label="Bold" />
<Toggle icon="lucide:bold" aria-label="Bold" />

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

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button', { name: args.label })).toBeInTheDocument()
    },
}

export const IconOnly: Story = {
    args: {
        label: undefined,
        icon: 'lucide:bold',
        'aria-label': 'Bold',
    },
    play: async ({ canvasElement }) => {
        await expect(within(canvasElement).getByRole('button', { name: 'Bold' })).toBeInTheDocument()
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
        await expect(canvas.getByRole('button', { name: 'Bold' })).toBeInTheDocument()
        await expect(canvas.getByRole('button', { name: 'Italic' })).toBeInTheDocument()
    },
}
