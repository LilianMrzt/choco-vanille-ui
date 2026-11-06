import { Popover as BasePopover } from '@base-ui/react/popover'
import { memo, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { POPOVER_CONTENT_STYLES } from '@components/overlay/popover/components/content/PopoverContent.css.ts'
import type { PopoverContentProps } from '@components/overlay/popover/components/content/types'
import { parsePosition } from '@components/overlay/_shared/utils/parsePosition.utils.ts'
import { useComposedPopupRef } from '@components/overlay/_shared/hooks/use-composed-popup-ref/useComposedPopupRef.hook.ts'
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
 * @param props - Popup attributes and positioning options.
 * @param props.position - Combined side and alignment; takes precedence over separate values.
 * @param props.side - Side relative to the trigger; defaults to `bottom`.
 * @param props.align - Alignment; defaults to `center`.
 * @param props.sideOffset - Trigger offset in pixels; defaults to `6`.
 * @param props.collisionPadding - Viewport padding; defaults to `8`.
 * @param props.padding - Padding token; defaults to `12`.
 * @param props.width - Panel width.
 * @param props.defaultAriaLabel - Fallback accessible name; defaults to `Popover`.
 * @param props.className - Additional popup class.
 * @param props.style - Inline popup styles.
 * @param props.ref - Ref to the popup.
 * @returns The portaled popup.
 * @example
 * <Popover.Content aria-label="Options">Content</Popover.Content>
 */
const PopoverContent: FC<PopoverContentProps> = memo(({
    className,
    position,
    padding = 12,
    width,
    side: sideProp = 'bottom',
    align: alignProp = 'center',
    sideOffset = 6,
    collisionPadding = 8,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    defaultAriaLabel = 'Popover',
    style,
    ref,
    ...props
}) => {
    const contentRef = useViewportShift(collisionPadding)
    const mergedRef = useComposedPopupRef(contentRef, ref)

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
                className={POPOVER_CONTENT_STYLES.positioner}
                // Disable Base UI's flip/shift — our hook handles collision instead.
                collisionAvoidance={{ side: 'none', align: 'none', fallbackAxisSide: 'none' }}
            >
                <BasePopover.Popup
                    ref={mergedRef}
                    className={cn(
                        POPOVER_CONTENT_STYLES.root,
                        POPOVER_CONTENT_STYLES.padding({ padding }),
                        className,
                    )}
                    aria-label={accessibleName}
                    aria-labelledby={ariaLabelledBy}
                    style={{
                        width,
                        ...style,
                    }}
                    {...props}
                />
            </BasePopover.Positioner>
        </BasePopover.Portal>
    )
})

PopoverContent.displayName = 'Popover.Content'

export default PopoverContent
