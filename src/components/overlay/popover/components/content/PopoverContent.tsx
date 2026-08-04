import { Popover as BasePopover } from '@base-ui/react/popover'
import { memo, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { POPOVER_CONTENT_STYLES } from '@components/overlay/popover/components/content/styles/PopoverContent.css.ts'
import type { PopoverContentProps } from '@components/overlay/popover/components/content/types/PopoverContent.props.ts'
import { parsePosition } from '@components/overlay/_shared/utils/parsePosition.utils.ts'
import { useViewportShift } from '@hooks/use-viewport-shift/useViewportShift.hook.ts'

/**
 * The panel that pops out from the trigger.
 * Rendered inside a portal by default for correct stacking.
 *
 * Base UI's built-in collision avoidance is disabled here: it would flip the popover
 * to the opposite side when space is tight, which is jarring.
 * Instead, `useViewportShift` detects any overflow after positioning and
 * shifts the panel inward by exactly the overflowing amount — keeping the
 * original side and never cropping the content.
 */
const PopoverContent: FC<PopoverContentProps> = memo(({
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
}) => {
    const contentRef = useViewportShift(collisionPadding)

    const { side, align } = position
        ? parsePosition(position)
        : { side: sideProp, align: alignProp }

    // A role="dialog" element must have an accessible name (axe aria-dialog-name).
    // Consumers can override via aria-label or aria-labelledby; otherwise we fall
    // back to defaultAriaLabel so it can be localized.
    const accessibleName = ariaLabel ?? (ariaLabelledBy ? undefined : defaultAriaLabel)

    return (
        <BasePopover.Portal>
            <BasePopover.Positioner
                side={side}
                align={align}
                sideOffset={sideOffset}
                // Disable Base UI's flip/shift — our hook handles collision instead.
                collisionAvoidance={{ side: 'none', align: 'none', fallbackAxisSide: 'none' }}
            >
                <BasePopover.Popup
                    ref={contentRef}
                    className={cn(POPOVER_CONTENT_STYLES.root, className)}
                    aria-label={accessibleName}
                    aria-labelledby={ariaLabelledBy}
                    {...props}
                />
            </BasePopover.Positioner>
        </BasePopover.Portal>
    )
})

PopoverContent.displayName = 'Popover.Content'

export default PopoverContent
