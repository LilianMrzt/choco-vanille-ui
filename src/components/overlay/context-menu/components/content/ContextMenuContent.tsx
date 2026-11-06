import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { memo, useCallback, type CSSProperties, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { useViewportShift } from '@hooks/use-viewport-shift/useViewportShift.hook.ts'
import { useContextMenuContext } from '@components/overlay/context-menu/context/ContextMenu.context.ts'
import { DROPDOWN_MENU_CONTENT_STYLES } from '@components/overlay/dropdown-menu/components/content/DropdownMenuContent.css.ts'
import { CONTEXT_MENU_CONTENT_STYLES } from '@components/overlay/context-menu/components/content/ContextMenuContent.css.ts'
import type { ContextMenuContentProps } from '@components/overlay/context-menu/components/content/types'

/**
 * Renders the context menu in a document portal at the trigger position.
 * The positioner receives its native props and ref; popup width defaults to 14rem.
 * @param props - Positioner props and popup width.
 * @param props.className - Additional popup class.
 * @param props.sideOffset - Pointer offset in pixels; defaults to 4.
 * @param props.collisionPadding - Viewport edge padding; defaults to 8.
 * @param props.width - Popup width; defaults to 14rem.
 * @param props.style - Popup styles.
 * @returns The portalled menu.
 * @example
 * <ContextMenu.Content><ContextMenu.Item label="Edit" /></ContextMenu.Content>
 */
const ContextMenuContent: FC<ContextMenuContentProps> = memo(({
    className,
    sideOffset = 4,
    collisionPadding = 8,
    width = '14rem',
    style,
    ...props
}) => {
    const contentRef = useViewportShift(collisionPadding)
    const context = useContextMenuContext()
    const setPopupRef = useCallback((node: HTMLDivElement | null) => {
        const cleanupViewportShift = contentRef(node)

        if (!node || context.inputModality !== 'keyboard') {
            return cleanupViewportShift
        }

        const focusFrame = requestAnimationFrame(() => {
            const firstEnabledItem = node.querySelector<HTMLElement>(
                '[role^="menuitem"]:not([aria-disabled="true"])',
            )

            firstEnabledItem?.focus()
        })

        return () => {
            cancelAnimationFrame(focusFrame)
            cleanupViewportShift?.()
        }
    }, [contentRef, context?.inputModality])

    return (
        <BaseContextMenu.Portal>
            <BaseContextMenu.Positioner
                sideOffset={sideOffset}
                collisionAvoidance={{ side: 'none', align: 'none' }}
                {...props}
                className={DROPDOWN_MENU_CONTENT_STYLES.positioner}
            >
                <BaseContextMenu.Popup
                    ref={setPopupRef}
                    className={cn(
                        DROPDOWN_MENU_CONTENT_STYLES.root,
                        CONTEXT_MENU_CONTENT_STYLES.root,
                        className,
                    )}
                    data-input-modality={context.inputModality}
                    onKeyDown={(event) => {
                        context.setInputModality('keyboard')
                        props.onKeyDown?.(event)
                    }}
                    onPointerMove={(event) => {
                        context.setInputModality('pointer')
                        props.onPointerMove?.(event)
                    }}
                    style={{ width, flexGrow: '0', flexShrink: '0', ...style } as CSSProperties}
                >
                    {props.children}
                </BaseContextMenu.Popup>
            </BaseContextMenu.Positioner>
        </BaseContextMenu.Portal>
    )
})

ContextMenuContent.displayName = 'ContextMenu.Content'

export default ContextMenuContent
