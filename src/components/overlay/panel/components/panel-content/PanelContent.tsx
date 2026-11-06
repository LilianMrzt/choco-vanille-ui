import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import { OverlayBackdrop } from '@components/overlay/_shared/components/overlay-backdrop'
import { usePanelContext } from '@components/overlay/panel/context/Panel.context.ts'
import { PANEL_STYLES } from '@components/overlay/panel/Panel.css.ts'
import type { PanelContentProps } from '@components/overlay/panel/components/panel-content/types'
import { cn } from '@utils/cn.ts'

/**
 * Animated panel portal that renders an `OverlayBackdrop` and a
 * `BaseDialog.Popup`. Slides in from the `position` side (left|right).
 * Resolves an accessible name from `aria-label`, `aria-labelledby`, or the
 * title registered by `Panel.Header`.
 * Native popup attributes and the ref are forwarded to the content element.
 * @param props - Content attributes.
 * @param props.className - Additional content class.
 * @param props.width - CSS width; defaults to `33.333vw`.
 * @param props.position - Side of the viewport; defaults to `right`.
 * @param props["aria-label"] - Explicit accessible name.
 * @param props["aria-labelledby"] - ID of an accessible name.
 * @param props.defaultAriaLabel - Fallback name; defaults to `Panel`.
 * @param props.children - Panel content.
 * @param props.style - Inline style; the `width` prop takes precedence.
 * @returns The panel portal and content.
 * @example
 * <Panel.Content aria-label="Settings">Settings</Panel.Content>
 */
const PanelContent: FC<PanelContentProps> = memo(
    ({
        className,
        width = '33.333vw',
        position = 'right',
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        defaultAriaLabel = 'Panel',
        children,
        style,
        ...props
    }) => {
        const { hasTitle, titleId, withBackdrop } = usePanelContext()
        const accessibleName =
      ariaLabel ?? (!ariaLabelledBy && !hasTitle ? defaultAriaLabel : undefined)
        const labelledBy = ariaLabelledBy ?? (hasTitle ? titleId : undefined)
        const positionClassName =
      position === 'left' ? PANEL_STYLES.left : PANEL_STYLES.right

        return (
            <BaseDialog.Portal>
                {withBackdrop && (
                    <OverlayBackdrop className={PANEL_STYLES.backdrop} />
                )}
                <BaseDialog.Popup
                    className={cn(
                        PANEL_STYLES.content,
                        positionClassName,
                        className,
                    )}
                    style={{ ...style, width }}
                    aria-label={accessibleName}
                    aria-labelledby={labelledBy}
                    {...props}
                >
                    {children}
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        )
    },
)

PanelContent.displayName = 'Panel.Content'

export default PanelContent
