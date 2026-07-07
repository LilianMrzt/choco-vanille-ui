import { PreviewCard } from '@base-ui/react/preview-card'

import { cn } from '@utils/cn.ts'
import { POPOVER_CONTENT_STYLES } from '@components/overlay/popover/components/content/PopoverContent.css.ts'
import type { HoverCardContentProps } from '@components/overlay/hover-card/components/content/types/HoverCardContent.props.ts'
import { parsePosition } from '@components/overlay/_shared/utils/parsePosition.utils.ts'
import { useViewportShift } from '@hooks'

/**
 * The panel that appears when the trigger is hovered.
 * Rendered inside a portal by default for correct stacking.
 *
 * Reuses the popover visual styles so hover cards look identical to popovers.
 * Base UI's built-in collision avoidance is disabled here: it would flip the panel
 * to the opposite side when space is tight, which is jarring.
 * Instead, `useViewportShift` detects any overflow after positioning and
 * shifts the panel inward by exactly the overflowing amount — keeping the
 * original side and never cropping the content.
 *
 * Unlike `PopoverContent`, this intentionally omits the `defaultAriaLabel`
 * accessible-name fallback: a Base UI preview-card panel is non-modal and exposes
 * no `dialog` role, so it needs no required accessible name. Any `aria-label` /
 * `aria-labelledby` a consumer passes is still forwarded via `...props`.
 */
const HoverCardContent = ({
    className,
    position,
    side: sideProp = 'bottom',
    align: alignProp = 'center',
    sideOffset = 6,
    collisionPadding = 8,
    ...props
}: HoverCardContentProps) => {
    const contentRef = useViewportShift(collisionPadding)

    const { side, align } = position
        ? parsePosition(position)
        : { side: sideProp, align: alignProp }

    return (
        <PreviewCard.Portal>
            <PreviewCard.Positioner
                side={side}
                align={align}
                sideOffset={sideOffset}
                className={'isolate'}
                // Disable Base UI's flip/shift — our hook handles collision instead.
                collisionAvoidance={{ side: 'none', align: 'none', fallbackAxisSide: 'none' }}
            >
                <PreviewCard.Popup
                    ref={contentRef}
                    className={cn(POPOVER_CONTENT_STYLES.root, className)}
                    {...props}
                />
            </PreviewCard.Positioner>
        </PreviewCard.Portal>
    )
}

HoverCardContent.displayName = 'HoverCard.Content'

export default HoverCardContent
