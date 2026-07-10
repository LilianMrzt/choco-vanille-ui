import {
    useCallback,
    useId,
    useState,
    type KeyboardEvent,
} from 'react'

import { RotatingChevron } from '@components/_common/rotating-chevron'
import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared'
import type {
    UseDrawerSectionItemOptions,
    UseDrawerSectionItemReturn
} from '@components/overlay/drawer/components/items/drawer-section-item/hooks/use-drawer-section-item/types'

export const useDrawerSectionItem = ({
    defaultExpanded = false,
    expanded: expandedProp,
    onExpandedChange,
    size = 'md',
}: UseDrawerSectionItemOptions): UseDrawerSectionItemReturn => {
    const { state, resolvedIconSize, itemAttributes } = useDrawerItemAttributes(
        size,
        undefined,
    )
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

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLButtonElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleToggle()
            }
        },
        [handleToggle],
    )

    const chevron = (
        <RotatingChevron
            expanded={expanded}
            size={resolvedIconSize}
            data-state={state}
        />
    )

    return {
        state,
        resolvedIconSize,
        itemAttributes,
        sectionId,
        expanded,
        chevron,
        handleToggle,
        handleKeyDown,
    }
}
