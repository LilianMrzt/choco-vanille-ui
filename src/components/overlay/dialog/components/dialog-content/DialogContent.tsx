import * as RadixDialog from '@radix-ui/react-dialog'

import { DIALOG_STYLES } from '@components/overlay/dialog/Dialog.css.ts'
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
        <RadixDialog.Portal>
            <RadixDialog.Overlay className={DIALOG_STYLES.overlay} />
            <RadixDialog.Content
                className={cn(DIALOG_STYLES.content, DIALOG_STYLES.contentSize[size], className)}
                aria-label={accessibleName}
                aria-labelledby={ariaLabelledBy}
                {...props}
            >
                {children}
            </RadixDialog.Content>
        </RadixDialog.Portal>
    )
}

DialogContent.displayName = 'DialogContent'

export default DialogContent
