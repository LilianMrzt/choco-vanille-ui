import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { DIALOG_STYLES } from '@components/overlay/dialog/styles/Dialog.css.ts'
import type { DialogContentProps } from '@components/overlay/dialog/components/dialog-content/types/DialogContent.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * The modal panel rendered inside a portal.
 * Includes the backdrop overlay and the content container.
 */
const DialogContent = ({
    className,
    size = 'md',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    defaultAriaLabel = 'Dialog',
    children,
    ...props
}: DialogContentProps) => {
    // A role="dialog" element must have an accessible name (axe aria-dialog-name).
    // Consumers can override via aria-label or aria-labelledby; otherwise we fall
    // back to defaultAriaLabel so it can be localized.
    const accessibleName = ariaLabel ?? (ariaLabelledBy ? undefined : defaultAriaLabel)

    return (
        <BaseDialog.Portal>
            <BaseDialog.Backdrop className={DIALOG_STYLES.overlay} />
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
}

DialogContent.displayName = 'Dialog.Content'

export default DialogContent
