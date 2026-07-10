import { memo, type FC } from 'react'

import { Tabs as BaseTabs } from '@base-ui/react/tabs'

import { TABS_CONTENT_STYLES } from '@components/navigation/tabs/components/tabs-content/styles/TabsContent.css.ts'
import type { TabsContentProps } from '@components/navigation/tabs/components/tabs-content/types/TabsContent.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Panel shown when its associated trigger is active.
 */
const TabsContent: FC<TabsContentProps> = memo(({ className, ...props }) => (
    <BaseTabs.Panel
        className={cn(TABS_CONTENT_STYLES.root, className)}
        {...props}
    />
))

TabsContent.displayName = 'Tabs.Content'

export default TabsContent
