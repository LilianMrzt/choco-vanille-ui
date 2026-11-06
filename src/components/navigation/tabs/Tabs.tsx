import { memo } from 'react'

import { Tabs as BaseTabs } from '@base-ui/react/tabs'

import TabsContent from '@components/navigation/tabs/components/tabs-content/TabsContent.tsx'
import TabsList from '@components/navigation/tabs/components/tabs-list/TabsList.tsx'
import TabsTrigger from '@components/navigation/tabs/components/tabs-trigger/TabsTrigger.tsx'
import type { TabsProps } from '@components/navigation/tabs/types'

/**
 * A styled tab interface built on top of `@base-ui/react/tabs`.
 *
 * Composes `Tabs`, `Tabs.List`, `Tabs.Trigger`, and `Tabs.Content`.
 * Supports controlled (`value` + `onValueChange`) and uncontrolled
 * (`defaultValue`) modes, disabled triggers, and keyboard navigation.
 * @param props - Base UI tab root props.
 * @returns A tab root.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="account">
 *   <Tabs.List aria-label="User settings">
 *     <Tabs.Trigger value="account" label="Account" />
 *     <Tabs.Trigger value="password" label="Password" />
 *   </Tabs.List>
 *   <Tabs.Content value="account">Account settings</Tabs.Content>
 *   <Tabs.Content value="password">Password settings</Tabs.Content>
 * </Tabs>
 * ```
 */
const TabsRoot = memo<TabsProps>((props) => (
    <BaseTabs.Root {...props} />
))

TabsRoot.displayName = 'Tabs'

/** Tab root with list, trigger and panel slots. */
const Tabs = Object.assign(TabsRoot, { List: TabsList, Trigger: TabsTrigger, Content: TabsContent })

export default Tabs
