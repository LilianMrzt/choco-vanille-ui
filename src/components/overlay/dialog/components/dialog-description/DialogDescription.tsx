import { vars } from '@theme/styles/contract/contract.css.ts'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import type { DialogDescriptionProps } from '@components/overlay/dialog/components/dialog-description/types'
import { cn } from '@utils/cn.ts'

/**
 * Accessible description for the dialog.
 * Provides additional context to the title.
 * Attributes and ref target the paragraph.
 * @param props - Description attributes.
 * @param props.className - Additional paragraph class.
 * @param props.children - Description content.
 * @returns The dialog description.
 * @example
 * <Dialog.Description>Manage settings.</Dialog.Description>
 */
const DialogDescription: FC<DialogDescriptionProps> = memo(({ className, children, ...props }) => (
    <BaseDialog.Description
        className={cn(className)}
        {...props}
    >
        <Typography
            as={'span'}
            variant={'p'}
            fontSize={14}
            color={vars.color.surface.mutedForeground}
        >
            {children}
        </Typography>
    </BaseDialog.Description>
))

DialogDescription.displayName = 'Dialog.Description'

export default DialogDescription
