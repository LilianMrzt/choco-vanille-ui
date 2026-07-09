import { type FC } from 'react'

import { Box } from '@components/layout/box'
import type { DrawerBodyProps } from '@components/overlay/drawer/components/drawer-body/types/DrawerBody.props.ts'

/** Main content area of a `Drawer` with uniform padding and overflow handling. */
const DrawerBody: FC<DrawerBodyProps> = ({ as = 'div', padding = 'lg', ...props }) => (
    <Box
        as={as}
        padding={padding}
        overflowY={'auto'}
        {...props}
    />
)

DrawerBody.displayName = 'Drawer.Body'

export default DrawerBody
