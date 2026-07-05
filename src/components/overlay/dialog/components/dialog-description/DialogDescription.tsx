import * as RadixDialog from '@radix-ui/react-dialog'

import { Typography } from '@components/foundation/typography'
import type { DialogDescriptionProps } from '@components/overlay/dialog/components/dialog-description/types/DialogDescription.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Accessible description for the dialog.
 * Provides additional context to the title.
 */
const DialogDescription = ({ className, children, color: _color, ...props }: DialogDescriptionProps) => (
    <RadixDialog.Description asChild>
        <Typography
            as={'p'}
            fontSize={'sm'}
            color={'mutedForeground'}
            className={cn(className)}
            {...props}
        >
            {children}
        </Typography>
    </RadixDialog.Description>
)

DialogDescription.displayName = 'DialogDescription'

export default DialogDescription
