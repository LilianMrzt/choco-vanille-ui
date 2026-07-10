import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import type { DialogDescriptionProps } from '@components/overlay/dialog/components/dialog-description/types/DialogDescription.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Accessible description for the dialog.
 * Provides additional context to the title.
 */
const DialogDescription: FC<DialogDescriptionProps> = memo(({ className, children, ...props }) => (
    <BaseDialog.Description
        className={cn(className)}
        {...props}
    >
        <Typography
            as={'p'}
            fontSize={'sm'}
            color={'mutedForeground'}
        >
            {children}
        </Typography>
    </BaseDialog.Description>
))

DialogDescription.displayName = 'Dialog.Description'

export default DialogDescription
