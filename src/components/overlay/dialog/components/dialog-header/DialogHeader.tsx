import { vars } from '@theme/styles/contract/contract.css.ts'
import { memo, type FC } from 'react'

import { IconButton } from '@components/actions/icon-button'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import DialogClose from '@components/overlay/dialog/components/dialog-close/DialogClose.tsx'
import { DIALOG_HEADER_STYLES } from '@components/overlay/dialog/components/dialog-header/DialogHeader.css.ts'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import type { DialogHeaderProps } from '@components/overlay/dialog/components/dialog-header/types'

/**
  * Header section of a `Dialog`. Renders an optional title, description and
  * a close button in the trailing corner.
  *
  * `children` can be used for fully custom header content alongside or instead
  * of the `title` / `description` props.
  *
  * Native attributes and ref target the selected root element.
  * @param props - Header layout attributes and content.
  * @param props.as - Root element; defaults to `div`.
  * @param props.title - Optional heading.
  * @param props.titleAs - Heading element; defaults to `h2`.
  * @param props.titleProps - Additional title attributes.
  * @param props.description - Optional description.
  * @param props.descriptionProps - Additional description attributes.
  * @param props.actions - Trailing content replacing the default close control.
  * @param props.showCloseButton - Show the default close control; defaults to `true`.
  * @param props.className - Additional root class.
  * @param props.children - Additional header content.
  * @returns The dialog header.
  * @example
  * <Dialog.Header title="Settings" />
  */
const DialogHeader: FC<DialogHeaderProps> = memo(({
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
        gap={12}
        padding={16}
        paddingBottom={0}
        className={className}
        {...props}
    >
        {(title || description) && (
            <Flex
                flexDirection={'column'}
                alignItems={'start'}
                gap={4}
                className={DIALOG_HEADER_STYLES.content}
            >
                {title && (
                    <Typography
                        as={titleAs ?? 'h2'}
                        id={titleProps?.id}
                        fontSize={18}
                        fontWeight={'semibold'}
                        color={vars.color.text.primary}
                        {...titleProps}
                    >
                        {title}
                    </Typography>
                )}
                {description && (
                    <Typography
                        as={'p'}
                        fontSize={14}
                        color={vars.color.surface.mutedForeground}
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
                gap={4}
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
                            icon={CloseIcon}
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
))

DialogHeader.displayName = 'Dialog.Header'

export default DialogHeader
