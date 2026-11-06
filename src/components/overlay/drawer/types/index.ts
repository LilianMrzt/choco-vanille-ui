import type { HTMLAttributes, ReactNode } from 'react'
import { DRAWER_MODES, DRAWER_POSITIONS, DRAWER_SIZES } from '@components/overlay/drawer/constants'
import type { ThemeColorValue } from '@theme/tokens/colors/types/index.ts'

/** Render mode for the drawer. */
export type DrawerMode = (typeof DRAWER_MODES)[keyof typeof DRAWER_MODES]
/** Side the drawer attaches to. */
export type DrawerPosition = (typeof DRAWER_POSITIONS)[keyof typeof DRAWER_POSITIONS]
/** Predefined drawer width. */
export type DrawerSize = (typeof DRAWER_SIZES)[keyof typeof DRAWER_SIZES]
/** Theme color token used for the panel background. */
export type DrawerColor = ThemeColorValue

/** Props for the drawer root. */
export type DrawerProps = Readonly<HTMLAttributes<HTMLDivElement> & {
    /** Controlled open state. */
    open?: boolean
    /** Initial uncontrolled state. Defaults to false. */
    defaultOpen?: boolean
    /** Called when the open state changes. */
    onOpenChange?: (open: boolean) => void
    /** Render mode. Defaults to portal. */
    mode?: DrawerMode
    /** Attachment side. Defaults to left. */
    position?: DrawerPosition
    /** Width preset. @default 'md' */
    size?: DrawerSize
    /** Shows a backdrop in portal mode. Defaults to true. */
    withBackdrop?: boolean
    /** Collapsed mini width. Defaults to 4rem. */
    collapsedWidth?: string
    /** Theme token for the panel background. */
    backgroundColor?: DrawerColor
    /** Accessible fallback name. Defaults to Drawer. */
    defaultAriaLabel?: string
    /** Drawer slots. */
    children?: ReactNode
}>
