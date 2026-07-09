import DrawerActionItem from '@components/overlay/drawer/components/items/drawer-action-item/DrawerActionItem.tsx'
import DrawerBody from '@components/overlay/drawer/components/blocs/drawer-body/DrawerBody.tsx'
import DrawerFooter from '@components/overlay/drawer/components/blocs/drawer-footer/DrawerFooter.tsx'
import DrawerHeader from '@components/overlay/drawer/components/blocs/drawer-header/DrawerHeader.tsx'
import DrawerSection from '@components/overlay/drawer/components/blocs/drawer-section/DrawerSection.tsx'
import DrawerInline from '@components/overlay/drawer/components/variants/drawer-inline/DrawerInline.tsx'
import DrawerNavItem from '@components/overlay/drawer/components/items/drawer-nav-item/DrawerNavItem.tsx'
import DrawerPortal from '@components/overlay/drawer/components/variants/drawer-portal/DrawerPortal.tsx'
import DrawerSectionItem from '@components/overlay/drawer/components/items/drawer-section-item/DrawerSectionItem.tsx'
import { DRAWER_MODES, DRAWER_SIZE_WIDTH } from '@components/overlay/drawer/constants'
import { DrawerContext } from '@components/overlay/drawer/context/Drawer.context.ts'
import { useDrawer } from '@components/overlay/drawer/hooks/useDrawer.hook.ts'
import type {
    DrawerCompound,
    DrawerProps,
} from '@components/overlay/drawer/types'

/**
 * A flexible drawer with two render modes: portal and inline.
 *
 * Compose with `Drawer.Header`, `Drawer.Body` and `Drawer.Footer`:
 *
 * @example
 * ```tsx
 * <Drawer open={open} onOpenChange={setOpen} mode="portal">
 *   <Drawer.Header title="Settings" />
 *   <Drawer.Body>
 *     <Drawer.Section title="Navigation">
 *       <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon="lucide:home" />
 *     </Drawer.Section>
 *     <Drawer.Section title="Account">
 *       <Drawer.SectionItem label="Account" startIcon="lucide:user">
 *         <Drawer.NavItem label="Profile" href="/profile" />
 *         <Drawer.ActionItem label="Sign out" startIcon="lucide:log-out" />
 *       </Drawer.SectionItem>
 *     </Drawer.Section>
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
    const { contextValue, handleOpenChange, commonRendererProps } = useDrawer({
        open: controlledOpen,
        defaultOpen,
        onOpenChange,
        mode,
        position,
        size,
        backgroundColor,
        defaultAriaLabel,
        children,
        className,
        style,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        ...props,
    })

    return (
        <DrawerContext.Provider value={contextValue}>
            {mode === DRAWER_MODES.portal ? (
                <DrawerPortal
                    {...commonRendererProps}
                    onOpenChange={handleOpenChange}
                    withBackdrop={withBackdrop}
                />
            ) : (
                <DrawerInline
                    {...commonRendererProps}
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
Drawer.Section = DrawerSection
Drawer.NavItem = DrawerNavItem
Drawer.ActionItem = DrawerActionItem
Drawer.SectionItem = DrawerSectionItem

export { Drawer }
