import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { expect, fn, within } from 'storybook/test'

import { Toggle, ToggleGroup, type ToggleProps, type ToggleGroupProps } from '@components/actions'
import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import ToggleDocsPage from '@stories/actions/toggle/components/toggle-docs-page/ToggleDocsPage'
import { ToggleColors, ToggleIcons, ToggleSizes, ToggleStates, ToggleUncontrolledGroup, ToggleVariants } from '@stories/actions/toggle/components/toggle-examples/ToggleExamples'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/actions/toggle/constants'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import { createToggleGroupSource, createToggleSource } from '@stories/actions/toggle/utils/create-toggle-source/createToggleSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

/** Controlled standalone toggle synchronized with Controls. */
const ControlledToggle = (_args: ToggleStoryArgs) => {
    const [args, updateArgs] = useArgs<ToggleStoryArgs>()
    const { groupMultiple, groupOrientation, groupDisabled, groupValue, groupOnValueChange, ...toggleProps } = args
    void [groupMultiple, groupOrientation, groupDisabled, groupValue, groupOnValueChange]
    const onPressedChange: NonNullable<ToggleProps['onPressedChange']> = (pressed, details) => {
        toggleProps.onPressedChange?.(pressed, details)
        if (!details.isCanceled && toggleProps.pressed !== undefined) {
            updateArgs({ pressed })
        }
    }

    return (
        <Toggle
            {...toggleProps}
            onPressedChange={onPressedChange}
        />
    )
}

/** Controlled group synchronized with Controls. */
const ControlledGroup = (_args: ToggleStoryArgs) => {
    const [args, updateArgs] = useArgs<ToggleStoryArgs>()
    const onValueChange: NonNullable<ToggleGroupProps['onValueChange']> = (value, details) => {
        args.groupOnValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ groupValue: value })
        }
    }
    return (
        <ToggleGroup
            aria-label={'Text formatting'}
            value={args.groupValue}
            multiple={args.groupMultiple}
            orientation={args.groupOrientation}
            disabled={args.groupDisabled}
            onValueChange={onValueChange}
        >
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
    )
}

const meta = {
    title: 'Actions/Toggle',
    component: Toggle,
    render: ControlledToggle,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        controls: {
            include: ['label', 'icon', 'aria-label', 'startIcon', 'endIcon', 'variant', 'color', 'size', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'width', 'alignSelf', 'disabled', 'pressed', 'onPressedChange', 'ref'],
        },
        docs: {
            page: ToggleDocsPage,
            description: {
                component: 'A two-state button. `Toggle` is the same component as `ToggleGroup.Item`. Use a group to coordinate selection and keyboard focus; each item needs a unique value. In a group, pressed state is managed by the group.',
            },
            source: { type: 'dynamic', transform: createToggleSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<ToggleStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
    render: ControlledToggle,
    play: async ({ canvasElement, args }) => {
        await expect(within(canvasElement).getByRole('button', { name: args.label })).toBeInTheDocument()
    },
}

export const Uncontrolled: Story = {
    args: { pressed: undefined, defaultPressed: true },
    render: ControlledToggle,
    parameters: {
        controls: { include: ['label', 'variant', 'color', 'size', 'disabled', 'defaultPressed', 'onPressedChange'] },
        docs: { description: { story: 'Initial state is applied on mount; remount to change defaultPressed.' } },
    },
}

export const Variants: Story = {
    parameters: { docs: storySource(`
<Toggle label="outlined" variant="outlined" defaultPressed />
<Toggle label="outlinedSubtle" variant="outlinedSubtle" defaultPressed />
<Toggle label="ghost" variant="ghost" defaultPressed />
<Toggle label="ghostSubtle" variant="ghostSubtle" defaultPressed />`) },
    render: ToggleVariants,
}

export const Colors: Story = {
    parameters: { docs: storySource(`
<Toggle label="primary" color="primary" defaultPressed />
<Toggle label="secondary" color="secondary" defaultPressed />
<Toggle label="tertiary" color="tertiary" defaultPressed />
<Toggle label="destructive" color="destructive" defaultPressed />
<Toggle label="success" color="success" defaultPressed />
<Toggle label="warning" color="warning" defaultPressed />
<Toggle label="info" color="info" defaultPressed />`) },
    render: ToggleColors,
}

export const Sizes: Story = {
    parameters: { docs: storySource(`
<Toggle label="SM" size="sm" />
<Toggle label="MD" size="md" />
<Toggle label="LG" size="lg" />`) },
    render: ToggleSizes,
}

export const States: Story = {
    parameters: { docs: storySource(`
<Toggle label="Disabled" disabled />
<Toggle label="Pressed" defaultPressed />`) },
    render: ToggleStates,
}

export const WithIcons: Story = {
    parameters: { docs: storySource(`
<Toggle label="Bold" startIcon={BoldIcon} />
<Toggle label="Next" endIcon={ChevronRightIcon} />
<Toggle label="Upload" startIcon={UploadIcon} endIcon={ChevronRightIcon} />`) },
    render: ToggleIcons,
}

export const IconOnly: Story = {
    args: { label: undefined, icon: BoldIcon, 'aria-label': 'Bold' },
    render: ControlledToggle,
    play: async ({ canvasElement }) => {
        await expect(within(canvasElement).getByRole('button', { name: 'Bold' })).toBeInTheDocument()
    },
}

export const Group: Story = {
    args: { groupValue: ['bold'], groupMultiple: false, groupOrientation: 'horizontal', groupDisabled: false, groupOnValueChange: fn() },
    parameters: {
        controls: { include: ['groupValue', 'groupMultiple', 'groupOrientation', 'groupDisabled', 'groupOnValueChange'] },
        docs: {
            description: { story: 'Controlled group. Select multiple to allow several items; change orientation to change arrow-key navigation. Group demo controls are passed only to the group.' },
            source: { type: 'dynamic', transform: createToggleGroupSource },
        },
    },
    render: ControlledGroup,
    play: async ({ canvasElement }) => {
        await expect(within(canvasElement).getByRole('group', { name: 'Text formatting' })).toBeInTheDocument()
    },
}

export const GroupUncontrolled: Story = {
    parameters: { docs: { ...storySource(`
<ToggleGroup aria-label="Text formatting" multiple defaultValue={['bold']}>
    <ToggleGroup.Item value="bold" label="Bold" />
    <ToggleGroup.Item value="italic" label="Italic" />
    <ToggleGroup.Item value="underline" label="Underline" />
</ToggleGroup>`), description: { story: 'Uncontrolled multiple selection using defaultValue.' } } },
    render: ToggleUncontrolledGroup,
}
