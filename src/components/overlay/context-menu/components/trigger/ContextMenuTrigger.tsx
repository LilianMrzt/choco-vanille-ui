import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'
import { memo, type FC } from 'react'

import { useContextMenuContext } from '@components/overlay/context-menu/context/ContextMenu.context.ts'
import type { ContextMenuTriggerProps } from '@components/overlay/context-menu/components/trigger/types'

/**
 * Makes a child a keyboard-accessible context menu trigger.
 * @param props - Trigger attributes and child element.
 * @param props.children - Element receiving trigger behavior.
 * @param props.tabIndex - Keyboard tab order; defaults to 0.
 * @param props.onPointerDown - Pointer handler.
 * @param props.onKeyDown - Keyboard handler.
 * @returns The trigger element.
 * @example
 * <ContextMenu.Trigger><div>Open menu</div></ContextMenu.Trigger>
 */
const ContextMenuTrigger: FC<ContextMenuTriggerProps> = memo(({
    children,
    tabIndex = 0,
    onPointerDown,
    onKeyDown,
    ...props
}) => {
    const context = useContextMenuContext()

    const handlePointerDown: NonNullable<ContextMenuTriggerProps['onPointerDown']> = (event) => {
        context.setInputModality('pointer')
        onPointerDown?.(event)
    }

    const handleKeyDown: NonNullable<ContextMenuTriggerProps['onKeyDown']> = (event) => {
        if (event.key === 'F10' || event.key === 'ContextMenu') {
            context.setInputModality('keyboard')
        }
        onKeyDown?.(event)
    }

    return (
        <BaseContextMenu.Trigger
            {...props}
            aria-haspopup={'menu'}
            tabIndex={tabIndex}
            onPointerDown={handlePointerDown}
            onKeyDown={handleKeyDown}
            render={children}
        />
    )
})

ContextMenuTrigger.displayName = 'ContextMenu.Trigger'

export default ContextMenuTrigger
