import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import DialogBody from '@components/overlay/dialog/components/dialog-body/DialogBody.tsx'
import DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import DialogContent from '@components/overlay/dialog/components/dialog-content/DialogContent.tsx'
import DialogDescription from '@components/overlay/dialog/components/dialog-description/DialogDescription.tsx'
import DialogFooter from '@components/overlay/dialog/components/dialog-footer/DialogFooter.tsx'
import DialogHeader from '@components/overlay/dialog/components/dialog-header/DialogHeader.tsx'
import DialogTitle from '@components/overlay/dialog/components/dialog-title/DialogTitle.tsx'
import DialogTrigger from '@components/overlay/dialog/components/dialog-trigger/DialogTrigger.tsx'
import type { DialogCompound } from '@components/overlay/dialog/types'

/**
 * A modal dialog built on Base UI Dialog.
 *
 * Compose with the named sub-components for a complete, accessible modal:
 * `Dialog.Trigger`, `Dialog.Content`, `Dialog.Header`, `Dialog.Body`,
 * `Dialog.Footer`, `Dialog.Title`, `Dialog.Description` and `Dialog.Close`.
 *
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
const Dialog = ((props) => (
    <BaseDialog.Root {...props} />
)) as DialogCompound

Dialog.displayName = 'Dialog'
Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
Dialog.Header = DialogHeader
Dialog.Body = DialogBody
Dialog.Footer = DialogFooter
Dialog.Title = DialogTitle
Dialog.Description = DialogDescription
Dialog.Close = DialogClose

export { Dialog }
