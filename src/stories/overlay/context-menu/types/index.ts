import type { ContextMenuProps } from '@components/overlay/context-menu'

export type ContextMenuStoryArgs = ContextMenuProps & {
    triggerLabel: string
    editLabel: string
    deleteLabel: string
    showDisabledItem: boolean
}
