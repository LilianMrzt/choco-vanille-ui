import type { ComponentProps } from 'react'
import type { Tabs, TabsListProps } from '@components/navigation/tabs'

/** @internal Storybook-only args; not part of the public package API. */
export type TabsStoryArgs = Readonly<Omit<ComponentProps<typeof Tabs>, 'children'> & {
    listVariant: NonNullable<TabsListProps['variant']>
    listBordered: boolean
    activationMode: NonNullable<TabsListProps['activationMode']>
    billingDisabled: boolean
    billingWidth: string
}>
