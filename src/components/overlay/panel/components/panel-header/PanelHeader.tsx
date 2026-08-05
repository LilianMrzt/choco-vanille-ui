import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC, useEffect } from 'react'

import { IconButton } from '@components/actions/icon-button'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import type { PanelHeaderProps } from '@components/overlay/panel/components/panel-header/types/PanelHeader.props.ts'
import { IconRegistry } from '@constants/icons'
import { usePanelContext } from '@components/overlay/panel/context/Panel.context.ts'

const PanelHeader: FC<PanelHeaderProps> = memo(
    ({
        as: Element = 'div',
        title,
        titleAs,
        titleProps,
        description,
        descriptionProps,
        actions,
        showCloseButton = true,
        closeLabel = 'Close panel',
        className,
        children,
        ...props
    }) => {
        const { titleId, setHasTitle } = usePanelContext()

        useEffect(() => {
            setHasTitle(Boolean(title))

            return () => setHasTitle(false)
        }, [setHasTitle, title])

        return (
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
                    >
                        {title && (
                            <BaseDialog.Title
                                render={
                                    <Typography
                                        as={titleAs ?? 'h2'}
                                        id={titleId}
                                        fontSize={'lg'}
                                        fontWeight={'semibold'}
                                        color={'foreground'}
                                        {...titleProps}
                                    >
                                        {title}
                                    </Typography>
                                }
                            />
                        )}
                        {description && (
                            <BaseDialog.Description
                                render={
                                    <Typography
                                        as={'p'}
                                        id={descriptionProps?.id}
                                        fontSize={'sm'}
                                        color={'mutedForeground'}
                                    >
                                        {description}
                                    </Typography>
                                }
                            />
                        )}
                    </Flex>
                )}
                {children}
                {actions ??
        (showCloseButton && (
            <BaseDialog.Close
                render={
                    <IconButton
                        icon={IconRegistry.close}
                        aria-label={closeLabel}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                    />
                }
            />
        ))}
            </Flex>
        )
    },
)

PanelHeader.displayName = 'Panel.Header'

export default PanelHeader
