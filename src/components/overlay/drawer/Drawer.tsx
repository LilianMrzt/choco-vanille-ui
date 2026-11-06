import DrawerActionItem from '@components/overlay/drawer/components/items/drawer-action-item/DrawerActionItem.tsx'
import DrawerBody from '@components/overlay/drawer/components/blocs/drawer-body/DrawerBody.tsx'
import DrawerFooter from '@components/overlay/drawer/components/blocs/drawer-footer/DrawerFooter.tsx'
import DrawerHeader from '@components/overlay/drawer/components/blocs/drawer-header/DrawerHeader.tsx'
import DrawerInline from '@components/overlay/drawer/components/variants/drawer-inline/DrawerInline.tsx'
import DrawerMini from '@components/overlay/drawer/components/variants/drawer-mini/DrawerMini.tsx'
import DrawerNavItem from '@components/overlay/drawer/components/items/drawer-nav-item/DrawerNavItem.tsx'
import DrawerPortal from '@components/overlay/drawer/components/variants/drawer-portal/DrawerPortal.tsx'
import DrawerSection from '@components/overlay/drawer/components/blocs/drawer-section/DrawerSection.tsx'
import DrawerSectionItem from '@components/overlay/drawer/components/items/drawer-section-item/DrawerSectionItem.tsx'
import { DRAWER_MODES, DRAWER_SIZE_WIDTH } from '@components/overlay/drawer/constants'
import { DrawerContext } from '@components/overlay/drawer/context/Drawer.context.ts'
import { useDrawer } from '@components/overlay/drawer/hooks/use-drawer/useDrawer.hook.ts'
import type { DrawerProps } from '@components/overlay/drawer/types'
import { memo, useId } from 'react'

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
 *     <Drawer.Section title="Navigation">
 *       <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon={HomeIcon} />
 *     </Drawer.Section>
 *     <Drawer.Section title="Account">
 *       <Drawer.SectionItem label="Account" startIcon={UserIcon}>
 *         <Drawer.NavItem label="Profile" href="/profile" startIcon={UserIcon} />
 *         <Drawer.ActionItem label="Sign out" startIcon={ExitIcon} />
 *       </Drawer.SectionItem>
 *     </Drawer.Section>
 *   </Drawer.Body>
 *   <Drawer.Footer>
 *     <Button label="Close" onClick={() => setOpen(false)} />
 *   </Drawer.Footer>
 * </Drawer>
 * ```
 * @param props - Drawer attributes and composition.
 * @param props.open - Controlled open state.
 * @param props.defaultOpen - Initial uncontrolled state; defaults to false.
 * @param props.onOpenChange - Receives the requested open state.
 * @param props.mode - Rendering mode; defaults to portal.
 * @param props.position - Attachment side; defaults to left.
 * @param props.size - Width preset; defaults to md.
 * @param props.withBackdrop - Shows the portal backdrop; defaults to true.
 * @param props.collapsedWidth - Mini-mode collapsed width; defaults to 4rem.
 * @param props.backgroundColor - Panel background theme token.
 * @param props.defaultAriaLabel - Fallback accessible name; defaults to Drawer.
 * @param props.children - Drawer slots.
 * @param props.className - Additional panel class.
 * @param props.style - Additional panel styles.
 * @param props["aria-label"] - Explicit accessible name.
 * @param props["aria-labelledby"] - ID of an accessible label.
 * @returns The drawer.
 */
const DrawerRoot = memo<DrawerProps>(({
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    mode = DRAWER_MODES.portal,
    position = 'left',
    size = 'md',
    withBackdrop = true,
    collapsedWidth,
    backgroundColor,
    defaultAriaLabel = 'Drawer',
    children,
    className,
    style,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
}) => {
    const generatedTitleId = useId()

    const { contextValue, handleOpenChange, commonRendererProps } = useDrawer({
        open: controlledOpen,
        defaultOpen,
        onOpenChange,
        mode,
        position,
        size,
        withBackdrop,
        collapsedWidth,
        backgroundColor,
        defaultAriaLabel,
        children,
        className,
        style,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        titleId: generatedTitleId,
        ...props,
    })

    const renderer = (() => {
        if (mode === DRAWER_MODES.portal) {
            return (
                <DrawerPortal
                    {...commonRendererProps}
                    onOpenChange={handleOpenChange}
                    withBackdrop={withBackdrop}
                />
            )
        }

        if (mode === DRAWER_MODES.mini) {
            return (
                <DrawerMini
                    {...commonRendererProps}
                    sizeWidthMap={DRAWER_SIZE_WIDTH}
                    collapsedWidth={collapsedWidth}
                />
            )
        }

        return (
            <DrawerInline
                {...commonRendererProps}
                sizeWidthMap={DRAWER_SIZE_WIDTH}
            />
        )
    })()

    return (
        <DrawerContext.Provider value={contextValue}>
            {renderer}
        </DrawerContext.Provider>
    )
})

DrawerRoot.displayName = 'Drawer'

/** Drawer root with navigation and layout slots. */
const Drawer = Object.assign(DrawerRoot, {
    Header: DrawerHeader,
    Body: DrawerBody,
    Footer: DrawerFooter,
    Section: DrawerSection,
    NavItem: DrawerNavItem,
    ActionItem: DrawerActionItem,
    SectionItem: DrawerSectionItem,
})

export default Drawer
