import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import { OverlayBackdrop } from '@components/overlay/_shared/components/overlay-backdrop'
import { DIALOG_STYLES } from '@components/overlay/dialog/styles/Dialog.css.ts'
import type { DialogContentProps } from '@components/overlay/dialog/components/dialog-content/types/DialogContent.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * The modal panel rendered inside a portal.
 * Includes the backdrop overlay and the content container.
 */
const DialogContent: FC<DialogContentProps> = memo(({
    className,
    size = 'md',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    defaultAriaLabel = 'Dialog',
    children,
    ...props
}) => {
    // A role="dialog" element must have an accessible name (axe aria-dialog-name).
    // Consumers can override via aria-label or aria-labelledby; otherwise we fall
    // back to defaultAriaLabel so it can be localized.
    const accessibleName = ariaLabel ?? (ariaLabelledBy ? undefined : defaultAriaLabel)

    return (
        <BaseDialog.Portal>
            <OverlayBackdrop />
            <BaseDialog.Popup
                className={cn(DIALOG_STYLES.content, DIALOG_STYLES.contentSize[size], className)}
                aria-label={accessibleName}
                aria-labelledby={ariaLabelledBy}
                {...props}
            >
                {children}
            </BaseDialog.Popup>
        </BaseDialog.Portal>
    )
})

DialogContent.displayName = 'Dialog.Content'

export default DialogContent
