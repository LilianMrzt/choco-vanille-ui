import { memo, type FC } from 'react'

import { Tabs as BaseTabs } from '@base-ui/react/tabs'

import { TABS_CONTENT_STYLES } from '@components/navigation/tabs/components/tabs-content/TabsContent.css.ts'
import type { TabsContentProps } from '@components/navigation/tabs/components/tabs-content/types'
import { cn } from '@utils/cn.ts'

/**
 * Panel shown when its associated trigger is active.
 * @param props - Base UI panel attributes.
 * @param props.className - Additional panel class.
 * @returns A tab panel.
 * @example
 * <Tabs.Content value="account">Account settings</Tabs.Content>
 */
const TabsContent: FC<TabsContentProps> = memo(({ className, ...props }) => (
    <BaseTabs.Panel
        className={cn(TABS_CONTENT_STYLES.root, className)}
        {...props}
    />
))

TabsContent.displayName = 'Tabs.Content'

export default TabsContent
