import type { FC } from 'react'

import type DrawerBody from '@components/overlay/drawer/components/drawer-body/DrawerBody.tsx'
import type DrawerFooter from '@components/overlay/drawer/components/drawer-footer/DrawerFooter.tsx'
import type DrawerHeader from '@components/overlay/drawer/components/drawer-header/DrawerHeader.tsx'
import type { DrawerProps } from '@components/overlay/drawer/types/Drawer.props.ts'

export type DrawerCompound = FC<DrawerProps> & {
    Header: typeof DrawerHeader
    Body: typeof DrawerBody
    Footer: typeof DrawerFooter
}

export type { DrawerProps } from '@components/overlay/drawer/types/Drawer.props.ts'
export type { DrawerMode, DrawerPosition, DrawerSize } from '@components/overlay/drawer/types/Drawer.types.ts'
export type { DrawerHeaderProps } from '@components/overlay/drawer/components/drawer-header/types/DrawerHeader.props.ts'
export type { DrawerBodyProps } from '@components/overlay/drawer/components/drawer-body/types/DrawerBody.props.ts'
export type { DrawerFooterProps } from '@components/overlay/drawer/components/drawer-footer/types/DrawerFooter.props.ts'
