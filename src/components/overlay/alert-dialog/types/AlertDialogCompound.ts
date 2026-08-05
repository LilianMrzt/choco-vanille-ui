import type { FC } from 'react'

import type AlertDialogAction from '@components/overlay/alert-dialog/components/alert-dialog-action/AlertDialogAction.tsx'
import type AlertDialogCancel from '@components/overlay/alert-dialog/components/alert-dialog-cancel/AlertDialogCancel.tsx'
import type { AlertDialogProps } from '@components/overlay/alert-dialog/types/AlertDialog.props.ts'
import type DialogBody from '@components/overlay/dialog/components/dialog-body/DialogBody.tsx'
import type DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import type DialogContent from '@components/overlay/dialog/components/dialog-content/DialogContent.tsx'
import type DialogDescription from '@components/overlay/dialog/components/dialog-description/DialogDescription.tsx'
import type DialogFooter from '@components/overlay/dialog/components/dialog-footer/DialogFooter.tsx'
import type DialogHeader from '@components/overlay/dialog/components/dialog-header/DialogHeader.tsx'
import type DialogTitle from '@components/overlay/dialog/components/dialog-title/DialogTitle.tsx'
import type DialogTrigger from '@components/overlay/dialog/components/dialog-trigger/DialogTrigger.tsx'

export type AlertDialogCompound = FC<AlertDialogProps> & {
    Trigger: typeof DialogTrigger
    Content: typeof DialogContent
    Header: typeof DialogHeader
    Body: typeof DialogBody
    Footer: typeof DialogFooter
    Title: typeof DialogTitle
    Description: typeof DialogDescription
    Close: typeof DialogClose
    Action: typeof AlertDialogAction
    Cancel: typeof AlertDialogCancel
}
