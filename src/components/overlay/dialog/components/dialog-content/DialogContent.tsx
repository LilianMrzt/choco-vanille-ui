import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import { OverlayBackdrop } from '@components/overlay/_shared/components/overlay-backdrop'
import { DIALOG_STYLES } from '@components/overlay/dialog/Dialog.css.ts'
import type { DialogContentProps } from '@components/overlay/dialog/components/dialog-content/types'
import { cn } from '@utils/cn.ts'

/**
 * The modal panel rendered inside a portal.
 * Includes the backdrop overlay and the content container.
 * Provide a localized accessible name using `aria-label`, `aria-labelledby`,
 * or `defaultAriaLabel`. Attributes and ref target the content element.
 * @param props - Content attributes.
 * @param props.className - Additional content class.
 * @param props.size - Width preset; defaults to `md`.
 * @param props["aria-label"] - Explicit accessible name.
 * @param props["aria-labelledby"] - ID of an accessible name.
 * @param props.defaultAriaLabel - Fallback name; defaults to `Dialog`.
 * @param props.children - Dialog content.
 * @returns The portal and dialog content.
 * @example
 * <Dialog.Content aria-label="Settings">Settings</Dialog.Content>
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
