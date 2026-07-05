import type { FC } from 'react'

import type TabsContent from '@components/navigation/tabs/components/tabs-content/TabsContent.tsx'
import type TabsList from '@components/navigation/tabs/components/tabs-list/TabsList.tsx'
import type TabsTrigger from '@components/navigation/tabs/components/tabs-trigger/TabsTrigger.tsx'
import type { TabsProps } from '@components/navigation/tabs/types/Tabs.props.ts'

export type TabsCompound = FC<TabsProps> & {
    List: typeof TabsList
    Trigger: typeof TabsTrigger
    Content: typeof TabsContent
}
