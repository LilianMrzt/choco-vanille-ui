import type { ComponentProps } from 'react'
import type { Popover, PopoverContentProps } from '@components/overlay/popover'

/** @internal Storybook-only args; not part of the public package API. */
export type PopoverStoryArgs = Readonly<Omit<ComponentProps<typeof Popover>, 'children'> & {
    triggerLabel: string
    contentWidth: string
    contentPadding: PopoverContentProps['padding']
    itemLabel: string
    itemDisabled: boolean
    itemDestructive: boolean
    itemCloseOnClick: boolean
}>
