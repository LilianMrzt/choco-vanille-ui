import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Tabs } from '@components/navigation/tabs'
import TabsDocsPage from '@stories/navigation/tabs/components/tabs-docs-page/TabsDocsPage'
import TabsExample from '@stories/navigation/tabs/components/tabs-example/TabsExample'
import TabsAppearance from './components/tabs-appearance/TabsAppearance'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/navigation/tabs/constants'
import type { TabsStoryArgs } from './types'
import appearanceSource from './sources/TabsAppearance.source.txt?raw'
import { createTabsSource } from '@stories/navigation/tabs/utils/create-tabs-source/createTabsSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/Tabs',
    component: Tabs,
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
            description: { component: 'A tab interface composed from a list, triggers and associated panels.' },
            page: TabsDocsPage,
            source: { type: 'dynamic', transform: createTabsSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<TabsStoryArgs>

export default meta

type Story = StoryObj<TabsStoryArgs>

/**
 * Synchronizes tab selection with Storybook Controls.
 * @internal Storybook-only render function; not part of the public package API.
 * @returns The controlled tab example.
 * @example
 * <ControlledTabs />
 */
const ControlledTabs = () => {
    const [args, updateArgs] = useArgs<TabsStoryArgs>()

    /**
     * Forwards Base UI event details and applies uncanceled changes.
     * @internal Storybook-only handler; not part of the public package API.
     * @param value - Requested tab value.
     * @param details - Base UI change details.
     * @returns Nothing.
     * @example
     * handleValueChange('account', details)
     */
    const handleValueChange: NonNullable<TabsStoryArgs['onValueChange']> = (value, details) => {
        args.onValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ value })
        }
    }

    return (
        <TabsExample
            {...args}
            onValueChange={handleValueChange}
        />
    )
}

export const Playground: Story = { render: ControlledTabs }
export const Uncontrolled: Story = {
    args: { value: undefined, defaultValue: 'account' },
    parameters: { docs: { description: { story: 'Remount the component to apply a changed defaultValue.' } } },
    argTypes: { defaultValue: { control: 'select' } },
    render: (args) => (
        <TabsExample
            {...args}
            key={String(args.defaultValue)}
        />
    ),
}
export const Appearance: Story = { parameters: { docs: { ...storySource(appearanceSource) } }, render: TabsAppearance }
