import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import DialogBody from '@components/overlay/dialog/components/dialog-body/DialogBody.tsx'
import DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import DialogContent from '@components/overlay/dialog/components/dialog-content/DialogContent.tsx'
import DialogDescription from '@components/overlay/dialog/components/dialog-description/DialogDescription.tsx'
import DialogFooter from '@components/overlay/dialog/components/dialog-footer/DialogFooter.tsx'
import DialogHeader from '@components/overlay/dialog/components/dialog-header/DialogHeader.tsx'
import DialogTitle from '@components/overlay/dialog/components/dialog-title/DialogTitle.tsx'
import DialogTrigger from '@components/overlay/dialog/components/dialog-trigger/DialogTrigger.tsx'
import type { DialogProps } from '@components/overlay/dialog/types'

/**
 * A modal dialog built on Base UI Dialog.
 *
 * Compose with the named sub-components for a complete, accessible modal:
 * `Dialog.Trigger`, `Dialog.Content`, `Dialog.Header`, `Dialog.Body`,
 * `Dialog.Footer`, `Dialog.Title`, `Dialog.Description` and `Dialog.Close`.
 *
 * @param props - Dialog state, callbacks and root composition.
 * @returns The dialog root and its composed slots.
 * @example
 * ```tsx
 * <Dialog>
 *   <Dialog.Trigger>
 *     <Button label="Open dialog" variant="contained" color="primary" />
 *   </Dialog.Trigger>
 *   <Dialog.Content>
 *     <Dialog.Header
 *       title="Account settings"
 *       description="Manage your profile and preferences."
 *     />
 *     <Dialog.Body>
 *       <Typography>Your content goes here.</Typography>
 *     </Dialog.Body>
 *     <Dialog.Footer>
 *       <Dialog.Close>
 *         <Button label="Cancel" variant="outlined" color="primary" />
 *       </Dialog.Close>
 *       <Button label="Save" variant="contained" color="primary" />
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog>
 * ```
 */
const DialogRoot: FC<DialogProps> = memo((props) => (
    <BaseDialog.Root {...props} />
))

DialogRoot.displayName = 'Dialog'

/**
 * Dialog root with namespaced trigger, content, and section slots.
 * Compose a named content panel and include an accessible close control.
 * @example
 * <Dialog><Dialog.Content aria-label="Settings" /></Dialog>
 */
const Dialog = Object.assign(DialogRoot, {
    Trigger: DialogTrigger,
    Content: DialogContent,
    Header: DialogHeader,
    Body: DialogBody,
    Footer: DialogFooter,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
})

export default Dialog
