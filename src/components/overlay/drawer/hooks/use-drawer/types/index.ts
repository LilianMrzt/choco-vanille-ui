import type { DrawerInlineProps } from '@components/overlay/drawer/components/variants/drawer-inline/types'
import type { DrawerMiniProps } from '@components/overlay/drawer/components/variants/drawer-mini/types'
import type { DrawerPortalProps } from '@components/overlay/drawer/components/variants/drawer-portal/types'
import type { DrawerProps } from '@components/overlay/drawer/types'
import type { DrawerContextValue } from '@components/overlay/drawer/context/Drawer.context.ts'

export type UseDrawerParams = DrawerProps

/** Props shared by all drawer renderers. */
export type CommonRendererProps = Pick<
    DrawerPortalProps & DrawerInlineProps & DrawerMiniProps,
    | 'open'
    | 'position'
    | 'size'
    | 'backgroundColor'
    | 'accessibleName'
    | 'ariaLabelledBy'
    | 'children'
    | 'className'
    | 'style'
> &
    Record<string, unknown>

export type UseDrawerReturn = {
    /** Resolved open state (controlled or internal). */
    isOpen: boolean
    /** Callback to update the open state. */
    handleOpenChange: (nextOpen: boolean) => void
    /** Value provided to `DrawerContext.Provider`. */
    contextValue: DrawerContextValue
    /** Accessible name resolved from aria props. */
    accessibleName: string | undefined
    /** Props shared between all drawer renderers. */
    commonRendererProps: CommonRendererProps
}
