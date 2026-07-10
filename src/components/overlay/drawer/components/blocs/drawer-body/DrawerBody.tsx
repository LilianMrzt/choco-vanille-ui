import { memo, type AriaRole, type FC } from 'react'

import { Box } from '@components/layout/box'
import type { DrawerBodyProps } from '@components/overlay/drawer/components/blocs/drawer-body/types/DrawerBody.props.ts'

/** Main content area of a `Drawer` with uniform padding and overflow handling. */
const DrawerBody: FC<DrawerBodyProps> = memo(({
    as = 'div',
    padding = 'md',
    role,
    ...props
}) => {
    const implicitRole: AriaRole | undefined =
    as === 'nav' && role === undefined ? 'navigation' : role

    return (
        <Box
            as={as as 'div'}
            padding={padding}
            flex={1}
            overflowY={'auto'}
            role={implicitRole}
            {...props}
        />
    )
})

DrawerBody.displayName = 'Drawer.Body'

export default DrawerBody
