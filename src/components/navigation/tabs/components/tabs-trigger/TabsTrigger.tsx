import * as RadixTabs from '@radix-ui/react-tabs'

import { TABS_TRIGGER_STYLES } from '@components/navigation/tabs/components/tabs-trigger/TabsTrigger.css.ts'
import type { TabsTriggerProps } from '@components/navigation/tabs/components/tabs-trigger/types/TabsTrigger.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Activates its associated tab panel when clicked or focused and activated
 * via keyboard.
 */
const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => (
    <RadixTabs.Trigger
        className={cn(TABS_TRIGGER_STYLES.root, className)}
        {...props}
    />
)

TabsTrigger.displayName = 'TabsTrigger'

export default TabsTrigger
