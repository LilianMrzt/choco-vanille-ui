import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { memo, useCallback, type CSSProperties, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { useViewportShift } from '@hooks'
import { useContextMenuContext } from '@components/overlay/context-menu/context/ContextMenu.context.ts'
import { DROPDOWN_MENU_CONTENT_STYLES } from '@components/overlay/dropdown-menu/components/content/styles/DropdownMenuContent.css.ts'
import { CONTEXT_MENU_CONTENT_STYLES } from '@components/overlay/context-menu/components/content/styles/ContextMenuContent.css.ts'
import type { ContextMenuContentProps } from '@components/overlay/context-menu/components/content/types/ContextMenuContent.props.ts'

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

        if (!node || context?.inputModality !== 'keyboard') {
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
            >
                <BaseContextMenu.Popup
                    ref={setPopupRef}
                    className={cn(
                        DROPDOWN_MENU_CONTENT_STYLES.root,
                        CONTEXT_MENU_CONTENT_STYLES.root,
                        className,
                    )}
                    data-input-modality={context?.inputModality}
                    onKeyDown={(event) => {
                        context?.setInputModality('keyboard')
                        props.onKeyDown?.(event)
                    }}
                    onPointerMove={(event) => {
                        context?.setInputModality('pointer')
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
