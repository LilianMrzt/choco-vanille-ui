import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { Typography } from '@components/foundation/typography'
import type { DialogTitleProps } from '@components/overlay/dialog/components/dialog-title/types/DialogTitle.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Accessible title for the dialog.
 * Required for screen-reader users; rendered as a heading by default.
 */
const DialogTitle = ({ className, children, ...props }: DialogTitleProps) => (
    <BaseDialog.Title
        className={cn(className)}
        {...props}
    >
        <Typography
            as={'h2'}
            fontSize={'lg'}
            fontWeight={'semibold'}
            color={'foreground'}
        >
            {children}
        </Typography>
    </BaseDialog.Title>
)

DialogTitle.displayName = 'Dialog.Title'

export default DialogTitle
