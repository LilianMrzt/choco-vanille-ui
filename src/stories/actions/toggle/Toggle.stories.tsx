import ToggleSizes from '@stories/actions/toggle/components/toggle-sizes/ToggleSizes'
import sizesSource from '@stories/actions/toggle/sources/ToggleSizes.source.txt?raw'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Toggle } from '@components/actions'
import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import ToggleDocsPage from '@stories/actions/toggle/components/toggle-docs-page/ToggleDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/actions/toggle/constants'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import { createTogglePlaygroundSource, createToggleSource } from '@stories/actions/toggle/utils/create-toggle-source/createToggleSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'
import groupUncontrolledSource from '@stories/actions/toggle/sources/ToggleGroupUncontrolled.source.txt?raw'
import iconsSource from '@stories/actions/toggle/sources/ToggleWithIcons.source.txt?raw'
import statesSource from '@stories/actions/toggle/sources/ToggleStates.source.txt?raw'
import ControlledToggle from '@stories/actions/toggle/components/controlled-toggle/ControlledToggle'
import TogglePlayground from '@stories/actions/toggle/components/toggle-playground/TogglePlayground'
import { playTogglePlayground } from '@stories/actions/toggle/utils/playTogglePlayground.utils'
import { playToggleIconOnly } from '@stories/actions/toggle/utils/playToggleIconOnly.utils'
import ToggleStates from '@stories/actions/toggle/components/toggle-states/ToggleStates'
import ToggleIcons from '@stories/actions/toggle/components/toggle-icons/ToggleIcons'
import ToggleUncontrolledGroup from '@stories/actions/toggle/components/toggle-uncontrolled-group/ToggleUncontrolledGroup'
import ToggleAppearance from '@stories/actions/toggle/components/toggle-appearance/ToggleAppearance'
import appearanceSource from '@stories/actions/toggle/sources/ToggleAppearance.source.txt?raw'

const meta = {
    title: 'Actions/Toggle',
    component: Toggle,
    render: ControlledToggle,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
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
    parameters: { docs: { source: { type: 'dynamic', transform: createTogglePlaygroundSource } } },
    render: TogglePlayground,
    play: playTogglePlayground,
}

export const Uncontrolled: Story = {
    args: { pressed: undefined, defaultPressed: true },
    render: ControlledToggle,
    parameters: {
        docs: { description: { story: 'Changing defaultPressed remounts this uncontrolled example.' } },
    },
}
export const States: Story = {
    parameters: { docs: storySource(statesSource) },
    render: ToggleStates,
}

export const WithIcons: Story = {
    parameters: { docs: storySource(iconsSource) },
    render: ToggleIcons,
}

export const IconOnly: Story = {
    args: { label: undefined, icon: BoldIcon, 'aria-label': 'Bold' },
    render: ControlledToggle,
    play: playToggleIconOnly,
}
export const GroupUncontrolled: Story = {
    parameters: { docs: { ...storySource(groupUncontrolledSource), description: { story: 'Uncontrolled multiple selection using defaultValue.' } } },
    render: ToggleUncontrolledGroup,
}
export const Appearance: Story = {
    parameters: { docs: { ...storySource(appearanceSource) } },
    render: ToggleAppearance,
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: ToggleSizes,
}
