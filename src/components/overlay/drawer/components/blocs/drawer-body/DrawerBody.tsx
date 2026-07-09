import { type AriaRole, type FC } from 'react'

import { Box } from '@components/layout/box'
import type { DrawerBodyProps } from '@components/overlay/drawer/components/blocs/drawer-body/types/DrawerBody.props.ts'
import { DRAWER_MODES } from '@components/overlay/drawer/constants'
import { useDrawer } from '@components/overlay/drawer/hooks/useDrawer.hook.ts'

/** Main content area of a `Drawer` with uniform padding and overflow handling. */
const DrawerBody: FC<DrawerBodyProps> = ({
    as = 'div',
    padding,
    role,
    ...props
}) => {
    const { mode, open } = useDrawer()
    const isMiniCollapsed = mode === DRAWER_MODES.mini && !open
    const resolvedPadding = padding ?? (isMiniCollapsed ? 'xs' : 'lg')
    const implicitRole: AriaRole | undefined =
    as === 'nav' && role === undefined ? 'navigation' : role

    return (
        <Box
            as={as as 'div'}
            padding={resolvedPadding}
            overflowY={'auto'}
            role={implicitRole}
            {...props}
        />
    )
}

DrawerBody.displayName = 'Drawer.Body'

export default DrawerBody
