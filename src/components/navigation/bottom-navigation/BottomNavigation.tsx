import { memo, useCallback, useMemo, useState } from 'react'

import BottomNavigationItem from '@components/navigation/bottom-navigation/components/bottom-navigation-item/BottomNavigationItem.tsx'
import BottomNavigationList from '@components/navigation/bottom-navigation/components/bottom-navigation-list/BottomNavigationList.tsx'
import { BottomNavigationContext } from '@components/navigation/bottom-navigation/context/BottomNavigation.context.ts'
import { BOTTOM_NAVIGATION_STYLES } from '@components/navigation/bottom-navigation/BottomNavigation.css.ts'
import type { BottomNavigationProps } from '@components/navigation/bottom-navigation/types'
import { cn } from '@utils/cn.ts'

/**
 * Mobile-first navigation landmark with a full-width bottom presentation.
 *
 * Compose `BottomNavigation`, `BottomNavigation.List`, and
 * `BottomNavigation.Item`. Items can be links or native buttons and selection
 * supports both controlled and uncontrolled state.
 */
const BottomNavigationRoot = memo<BottomNavigationProps>(
    ({
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        children,
        value,
        defaultValue,
        onValueChange,
        bordered = false,
        className,
        ref,
        ...props
    }) => {
        const [internalValue, setInternalValue] = useState(defaultValue)
        const isControlled = value !== undefined
        const selectedValue = isControlled ? value : internalValue
        const handleValueChange = useCallback(
            (nextValue: string) => {
                if (!isControlled) {
                    setInternalValue(nextValue)
                }
                onValueChange?.(nextValue)
            },
            [isControlled, onValueChange],
        )
        const contextValue = useMemo(
            () => ({
                value: selectedValue,
                onValueChange: handleValueChange,
            }),
            [handleValueChange, selectedValue],
        )

        return (
            <BottomNavigationContext.Provider value={contextValue}>
                <nav
                    ref={ref}
                    {...props}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    className={cn(
                        BOTTOM_NAVIGATION_STYLES.root,
                        bordered && BOTTOM_NAVIGATION_STYLES.bordered,
                        className,
                    )}
                >
                    {children}
                </nav>
            </BottomNavigationContext.Provider>
        )
    },
)

BottomNavigationRoot.displayName = 'BottomNavigation'

/** Navigation landmark with list and item slots. */
const BottomNavigation = Object.assign(BottomNavigationRoot, {
    List: BottomNavigationList,
    Item: BottomNavigationItem,
})

export default BottomNavigation
