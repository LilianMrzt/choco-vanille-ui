import { type FC } from 'react'

import { IconButton } from '@components/actions/icon-button'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import { DIALOG_HEADER_STYLES } from '@components/overlay/dialog/components/dialog-header/styles/DialogHeader.css.ts'
import { IconRegistry } from '@constants/icons'
import type { DialogHeaderProps } from '@components/overlay/dialog/components/dialog-header/types/DialogHeader.props.ts'

/**
  * Header section of a `Dialog`. Renders an optional title, description and
  * a close button in the trailing corner.
  *
  * `children` can be used for fully custom header content alongside or instead
  * of the `title` / `description` props.
  */
const DialogHeader: FC<DialogHeaderProps> = ({
    as: Element = 'div',
    title,
    titleAs,
    titleProps,
    description,
    descriptionProps,
    actions,
    showCloseButton = true,
    className,
    children,
    ...props
}) => (
    <Flex
        as={Element}
        flexDirection={'row'}
        alignItems={'start'}
        justifyContent={'between'}
        gap={'md'}
        padding={'lg'}
        paddingBottom={'none'}
        className={className}
        {...props}
    >
        {(title || description) && (
            <Flex
                flexDirection={'column'}
                alignItems={'start'}
                gap={'xs'}
                className={DIALOG_HEADER_STYLES.content}
            >
                {title && (
                    <Typography
                        as={titleAs ?? 'h2'}
                        id={titleProps?.id}
                        fontSize={'lg'}
                        fontWeight={'semibold'}
                        color={'foreground'}
                        {...titleProps}
                    >
                        {title}
                    </Typography>
                )}
                {description && (
                    <Typography
                        as={'p'}
                        fontSize={'sm'}
                        color={'mutedForeground'}
                        {...descriptionProps}
                    >
                        {description}
                    </Typography>
                )}
            </Flex>
        )}

        {children}

        {actions ? (
            <Flex
                alignItems={'center'}
                gap={'xs'}
                className={DIALOG_HEADER_STYLES.actions}
            >
                {actions}
            </Flex>
        ) : (
            showCloseButton && (
                <Flex
                    alignItems={'center'}
                    className={DIALOG_HEADER_STYLES.actions}
                >
                    <DialogClose>
                        <IconButton
                            icon={IconRegistry.close}
                            aria-label={'Close dialog'}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                        />
                    </DialogClose>
                </Flex>
            )
        )}
    </Flex>
)

DialogHeader.displayName = 'Dialog.Header'

export default DialogHeader
