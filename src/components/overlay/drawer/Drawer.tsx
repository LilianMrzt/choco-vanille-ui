import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { useCallback, useMemo, useState } from 'react'

import DrawerBody from '@components/overlay/drawer/components/drawer-body/DrawerBody.tsx'
import DrawerFooter from '@components/overlay/drawer/components/drawer-footer/DrawerFooter.tsx'
import DrawerHeader from '@components/overlay/drawer/components/drawer-header/DrawerHeader.tsx'
import { DRAWER_MODES, DRAWER_SIZE_WIDTH } from '@components/overlay/drawer/constants'
import { DrawerContext } from '@components/overlay/drawer/context/Drawer.context.ts'
import { DRAWER_STYLES } from '@components/overlay/drawer/styles/Drawer.css.ts'
import type { DrawerCompound, DrawerProps } from '@components/overlay/drawer/types'
import { cn } from '@utils/cn.ts'

/**
 * A flexible drawer with three render modes: portal, inline and mini.
 *
 * Compose with `Drawer.Header`, `Drawer.Body` and `Drawer.Footer`:
 *
 * @example
 * ```tsx
 * <Drawer open={open} onOpenChange={setOpen} mode="portal">
 *   <Drawer.Header title="Settings" />
 *   <Drawer.Body>Your content here.</Drawer.Body>
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
    modal = true,
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

    const handleOpenChange = useCallback((nextOpen: boolean) => {
        setInternalOpen(nextOpen)
        onOpenChange?.(nextOpen)
    }, [onOpenChange])

    const contextValue = useMemo(
        () => ({
            open: isOpen,
            onOpenChange: handleOpenChange,
            mode,
            position,
            size,
            collapsedSize: collapsedSize ?? '4rem',
            withBackdrop,
        }),
        [isOpen, handleOpenChange, mode, position, size, collapsedSize, withBackdrop],
    )

    const accessibleName = ariaLabel ?? (ariaLabelledBy ? undefined : defaultAriaLabel)

    const isPortal = mode === DRAWER_MODES.portal
    const isInline = mode === DRAWER_MODES.inline
    const isMini = mode === DRAWER_MODES.mini

    const panelClassName = cn(
        DRAWER_STYLES.panel,
        isPortal && DRAWER_STYLES.portal,
        isPortal && (position === 'right' ? DRAWER_STYLES.portalRight : DRAWER_STYLES.portalLeft),
        isInline && DRAWER_STYLES.inline,
        isInline && (position === 'right' ? DRAWER_STYLES.inlineRight : DRAWER_STYLES.inlineLeft),
        isMini && DRAWER_STYLES.mini,
        isMini && (position === 'right' ? DRAWER_STYLES.miniRight : DRAWER_STYLES.miniLeft),
        DRAWER_STYLES.size[size],
        !isOpen && !isPortal && (isMini ? DRAWER_STYLES.miniClosed : DRAWER_STYLES.inlineClosed),
        className,
    )

    const panelStyle = {
        width: isPortal
            ? undefined
            : isOpen
                ? DRAWER_SIZE_WIDTH[size]
                : isMini
                    ? collapsedSize
                    : 0,
        opacity: isMini && !isOpen ? 1 : undefined,
        ...style,
    }

    return (
        <DrawerContext.Provider value={contextValue}>
            {isPortal ? (
                <BaseDialog.Root
                    open={isOpen}
                    onOpenChange={handleOpenChange}
                    modal={modal}
                >
                    <BaseDialog.Portal>
                        {withBackdrop && (
                            <BaseDialog.Backdrop className={DRAWER_STYLES.backdrop} />
                        )}
                        <BaseDialog.Popup
                            className={panelClassName}
                            style={panelStyle}
                            aria-label={accessibleName}
                            aria-labelledby={ariaLabelledBy}
                            {...props}
                        >
                            {children}
                        </BaseDialog.Popup>
                    </BaseDialog.Portal>
                </BaseDialog.Root>
            ) : (
                <div
                    className={panelClassName}
                    style={panelStyle}
                    aria-label={accessibleName}
                    aria-labelledby={ariaLabelledBy}
                    {...props}
                >
                    {children}
                </div>
            )}
        </DrawerContext.Provider>
    )
}) as DrawerCompound

Drawer.displayName = 'Drawer'
Drawer.Header = DrawerHeader
Drawer.Body = DrawerBody
Drawer.Footer = DrawerFooter

export { Drawer }
