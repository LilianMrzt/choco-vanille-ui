import { vars } from '@theme/styles/contract/contract.css.ts'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import type { DialogTitleProps } from '@components/overlay/dialog/components/dialog-title/types'
import { cn } from '@utils/cn.ts'

/**
 * Accessible title for the dialog.
 * Required for screen-reader users; rendered as a heading by default.
 * Attributes and ref target the heading.
 * @param props - Title attributes.
 * @param props.className - Additional heading class.
 * @param props.children - Title content.
 * @returns The dialog title.
 * @example
 * <Dialog.Title>Settings</Dialog.Title>
 */
const DialogTitle: FC<DialogTitleProps> = memo(({ className, children, ...props }) => (
    <BaseDialog.Title
        className={cn(className)}
        {...props}
    >
        <Typography
            as={'span'}
            variant={'h2'}
            fontSize={18}
            fontWeight={'semibold'}
            color={vars.color.text.primary}
        >
            {children}
        </Typography>
    </BaseDialog.Title>
))

DialogTitle.displayName = 'Dialog.Title'

export default DialogTitle
