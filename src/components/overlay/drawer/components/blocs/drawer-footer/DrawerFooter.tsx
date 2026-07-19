import { memo, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { DrawerFooterProps } from '@components/overlay/drawer/components/blocs/drawer-footer/types/DrawerFooter.props.ts'

/** Footer area of a `Drawer` â€” a flex row for action buttons. */
const DrawerFooter: FC<DrawerFooterProps> = memo(({
    as = 'div',
    justifyContent = 'end',
    gap = 'sm',
    padding = 'md',
    paddingTop = 'none',
    ...props
}) => (
    <Flex
        as={as}
        alignItems={'center'}
        justifyContent={justifyContent}
        gap={gap}
        padding={padding}
        paddingTop={paddingTop}
        {...props}
    />
))

DrawerFooter.displayName = 'Drawer.Footer'

export default DrawerFooter
