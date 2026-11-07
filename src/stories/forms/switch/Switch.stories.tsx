import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'
import { Switch } from '@components/forms/switch'
import SwitchDocsPage from '@stories/forms/switch/components/switch-docs-page/SwitchDocsPage'
import SwitchStates from '@stories/forms/switch/components/switch-states/SwitchStates'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/switch/constants'
import statesSource from '@stories/forms/switch/sources/SwitchStates.source.txt?raw'
import { createSwitchSource } from '@stories/forms/switch/utils/create-switch-source/createSwitchSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'
import ControlledSwitch from '@stories/forms/switch/components/controlled-switch/ControlledSwitch'
import SwitchUncontrolledExample from '@stories/forms/switch/components/switch-uncontrolled-example/SwitchUncontrolledExample'
import SwitchSizes from '@stories/forms/switch/components/switch-sizes/SwitchSizes'
import sizesSource from '@stories/forms/switch/sources/SwitchSizes.source.txt?raw'
const meta = {
    title: 'Forms/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: SwitchDocsPage,
            description: {
                component: DESCRIPTION,
            },
            source: {
                type: 'dynamic',
                transform: createSwitchSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>
export const Playground: Story = {
    argTypes: {
        defaultChecked: { control: false, description: 'Initial value for uncontrolled usage; the playground is controlled.' },
    },
    render: ControlledSwitch,
}

export const Uncontrolled = {
    args: {
        checked: undefined,
        defaultChecked: true,
    },
    argTypes: {
        checked: { control: false },
    },
    render: SwitchUncontrolledExample,
    parameters: {
        docs: {
            description: { story: 'Changing defaultChecked remounts the switch with the new initial state.' },
        },
    },
} satisfies Story
export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: SwitchStates,
}
export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource), description: { story: 'Compare the small, medium and large switch sizes independently of appearance.' } } },
    render: SwitchSizes,
}
