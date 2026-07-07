import { Select as BaseSelect } from '@base-ui/react/select'
import type { FC } from 'react'

import { cn } from '@utils/cn.ts'
import { SELECT_CONTENT_STYLES } from '@components/forms/select/components/select-content/SelectContent.css.ts'
import { useViewportShift } from '@hooks'
import type { SelectContentProps } from '@components/forms/select/components/select-content/types/SelectContent.props.ts'

/**
 * The listbox popup panel.
 *
 * Wraps Base UI's Portal → Positioner → Popup so consumers can use the same
 * simple API as before. Collision handling is delegated to `useViewportShift`
 * (Base UI's built-in flip/shift is disabled).
 */
const SelectContent: FC<SelectContentProps> = ({
    className,
    listboxAriaLabel = 'Options',
    children,
    side = 'bottom',
    align = 'start',
    sideOffset = 6,
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
                // Disable Base UI's flip/shift — our hook handles collision instead.
                collisionAvoidance={{ side: 'none', align: 'none' }}
                {...props}
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
}

SelectContent.displayName = 'Select.Content'

export default SelectContent
