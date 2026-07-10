import { memo, type FC } from 'react'

import { Tabs as BaseTabs } from '@base-ui/react/tabs'

import { TABS_TRIGGER_STYLES, tabsTriggerLabel } from '@components/navigation/tabs/components/tabs-trigger/styles/TabsTrigger.css.ts'
import type { TabsTriggerProps } from '@components/navigation/tabs/components/tabs-trigger/types/TabsTrigger.props.ts'
import { useTabsVariant } from '@components/navigation/tabs/context/TabsVariant.context.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'

/**
 * Activates its associated tab panel when clicked or focused and activated
 * via keyboard. Automatically matches the visual style of its parent
 * `Tabs.List`.
 */
const TabsTrigger: FC<TabsTriggerProps> = memo(({ className, style, width, label, startIcon, endIcon, value, ...props }) => {
    const { variant } = useTabsVariant()

    return (
        <BaseTabs.Tab
            value={value}
            className={cn(TABS_TRIGGER_STYLES.recipe({ variant }), className)}
            style={width !== undefined ? { ...style, width } : style}
            {...props}
        >
            {startIcon && (
                <Icon
                    icon={startIcon}
                    size={'sm'}
                />
            )}
            {label && (
                <Typography
                    as={'span'}
                    variant={'span'}
                    fontSize={'sm'}
                    className={tabsTriggerLabel}
                >
                    {label}
                </Typography>
            )}
            {endIcon && (
                <Icon
                    icon={endIcon}
                    size={'sm'}
                />
            )}
        </BaseTabs.Tab>
    )
})

TabsTrigger.displayName = 'Tabs.Trigger'

export default TabsTrigger
