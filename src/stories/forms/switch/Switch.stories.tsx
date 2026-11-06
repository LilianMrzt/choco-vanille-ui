import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Switch, type SwitchProps } from '@components/forms/switch'
import SwitchDocsPage from '@stories/forms/switch/components/switch-docs-page/SwitchDocsPage'
import SwitchSizes from '@stories/forms/switch/components/switch-sizes/SwitchSizes'
import SwitchStates from '@stories/forms/switch/components/switch-states/SwitchStates'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/forms/switch/constants'
import sizesSource from '@stories/forms/switch/sources/SwitchSizes.source.tsx.txt?raw'
import statesSource from '@stories/forms/switch/sources/SwitchStates.source.tsx.txt?raw'
import { createSwitchSource } from '@stories/forms/switch/utils/create-switch-source/createSwitchSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Forms/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            page: SwitchDocsPage,
            description: {
                component: 'A two-state switch with optional label, helper text and error message. It supports controlled and uncontrolled usage.',
            },
            source: {
                type: 'dynamic',
                transform: createSwitchSource,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Synchronizes the controlled example with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @param _args - Storybook render arguments; current values come from useArgs.
 * @returns The controlled switch.
 * @example
 * <ControlledSwitch />
 */
const ControlledSwitch = (_args: SwitchProps) => {
    const [args, updateArgs] = useArgs<SwitchProps>()

    /**
     * Notifies the consumer before updating the control unless canceled.
     * @internal Storybook-only handler; not part of the public package API.
     * @param checked - Requested checked state.
     * @param details - Base UI change details.
     * @returns Nothing.
     * @example
     * handleCheckedChange(true, details)
     */
    const handleCheckedChange: NonNullable<SwitchProps['onCheckedChange']> = (checked, details) => {
        args.onCheckedChange?.(checked, details)

        if (!details.isCanceled) {
            updateArgs({ checked })
        }
    }

    return (
        <Switch
            {...args}
            onCheckedChange={handleCheckedChange}
        />
    )
}

export const Playground: Story = {
    render: ControlledSwitch,
}

export const Uncontrolled: Story = {
    args: {
        checked: undefined,
        defaultChecked: true,
    },
    parameters: {
        docs: {
            description: { story: 'The initial value applies on mount; remount the story to apply changes to defaultChecked.' },
        },
    },
}

export const Sizes: Story = {
    parameters: { docs: { ...storySource(sizesSource) } },
    render: SwitchSizes,
}

export const States: Story = {
    parameters: { docs: { ...storySource(statesSource) } },
    render: SwitchStates,
}
