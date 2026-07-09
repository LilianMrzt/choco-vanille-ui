import { type FC } from 'react'

import { IconButton } from '@components/actions/icon-button'
import { Typography } from '@components/foundation/typography'
import { Flex } from '@components/layout/flex'
import { IconRegistry } from '@constants/icons'
import { useDrawer } from '@components/overlay/drawer/hooks/useDrawer.hook.ts'
import { DRAWER_HEADER_STYLES } from '@components/overlay/drawer/components/blocs/drawer-header/styles/DrawerHeader.css.ts'
import type { DrawerHeaderProps } from '@components/overlay/drawer/components/blocs/drawer-header/types/DrawerHeader.props.ts'

/**
 * Header section of a `Drawer`. Renders an optional title, description and
 * a close button in the trailing corner.
 *
 * `children` can be used for fully custom header content alongside or instead
 * of the `title` / `description` props.
 */
const DrawerHeader: FC<DrawerHeaderProps> = ({
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
}) => {
    const { onOpenChange } = useDrawer()

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
                    className={DRAWER_HEADER_STYLES.content}
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
                    className={DRAWER_HEADER_STYLES.actions}
                >
                    {actions}
                </Flex>
            ) : (
                showCloseButton && (
                    <Flex
                        alignItems={'center'}
                        className={DRAWER_HEADER_STYLES.actions}
                    >
                        <IconButton
                            icon={IconRegistry.close}
                            aria-label={'Close drawer'}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            onClick={() => onOpenChange(false)}
                        />
                    </Flex>
                )
            )}
        </Flex>
    )
}

DrawerHeader.displayName = 'Drawer.Header'

export default DrawerHeader
