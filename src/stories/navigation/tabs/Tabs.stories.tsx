import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Tabs } from '@components/navigation/tabs'
import TabsDocsPage from '@stories/navigation/tabs/components/tabs-docs-page/TabsDocsPage'
import TabsExample from '@stories/navigation/tabs/components/tabs-example/TabsExample'
import TabsOrientations from '@stories/navigation/tabs/components/tabs-orientations/TabsOrientations'
import TabsVariants from '@stories/navigation/tabs/components/tabs-variants/TabsVariants'
import { ARG_TYPES, DEFAULT_ARGS, type TabsStoryArgs } from '@stories/navigation/tabs/constants'
import variantsSource from '@stories/navigation/tabs/sources/TabsVariants.source.tsx.txt?raw'
import orientationsSource from '@stories/navigation/tabs/sources/TabsOrientations.source.tsx.txt?raw'
import { createTabsSource } from '@stories/navigation/tabs/utils/create-tabs-source/createTabsSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Navigation/Tabs',
    component: Tabs,
    tags: ['autodocs'],
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
    render: TabsExample,
}
export const Variants: Story = { parameters: { docs: { ...storySource(variantsSource) } }, render: TabsVariants }
export const Orientations: Story = { parameters: { docs: { ...storySource(orientationsSource) } }, render: TabsOrientations }
