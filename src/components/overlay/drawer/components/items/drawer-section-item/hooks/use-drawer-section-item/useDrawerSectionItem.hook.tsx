import {
    useCallback,
    useId,
    useState,
} from 'react'

import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared'
import type {
    UseDrawerSectionItemOptions,
    UseDrawerSectionItemReturn
} from '@components/overlay/drawer/components/items/drawer-section-item/hooks/use-drawer-section-item/types'

export const useDrawerSectionItem = ({
    defaultExpanded = false,
    expanded: expandedProp,
    onExpandedChange,
}: UseDrawerSectionItemOptions): UseDrawerSectionItemReturn => {
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
