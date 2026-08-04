import type { ContextMenu } from '@base-ui/react/context-menu'
import type { ReactElement } from 'react'

export type ContextMenuTriggerProps = Omit<
    ContextMenu.Trigger.Props,
    'aria-haspopup' | 'render' | 'children'
> & {
    children: ReactElement
}
