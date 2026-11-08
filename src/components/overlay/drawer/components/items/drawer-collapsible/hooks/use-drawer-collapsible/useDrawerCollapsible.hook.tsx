import {
    useCallback,
    useId,
    useState,
} from 'react'

import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared'
import type {
    UseDrawerCollapsibleOptions,
    UseDrawerCollapsibleReturn
} from '@components/overlay/drawer/components/items/drawer-collapsible/hooks/use-drawer-collapsible/types'

/**
 * Coordinates controlled or initial expansion independently of drawer visibility.
 * @param options - Expansion state and callback.
 * @param options.defaultExpanded - Initial uncontrolled expansion; defaults to false.
 * @param options.expanded - Controlled expansion when defined.
 * @param options.onExpandedChange - Receives requested expansion changes.
 * @returns Drawer attributes, region ID, expansion state and toggle handler.
 * @example
 * const { expanded, handleToggle } = useDrawerCollapsible({ defaultExpanded: true })
 */
export const useDrawerCollapsible = ({
    defaultExpanded = false,
    expanded: expandedProp,
    onExpandedChange,
}: UseDrawerCollapsibleOptions): UseDrawerCollapsibleReturn => {
    const { open, state, resolvedIconSize, itemAttributes } = useDrawerItemAttributes()
    const generatedId = useId()
    const sectionId = `${generatedId}-section`
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
    const isControlled = expandedProp !== undefined
    const expanded = isControlled ? expandedProp : internalExpanded

    const handleToggle = useCallback(() => {
        const next = !expanded
        if (!isControlled) {
            setInternalExpanded(next)
        }
        onExpandedChange?.(next)
    }, [expanded, isControlled, onExpandedChange])

    return {
        open,
        state,
        resolvedIconSize,
        itemAttributes,
        sectionId,
        expanded,
        handleToggle,
    }
}
