import { useCallback, useMemo, useState } from 'react'

import DrawerActionItem from '@components/overlay/drawer/components/items/drawer-action-item/DrawerActionItem.tsx'
import DrawerBody from '@components/overlay/drawer/components/blocs/drawer-body/DrawerBody.tsx'
import DrawerFooter from '@components/overlay/drawer/components/blocs/drawer-footer/DrawerFooter.tsx'
import DrawerHeader from '@components/overlay/drawer/components/blocs/drawer-header/DrawerHeader.tsx'
import DrawerInline from '@components/overlay/drawer/components/variants/drawer-inline/DrawerInline.tsx'
import DrawerMini from '@components/overlay/drawer/components/variants/drawer-mini/DrawerMini.tsx'
import DrawerNavItem from '@components/overlay/drawer/components/items/drawer-nav-item/DrawerNavItem.tsx'
import DrawerPortal from '@components/overlay/drawer/components/variants/drawer-portal/DrawerPortal.tsx'
import DrawerSectionItem from '@components/overlay/drawer/components/items/drawer-section-item/DrawerSectionItem.tsx'
import {
    DRAWER_MODES,
    DRAWER_SIZE_WIDTH,
} from '@components/overlay/drawer/constants'
import { DrawerContext } from '@components/overlay/drawer/context/Drawer.context.ts'
import type {
    DrawerCompound,
    DrawerProps,
} from '@components/overlay/drawer/types'

/**
 * A flexible drawer with three render modes: portal, inline and mini.
 *
 * Compose with `Drawer.Header`, `Drawer.Body` and `Drawer.Footer`:
 *
 * @example
 * ```tsx
 * <Drawer open={open} onOpenChange={setOpen} mode="portal">
 *   <Drawer.Header title="Settings" />
 *   <Drawer.Body>
 *     <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon="lucide:home" />
 *     <Drawer.SectionItem label="Account" startIcon="lucide:user">
 *       <Drawer.NavItem label="Profile" href="/profile" />
 *       <Drawer.ActionItem label="Sign out" startIcon="lucide:log-out" />
 *     </Drawer.SectionItem>
 *   </Drawer.Body>
 *   <Drawer.Footer>
 *     <Button onClick={() => setOpen(false)}>Close</Button>
 *   </Drawer.Footer>
 * </Drawer>
 * ```
 */
const Drawer = (({
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    mode = DRAWER_MODES.portal,
    position = 'left',
    size = 'md',
    collapsedSize = '4rem',
    withBackdrop = true,
    backgroundColor,
    defaultAriaLabel = 'Drawer',
    children,
    className,
    style,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
}: DrawerProps) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

    const handleOpenChange = useCallback(
        (nextOpen: boolean) => {
            setInternalOpen(nextOpen)
            onOpenChange?.(nextOpen)
        },
        [onOpenChange],
    )

    const contextValue = useMemo(
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

    return (
        <DrawerContext.Provider value={contextValue}>
            {mode === DRAWER_MODES.portal ? (
                <DrawerPortal
                    {...commonRendererProps}
                    onOpenChange={handleOpenChange}
                    withBackdrop={withBackdrop}
                />
            ) : mode === DRAWER_MODES.inline ? (
                <DrawerInline
                    {...commonRendererProps}
                    sizeWidthMap={DRAWER_SIZE_WIDTH}
                />
            ) : (
                <DrawerMini
                    {...commonRendererProps}
                    collapsedSize={collapsedSize ?? '4rem'}
                    sizeWidthMap={DRAWER_SIZE_WIDTH}
                />
            )}
        </DrawerContext.Provider>
    )
}) as DrawerCompound

Drawer.displayName = 'Drawer'
Drawer.Header = DrawerHeader
Drawer.Body = DrawerBody
Drawer.Footer = DrawerFooter
Drawer.NavItem = DrawerNavItem
Drawer.ActionItem = DrawerActionItem
Drawer.SectionItem = DrawerSectionItem

export { Drawer }
