import { memo, type FC } from 'react'

import { Tabs as BaseTabs } from '@base-ui/react/tabs'

import { TABS_LIST_STYLES } from '@components/navigation/tabs/components/tabs-list/styles/TabsList.css.ts'
import type { TabsListProps } from '@components/navigation/tabs/components/tabs-list/types/TabsList.props.ts'
import { TabsVariantContext } from '@components/navigation/tabs/context/TabsVariant.context.ts'
import { cn } from '@utils/cn.ts'

/**
 * Container for tab triggers. Provide an accessible name via `aria-label`
 * or `aria-labelledby`. The `variant` prop is shared with `Tabs.Trigger`
 * via context so triggers automatically match the list's visual style.
 */
const TabsList: FC<TabsListProps> = memo(({ className, variant = 'default', bordered = false, activationMode, ...props }) => (
    <TabsVariantContext.Provider value={{ variant }}>
        <BaseTabs.List
            className={cn(TABS_LIST_STYLES.recipe({ variant, bordered }), className)}
            activateOnFocus={activationMode === 'automatic'}
            {...props}
        />
    </TabsVariantContext.Provider>
))

TabsList.displayName = 'Tabs.List'

export default TabsList
