import type { ReactElement, ReactNode } from 'react'
import type { DrawerSectionTitleProps } from '@components/overlay/drawer/components/blocs/drawer-section-title/types'

/** Direct title slot and remaining section content, preserving fragment structure. */
export type DrawerSectionChildren = Readonly<{
    title?: ReactElement<DrawerSectionTitleProps>
    content: ReactNode
}>
