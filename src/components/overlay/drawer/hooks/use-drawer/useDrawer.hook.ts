import { useCallback, useMemo, useState } from 'react'

import { DRAWER_MODES } from '@components/overlay/drawer/constants'
import type { DrawerContextValue } from '@components/overlay/drawer/context/Drawer.context.ts'
import type {
    CommonRendererProps,
    UseDrawerParams,
    UseDrawerReturn
} from '@components/overlay/drawer/hooks/use-drawer/types'

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
