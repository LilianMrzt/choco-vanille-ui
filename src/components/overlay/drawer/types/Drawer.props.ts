import type { HTMLAttributes, ReactNode } from 'react'

import type { DrawerRecipeVariants } from '@components/overlay/drawer/styles/Drawer.css.ts'
import type { DrawerMode, DrawerPosition, DrawerSize } from '@components/overlay/drawer/types/Drawer.types.ts'

/** Props for the root `Drawer` component. */
export type DrawerProps = HTMLAttributes<HTMLDivElement> & {
    /** Controlled open state. */
    open?: boolean
    /** Initial open state when uncontrolled. @default false */
    defaultOpen?: boolean
    /** Called when the open state changes. */
    onOpenChange?: (open: boolean) => void
    /** Render mode. @default 'portal' */
    mode?: DrawerMode
    /** Side the drawer attaches to. @default 'left' */
    position?: DrawerPosition
    /** Width preset. @default 'md' */
    size?: DrawerSize
    /** Whether to render the backdrop in `portal` mode. @default true */
    withBackdrop?: boolean
    /** Width applied when the drawer is collapsed in `mini` mode. @default '4rem' */
    collapsedWidth?: string
    /** Theme color token applied to the drawer panel background. */
    backgroundColor?: DrawerRecipeVariants['backgroundColor']
    /** Accessible name used when no visible title is present. @default 'Drawer' */
    defaultAriaLabel?: string
    /** Drawer content — typically `Drawer.Header`, `Drawer.Body`, `Drawer.Footer`. */
    children?: ReactNode
}
