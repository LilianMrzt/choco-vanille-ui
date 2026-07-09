import { type AriaRole, type FC } from 'react'

import { Box } from '@components/layout/box'
import type { DrawerBodyProps } from '@components/overlay/drawer/components/drawer-body/types/DrawerBody.props.ts'

/** Main content area of a `Drawer` with uniform padding and overflow handling. */
const DrawerBody: FC<DrawerBodyProps> = ({ as = 'div', padding = 'lg', role, ...props }) => {
    const implicitRole: AriaRole | undefined = as === 'nav' && role === undefined ? 'navigation' : role

    return (
        <Box
            as={as as 'div'}
            padding={padding}
            overflowY={'auto'}
            role={implicitRole}
            {...props}
        />
    )
}

DrawerBody.displayName = 'Drawer.Body'

export default DrawerBody
