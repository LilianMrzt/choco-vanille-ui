import * as RadixTabs from '@radix-ui/react-tabs'

import TabsContent from '@components/navigation/tabs/components/tabs-content/TabsContent.tsx'
import TabsList from '@components/navigation/tabs/components/tabs-list/TabsList.tsx'
import TabsTrigger from '@components/navigation/tabs/components/tabs-trigger/TabsTrigger.tsx'
import type { TabsCompound } from '@components/navigation/tabs/types'

/**
 * A styled tab interface built on top of `@radix-ui/react-tabs`.
 *
 * Composes `Tabs`, `Tabs.List`, `Tabs.Trigger`, and `Tabs.Content`.
 * Supports controlled (`value` + `onValueChange`) and uncontrolled
 * (`defaultValue`) modes, disabled triggers, and keyboard navigation.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="account">
 *   <Tabs.List aria-label="User settings">
 *     <Tabs.Trigger value="account">Account</Tabs.Trigger>
 *     <Tabs.Trigger value="password">Password</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="account">Account settings</Tabs.Content>
 *   <Tabs.Content value="password">Password settings</Tabs.Content>
 * </Tabs>
 * ```
 */
const Tabs = ((props) => (
    <RadixTabs.Root {...props} />
)) as TabsCompound

Tabs.displayName = 'Tabs'
Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
