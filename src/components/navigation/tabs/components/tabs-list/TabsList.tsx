import { memo, type FC } from 'react'

import { Tabs as BaseTabs } from '@base-ui/react/tabs'

import { TABS_LIST_STYLES } from '@components/navigation/tabs/components/tabs-list/TabsList.css.ts'
import type { TabsListProps } from '@components/navigation/tabs/components/tabs-list/types'
import { TabsVariantContext } from '@components/navigation/tabs/context/TabsVariant.context.ts'
import { cn } from '@utils/cn.ts'

/**
 * Container for tab triggers. Provide an accessible name via `aria-label`
 * or `aria-labelledby`. The `variant` prop is shared with `Tabs.Trigger`
 * via context so triggers automatically match the list's visual style.
 * With `activationMode` omitted, activation is manual unless `activateOnFocus`
 * is supplied directly.
 * @param props - Base UI list attributes and appearance options.
 * @param props.variant - List appearance; defaults to `default`.
 * @param props.bordered - Shows a divider for the default variant.
 * @param props.activationMode - Automatic or manual keyboard activation.
 * @param props.className - Additional list class.
 * @returns A named tab list.
 * @example
 * <Tabs.List aria-label="Settings"><Tabs.Trigger value="account" label="Account" /></Tabs.List>
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
