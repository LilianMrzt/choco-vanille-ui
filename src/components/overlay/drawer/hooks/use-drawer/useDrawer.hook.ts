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
    titleId,
    ...props
}: UseDrawerParams & {
    /** Id of the header title used as the default aria-labelledby. */
    titleId?: string
}): UseDrawerReturn => {
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
            titleId,
            collapsedWidth: 'collapsedWidth' in props && typeof props.collapsedWidth === 'string'
                ? props.collapsedWidth
                : undefined,
        }),
        [isOpen, handleOpenChange, mode, position, size, titleId, props],
    )

    const resolvedAriaLabelledBy = ariaLabel ? undefined : (ariaLabelledBy ?? titleId)
    const accessibleName =
        ariaLabel ?? (resolvedAriaLabelledBy ? undefined : defaultAriaLabel)

    const commonRendererProps = {
        open: isOpen,
        position,
        size,
        backgroundColor,
        accessibleName,
        ariaLabelledBy: resolvedAriaLabelledBy,
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
