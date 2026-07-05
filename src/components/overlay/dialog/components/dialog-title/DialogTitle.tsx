import * as RadixDialog from '@radix-ui/react-dialog'

import { Typography } from '@components/foundation/typography'
import type { DialogTitleProps } from '@components/overlay/dialog/components/dialog-title/types/DialogTitle.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Accessible title for the dialog.
 * Required for screen-reader users; rendered as a heading by default.
 */
const DialogTitle = ({ className, children, color: _color, ...props }: DialogTitleProps) => (
    <RadixDialog.Title asChild>
        <Typography
            as={'h2'}
            fontSize={'lg'}
            fontWeight={'semibold'}
            color={'foreground'}
            className={cn(className)}
            {...props}
        >
            {children}
        </Typography>
    </RadixDialog.Title>
)

DialogTitle.displayName = 'DialogTitle'

export default DialogTitle
