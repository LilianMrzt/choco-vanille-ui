import * as RadixTabs from '@radix-ui/react-tabs'

import { TABS_LIST_STYLES } from '@components/navigation/tabs/components/tabs-list/TabsList.css.ts'
import type { TabsListProps } from '@components/navigation/tabs/components/tabs-list/types/TabsList.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Container for tab triggers. Provide an accessible name via `aria-label`
 * or `aria-labelledby`.
 */
const TabsList = ({ className, ...props }: TabsListProps) => (
    <RadixTabs.List
        className={cn(TABS_LIST_STYLES.root, className)}
        {...props}
    />
)

TabsList.displayName = 'TabsList'

export default TabsList
