import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import { OverlayBackdrop } from '@components/overlay/_shared/components/overlay-backdrop'
import { usePanelContext } from '@components/overlay/panel/context/Panel.context.ts'
import { PANEL_STYLES } from '@components/overlay/panel/styles/Panel.css.ts'
import type { PanelContentProps } from '@components/overlay/panel/components/panel-content/types/PanelContent.props.ts'
import { cn } from '@utils/cn.ts'

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
        const { hasTitle, titleId } = usePanelContext()
        const accessibleName =
      ariaLabel ?? (!ariaLabelledBy && !hasTitle ? defaultAriaLabel : undefined)
        const labelledBy = ariaLabelledBy ?? (hasTitle ? titleId : undefined)
        const positionClassName =
      position === 'left' ? PANEL_STYLES.left : PANEL_STYLES.right

        return (
            <BaseDialog.Portal>
                <OverlayBackdrop className={PANEL_STYLES.backdrop} />
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
