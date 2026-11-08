import { memo, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { DrawerHeaderProps } from '@components/overlay/drawer/components/blocs/drawer-header/types'

/**
 * Drawer header with a start-aligned row, 12px gap and 12px padding except below.
 * Layout props override defaults; native attributes and ref target the container.
 * @param props - Header content and layout attributes.
 * @param props.as - Container element; defaults to div.
 * @param props.className - Additional container class.
 * @param props.children - Free-form header content.
 * @returns The header container.
 * @example
 * <Drawer.Header flexDirection="column" gap={8}>...</Drawer.Header>
 */
const DrawerHeader: FC<DrawerHeaderProps> = memo(({
    as: Element = 'div',
    className,
    children,
    ...props
}) => {
    return (
        <Flex
            as={Element}
            flexDirection={'row'}
            alignItems={'start'}
            justifyContent={'between'}
            gap={12}
            padding={12}
            paddingBottom={0}
            className={className}
            {...props}
        >
            {children}
        </Flex>
    )
})

DrawerHeader.displayName = 'Drawer.Header'

export default DrawerHeader
