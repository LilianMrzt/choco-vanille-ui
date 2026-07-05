import * as RadixTabs from '@radix-ui/react-tabs'

import { TABS_CONTENT_STYLES } from '@components/navigation/tabs/components/tabs-content/TabsContent.css.ts'
import type { TabsContentProps } from '@components/navigation/tabs/components/tabs-content/types/TabsContent.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Panel shown when its associated trigger is active.
 */
const TabsContent = ({ className, ...props }: TabsContentProps) => (
    <RadixTabs.Content
        className={cn(TABS_CONTENT_STYLES.root, className)}
        {...props}
    />
)

TabsContent.displayName = 'TabsContent'

export default TabsContent
