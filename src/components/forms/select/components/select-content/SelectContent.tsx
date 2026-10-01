import { Select as BaseSelect } from '@base-ui/react/select'
import { memo, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { SELECT_CONTENT_STYLES } from '@components/forms/select/components/select-content/styles/SelectContent.css.ts'
import { SELECT_CONTENT_DEFAULT_COLLISION_AVOIDANCE } from '@components/forms/select/components/select-content/constants/selectContent.const.ts'
import { useViewportShift } from '@hooks/use-viewport-shift/useViewportShift.hook.ts'
import type { SelectContentProps } from '@components/forms/select/components/select-content/types/SelectContent.props.ts'

/**
 * The listbox popup panel.
 *
 * Wraps Base UI's Portal → Positioner → Popup so consumers can use the same
 * simple API as before. By default the popup flips to the opposite side when
 * there is not enough room (the popup height is capped by the available
 * space, so without flipping it would shrink near the viewport edge).
 * Alignment collisions are left to `useViewportShift`. Override the behavior
 * with `collisionAvoidance`.
 */
const SelectContent: FC<SelectContentProps> = memo(({
    className,
    listboxAriaLabel = 'Options',
    children,
    side = 'bottom',
    align = 'start',
    sideOffset = 6,
    collisionAvoidance = SELECT_CONTENT_DEFAULT_COLLISION_AVOIDANCE,
    collisionPadding = 8,
    ...props
}) => {
    const contentRef = useViewportShift(collisionPadding)

    return (
        <BaseSelect.Portal>
            <BaseSelect.Positioner
                side={side}
                align={align}
                sideOffset={sideOffset}
                // Use standard popper-style positioning (no "align item with trigger" overlap).
                alignItemWithTrigger={false}
                collisionAvoidance={collisionAvoidance}
                {...props}
                className={SELECT_CONTENT_STYLES.positioner}
            >
                <BaseSelect.Popup
                    ref={contentRef}
                    className={cn(SELECT_CONTENT_STYLES.root, className)}
                    aria-label={listboxAriaLabel}
                >
                    {children}
                </BaseSelect.Popup>
            </BaseSelect.Positioner>
        </BaseSelect.Portal>
    )
})

SelectContent.displayName = 'Select.Content'

export default SelectContent
