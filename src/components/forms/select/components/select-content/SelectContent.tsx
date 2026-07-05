import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

import { cn } from '@utils/cn.ts'
import { SELECT_CONTENT_STYLES } from '@components/forms/select/components/select-content/SelectContent.css.ts'
import { useViewportShift } from '@hooks'
import type { SelectContentProps } from '@components/forms/select/components/select-content/types/SelectContent.props.ts'

/**
 * The listbox popup panel.
 */
const SelectContent: FC<SelectContentProps> = ({
    className,
    listboxAriaLabel = 'Options',
    children,
    position = 'popper',
    side = 'bottom',
    align = 'start',
    sideOffset = 6,
    collisionPadding = 8,
    ...props
}) => {
    const contentRef = useViewportShift(collisionPadding)

    return (
        <RadixSelect.Portal>
            <RadixSelect.Content
                ref={contentRef}
                position={position}
                side={side}
                align={align}
                sideOffset={sideOffset}
                className={cn(SELECT_CONTENT_STYLES.root, className)}
                aria-label={listboxAriaLabel}
                {...props}
                // Disable Radix's flip/shift — our hook handles collision instead.
                avoidCollisions={false}
            >
                {children}
            </RadixSelect.Content>
        </RadixSelect.Portal>
    )
}

SelectContent.displayName = 'SelectContent'

export default SelectContent
