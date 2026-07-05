import * as RadixTabs from '@radix-ui/react-tabs'

import { TABS_TRIGGER_STYLES } from '@components/navigation/tabs/components/tabs-trigger/TabsTrigger.css.ts'
import type { TabsTriggerProps } from '@components/navigation/tabs/components/tabs-trigger/types/TabsTrigger.props.ts'
import { useTabsVariant } from '@components/navigation/tabs/context/TabsVariant.context.ts'
import { cn } from '@utils/cn.ts'

/**
 * Activates its associated tab panel when clicked or focused and activated
 * via keyboard. Automatically matches the visual style of its parent
 * `Tabs.List`.
 */
const TabsTrigger = ({ className, style, width, ...props }: TabsTriggerProps) => {
    const { variant } = useTabsVariant()

    return (
        <RadixTabs.Trigger
            className={cn(TABS_TRIGGER_STYLES.recipe({ variant }), className)}
            style={width !== undefined ? { ...style, width } : style}
            {...props}
        />
    )
}

TabsTrigger.displayName = 'TabsTrigger'

export default TabsTrigger
