import * as RadixPopover from '@radix-ui/react-popover'

import { cn } from '@utils/cn.ts'
import { POPOVER_CONTENT_STYLES } from '@components/overlay/popover/components/content/PopoverContent.css.ts'
import type { PopoverContentProps } from '@components/overlay/popover/components/content/types/PopoverContent.props.ts'
import { parsePosition } from '@components/overlay/_shared/utils/parsePosition.utils.ts'
import { useViewportShift } from '@hooks'

/**
 * The panel that pops out from the trigger.
 * Rendered inside a portal by default for correct stacking.
 *
 * Radix's built-in `avoidCollisions` is disabled here: it would flip the popover
 * to the opposite side when space is tight, which is jarring.
 * Instead, `useViewportShift` detects any overflow after positioning and
 * shifts the panel inward by exactly the overflowing amount — keeping the
 * original side and never cropping the content.
 */
const PopoverContent = ({
    className,
    position,
    side: sideProp = 'bottom',
    align: alignProp = 'center',
    sideOffset = 6,
    collisionPadding = 8,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    defaultAriaLabel = 'Popover',
    ...props
}: PopoverContentProps) => {
    const contentRef = useViewportShift(collisionPadding)

    const { side, align } = position
        ? parsePosition(position)
        : { side: sideProp, align: alignProp }

    // A role="dialog" element must have an accessible name (axe aria-dialog-name).
    // Consumers can override via aria-label or aria-labelledby; otherwise we fall
    // back to defaultAriaLabel so it can be localized.
    const accessibleName = ariaLabel ?? (ariaLabelledBy ? undefined : defaultAriaLabel)

    return (
        <RadixPopover.Portal>
            <RadixPopover.Content
                ref={contentRef}
                side={side}
                align={align}
                sideOffset={sideOffset}
                className={cn(POPOVER_CONTENT_STYLES.root, className)}
                aria-label={accessibleName}
                aria-labelledby={ariaLabelledBy}
                {...props}
                // Disable Radix's flip/shift — our hook handles collision instead.
                avoidCollisions={false}
            />
        </RadixPopover.Portal>
    )
}

PopoverContent.displayName = 'PopoverContent'

export default PopoverContent
