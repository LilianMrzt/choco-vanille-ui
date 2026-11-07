import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import DropdownMenuDocsPage from '@stories/overlay/dropdown-menu/components/dropdown-menu-docs-page/DropdownMenuDocsPage'
import DropdownMenuExample from '@stories/overlay/dropdown-menu/components/dropdown-menu-example/DropdownMenuExample'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/dropdown-menu/constants'
import type { DropdownMenuStoryArgs } from '@stories/overlay/dropdown-menu/types'
import { createDropdownMenuSource } from '@stories/overlay/dropdown-menu/utils/create-dropdown-menu-source/createDropdownMenuSource.utils'

const meta = {
    title: 'Overlay/DropdownMenu',
    component: DropdownMenu,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0, overflowX: 'auto' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            page: DropdownMenuDocsPage,
            description: { component: 'An accessible menu with actions, selection items and nested submenus.' },
            source: { type: 'dynamic', transform: createDropdownMenuSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<DropdownMenuStoryArgs>

export default meta
type Story = StoryObj<DropdownMenuStoryArgs>

/**
 * Synchronizes menu state with Controls.
 * @internal Storybook-only renderer; not part of the public package API.
 * @returns The controlled menu example.
 * @example
 * <ControlledDropdownMenu />
 */
const ControlledDropdownMenu = () => {
    const [args, updateArgs] = useArgs<DropdownMenuStoryArgs>()
    return (
        <DropdownMenuExample
            {...args}
            onOpenChange={(open, details) => {
                args.onOpenChange?.(open, details)
                if (!details.isCanceled) {
                    updateArgs({ open })
                }
            }}
        />
    )
}

export const Playground: Story = { render: ControlledDropdownMenu }
export const Uncontrolled: Story = {
    args: { open: undefined, defaultOpen: false },
    argTypes: { defaultOpen: { control: 'boolean' } },
    render: (args) => (
        <DropdownMenuExample
            {...args}
            key={String(args.defaultOpen)}
        />
    ),
    parameters: { docs: { description: { story: 'Remount the example to apply a changed defaultOpen.' } } },
}
