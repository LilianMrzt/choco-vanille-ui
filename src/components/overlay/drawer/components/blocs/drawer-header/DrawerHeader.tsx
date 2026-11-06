import { memo, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { DrawerHeaderProps } from '@components/overlay/drawer/components/blocs/drawer-header/types'

/** Header section of a `Drawer`. Accepts free-form `children`. */
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
