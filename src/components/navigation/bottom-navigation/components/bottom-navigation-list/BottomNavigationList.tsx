import { memo, type FC } from 'react'

import { BOTTOM_NAVIGATION_STYLES } from '@components/navigation/bottom-navigation/BottomNavigation.css.ts'
import type { BottomNavigationListProps } from '@components/navigation/bottom-navigation/components/bottom-navigation-list/types'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { cn } from '@utils/cn.ts'

/**
 * Horizontal list slot for `BottomNavigation`. Keeps item layout independent
 * from the navigation landmark so consumers can style the list separately.
 */
const BottomNavigationList: FC<BottomNavigationListProps> = memo(
    ({ children, className, gap, maxWidth, ref, style, width, ...props }) => (
        <ul
            ref={ref}
            {...props}
            className={cn(BOTTOM_NAVIGATION_STYLES.list, className)}
            style={{
                gap: gap !== undefined ? vars.space[gap] : undefined,
                maxWidth,
                width,
                ...style,
            }}
        >
            {children}
        </ul>
    ),
)

BottomNavigationList.displayName = 'BottomNavigation.List'

export default BottomNavigationList
