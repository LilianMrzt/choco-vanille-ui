import { useCallback, useMemo, useState } from 'react'

import { DRAWER_MODES } from '@components/overlay/drawer/constants'
import type { DrawerContextValue } from '@components/overlay/drawer/context/Drawer.context.ts'
import type { DrawerInlineProps } from '@components/overlay/drawer/components/variants/drawer-inline/types/DrawerInline.props.ts'
import type { DrawerPortalProps } from '@components/overlay/drawer/components/variants/drawer-portal/types/DrawerPortal.props.ts'
import type { DrawerProps } from '@components/overlay/drawer/types'

type UseDrawerParams = DrawerProps

/** Props shared by both drawer renderers. */
type CommonRendererProps = Pick<
    DrawerPortalProps & DrawerInlineProps,
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

type UseDrawerReturn = {
    /** Resolved open state (controlled or internal). */
    isOpen: boolean
    /** Callback to update the open state. */
    handleOpenChange: (nextOpen: boolean) => void
    /** Value provided to `DrawerContext.Provider`. */
    contextValue: DrawerContextValue
    /** Accessible name resolved from aria props. */
    accessibleName: string | undefined
    /** Props shared between `DrawerPortal` and `DrawerInline`. */
    commonRendererProps: CommonRendererProps
}

/**
 * Encapsulates the state, context and accessibility logic for the root
 * `Drawer` component.
 */
export const useDrawer = ({
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    mode = DRAWER_MODES.portal,
    position = 'left',
    size = 'md',
    withBackdrop: _withBackdrop,
    backgroundColor,
    defaultAriaLabel = 'Drawer',
    children,
    className,
    style,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
}: UseDrawerParams): UseDrawerReturn => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

    const handleOpenChange = useCallback(
        (nextOpen: boolean) => {
            setInternalOpen(nextOpen)
            onOpenChange?.(nextOpen)
        },
        [onOpenChange],
    )

    const contextValue = useMemo<DrawerContextValue>(
        () => ({
            open: isOpen,
            onOpenChange: handleOpenChange,
            mode,
            position,
            size,
        }),
        [isOpen, handleOpenChange, mode, position, size],
    )

    const accessibleName =
        ariaLabel ?? (ariaLabelledBy ? undefined : defaultAriaLabel)

    const commonRendererProps = {
        open: isOpen,
        position,
        size,
        backgroundColor,
        accessibleName,
        ariaLabelledBy,
        children,
        className,
        style,
        ...props,
    }

    return {
        isOpen,
        handleOpenChange,
        contextValue,
        accessibleName,
        commonRendererProps: commonRendererProps as CommonRendererProps,
    }
}
