import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC, useEffect } from 'react'

import { IconButton } from '@components/actions/icon-button'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import type { PanelHeaderProps } from '@components/overlay/panel/components/panel-header/types/PanelHeader.props.ts'
import { PANEL_HEADER_STYLES } from '@components/overlay/panel/components/panel-header/styles/PanelHeader.css.ts'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import { usePanelContext } from '@components/overlay/panel/context/Panel.context.ts'

/**
 * Panel heading area with an optional `title`, `description`, custom
 * `actions`, and an auto-rendered close button. Actions are arranged before
 * the close button in the trailing row. Registers the title
 * presence with `Panel` context so `Panel.Content` can set
 * `aria-labelledby` automatically.
 */
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
                        className={PANEL_HEADER_STYLES.content}
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
                                        width={'100%'}
                                        ellipsis={true}
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
                                        fontSize={'sm'}
                                        color={'mutedForeground'}
                                        width={'100%'}
                                        ellipsis={true}
                                        {...descriptionProps}
                                    >
                                        {description}
                                    </Typography>
                                }
                            />
                        )}
                    </Flex>
                )}
                {children}
                {(actions || showCloseButton) && (
                    <Flex
                        alignItems={'center'}
                        gap={'xs'}
                        className={PANEL_HEADER_STYLES.actions}
                    >
                        {actions}
                        {showCloseButton && (
                            <BaseDialog.Close
                                render={
                                    <IconButton
                                        icon={CloseIcon}
                                        aria-label={closeLabel}
                                        variant={'ghost'}
                                        color={'primary'}
                                        size={'sm'}
                                    />
                                }
                            />
                        )}
                    </Flex>
                )}
            </Flex>
        )
    },
)

PanelHeader.displayName = 'Panel.Header'

export default PanelHeader
