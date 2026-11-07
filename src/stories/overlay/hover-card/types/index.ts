import type { ComponentProps } from 'react'
import type { HoverCard } from '@components/overlay/hover-card'

/** @internal Storybook-only args; not part of the public package API. */
export type HoverCardStoryArgs = Readonly<Omit<ComponentProps<typeof HoverCard>, 'children'> & {
    triggerLabel: string
    triggerDelay: number
    closeDelay: number
    contentWidth: string
    contentText: string
}>
