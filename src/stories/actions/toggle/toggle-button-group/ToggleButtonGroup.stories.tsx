import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { useState } from 'react'

import {
    ToggleButtonGroup,
    type ToggleButtonGroupOrientation,
} from '@components/actions/toggle-button-group'
import {
    BUTTON_COLORS,
    BUTTON_SIZES,
} from '@components/actions/_shared/buttons/constants'
import { md } from '@stories/utils/markdown.ts'
import type { ThemeColor } from '@theme/types'

const ORIENTATIONS: ToggleButtonGroupOrientation[] = ['horizontal', 'vertical']
const THEME_COLORS: ThemeColor[] = [
    'card',
    'background',
    'muted',
    'primary',
    'secondary',
    'success',
    'warning',
    'info',
    'destructive',
    'purple',
    'pink',
    'orange',
    'teal',
    'cyan',
    'indigo',
]
const SIZES = [BUTTON_SIZES.sm, BUTTON_SIZES.md, BUTTON_SIZES.lg] as const
const COLORS = [
    BUTTON_COLORS.primary,
    BUTTON_COLORS.secondary,
    BUTTON_COLORS.tertiary,
    BUTTON_COLORS.destructive,
    BUTTON_COLORS.success,
    BUTTON_COLORS.warning,
    BUTTON_COLORS.info,
] as const
const RADII = [
    'none',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'full',
] as const

type ToggleButtonGroupStoryArgs = React.ComponentProps<
  typeof ToggleButtonGroup
> & {
  itemSize?: (typeof SIZES)[number];
  itemColor?: (typeof COLORS)[number];
  itemRadius?: (typeof RADII)[number];
};

const meta = {
    title: 'Actions/Toggle/ToggleButtonGroup',
    component: ToggleButtonGroup,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: md /* language=markdown */ `
A group of toggle buttons where one or many buttons can be pressed at a time.
Use it for toolbars, view switchers, or any set of related binary options.
Built on top of \`@base-ui/react/toggle-group\`, it supports keyboard navigation and single or multiple selection.

**Usage**

~~~tsx
<ToggleButtonGroup value={value} onValueChange={setValue}>
  <ToggleButtonGroup.Item value="bold" label="Bold" />
  <ToggleButtonGroup.Item value="italic" label="Italic" />
  <ToggleButtonGroup.Item value="underline" label="Underline" />
</ToggleButtonGroup>

<ToggleButtonGroup value={value} onValueChange={setValue}>
  <ToggleButtonGroup.IconItem value="bold" icon="lucide:bold" aria-label="Bold" />
  <ToggleButtonGroup.IconItem value="italic" icon="lucide:italic" aria-label="Italic" />
  <ToggleButtonGroup.IconItem value="underline" icon="lucide:underline" aria-label="Underline" />
</ToggleButtonGroup>
~~~

**Accessibility**

| Prop / Attribute   | Required    | Type                       | Notes                                                             |
| ------------------ | ----------- | -------------------------- | ----------------------------------------------------------------- |
| \`children\`         | No          | \`ReactNode\`                | Must be \`ToggleButtonGroup.Item\` components.                      |
| \`value\`            | No          | \`string[]\`                 | Controlled pressed values.                                        |
| \`defaultValue\`     | No          | \`string[]\`                 | Uncontrolled initial pressed values.                              |
| \`onValueChange\`    | No          | \`function\`                 | Called when the pressed values change.                            |
| \`multiple\`         | No          | \`boolean\`                  | When \`true\`, more than one button can be pressed.                 |
| \`orientation\`      | No          | \`horizontal\` \| \`vertical\` | Layout direction of the group.                                    |
| \`backgroundColor\`  | No          | \`ThemeColor\`               | Custom background color of the group wrapper.                     |
| \`requireSelection\` | No          | \`boolean\`                  | When \`true\` (default), the last pressed item cannot be unpressed. |
| \`disabled\`         | No          | \`boolean\`                  | Disables the entire group.                                        |
| \`aria-label\`       | Recommended | —                          | Describe the purpose of the group.                                |

- The group is rendered as a \`<div>\` with \`role="group"\`.
- Use \`aria-label\` or \`aria-labelledby\` to give the group an accessible name.
- Arrow keys move focus between buttons; \`Space\` / \`Enter\` toggle the pressed state.
        `,
            },
        },
    },
    argTypes: {
        multiple: {
            control: 'boolean',
            table: { category: 'ToggleButtonGroup' },
        },
        orientation: {
            control: 'select',
            options: ORIENTATIONS,
            table: { category: 'ToggleButtonGroup' },
        },
        backgroundColor: {
            control: 'select',
            options: THEME_COLORS,
            table: { category: 'ToggleButtonGroup' },
        },
        requireSelection: {
            control: 'boolean',
            table: { category: 'ToggleButtonGroup' },
        },
        disabled: {
            control: 'boolean',
            table: { category: 'ToggleButtonGroup' },
        },
        bordered: {
            control: 'boolean',
            table: { category: 'ToggleButtonGroup' },
        },
        itemSize: {
            name: 'Item size',
            control: 'select',
            options: SIZES,
            table: { category: 'ToggleButtonGroup.Item' },
        },
        itemColor: {
            name: 'Item color',
            control: 'select',
            options: COLORS,
            table: { category: 'ToggleButtonGroup.Item' },
        },
        itemRadius: {
            name: 'Item radius',
            control: 'select',
            options: RADII,
            table: { category: 'ToggleButtonGroup.Item' },
        },
    },
    args: {
        multiple: false,
        orientation: 'horizontal',
        requireSelection: true,
        disabled: false,
        bordered: true,
        itemSize: BUTTON_SIZES.md,
        itemColor: BUTTON_COLORS.primary,
        itemRadius: 'sm',
    },
} satisfies Meta<ToggleButtonGroupStoryArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    render: ({ itemSize, itemColor, itemRadius, ...args }: ToggleButtonGroupStoryArgs) => {
        const [value, setValue] = useState<string[]>(['bold'])

        return (
            <ToggleButtonGroup
                {...args}
                value={value}
                onValueChange={setValue}
                aria-label={'Text formatting'}
            >
                <ToggleButtonGroup.Item
                    value={'bold'}
                    label={'Bold'}
                    size={itemSize}
                    color={itemColor}
                    radius={itemRadius}
                />
                <ToggleButtonGroup.Item
                    value={'italic'}
                    label={'Italic'}
                    startIcon={'lucide:italic'}
                    size={itemSize}
                    color={itemColor}
                    radius={itemRadius}
                />
                <ToggleButtonGroup.IconItem
                    value={'underline'}
                    icon={'lucide:underline'}
                    aria-label={'Underline'}
                    size={itemSize}
                    color={itemColor}
                    radius={itemRadius}
                />
            </ToggleButtonGroup>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('group')).toBeInTheDocument()
        await expect(
            canvas.getByRole('button', { name: 'Bold' }),
        ).toBeInTheDocument()
    },
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Use `startIcon` and `endIcon` on `ToggleButtonGroup.Item` to add icons next to the label.',
            },
        },
    },
    render: () => {
        const [value, setValue] = useState<string[]>(['bold'])

        return (
            <ToggleButtonGroup
                value={value}
                onValueChange={setValue}
                aria-label={'Text formatting'}
            >
                <ToggleButtonGroup.Item
                    value={'bold'}
                    label={'Bold'}
                    startIcon={'lucide:bold'}
                />
                <ToggleButtonGroup.Item
                    value={'italic'}
                    label={'Italic'}
                    startIcon={'lucide:italic'}
                />
                <ToggleButtonGroup.Item
                    value={'underline'}
                    label={'Underline'}
                    endIcon={'lucide:underline'}
                />
            </ToggleButtonGroup>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('group')).toBeInTheDocument()
        await expect(
            canvas.getByRole('button', { name: 'Bold' }),
        ).toBeInTheDocument()
    },
}

export const IconOnly: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Use `ToggleButtonGroup.IconItem` for a toolbar-style group of icon-only toggles.',
            },
        },
    },
    render: () => {
        const [value, setValue] = useState<string[]>(['bold'])

        return (
            <ToggleButtonGroup
                value={value}
                onValueChange={setValue}
                aria-label={'Text formatting'}
            >
                <ToggleButtonGroup.IconItem
                    value={'bold'}
                    icon={'lucide:bold'}
                    aria-label={'Bold'}
                />
                <ToggleButtonGroup.IconItem
                    value={'italic'}
                    icon={'lucide:italic'}
                    aria-label={'Italic'}
                />
                <ToggleButtonGroup.IconItem
                    value={'underline'}
                    icon={'lucide:underline'}
                    aria-label={'Underline'}
                />
            </ToggleButtonGroup>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('group')).toBeInTheDocument()
        await expect(
            canvas.getByRole('button', { name: 'Bold' }),
        ).toBeInTheDocument()
    },
}
