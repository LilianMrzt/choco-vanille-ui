import type { TooltipProps } from '@components/overlay/tooltip'

/** @internal Storybook-only args; not part of the public package API. */
export type TooltipStoryArgs = Readonly<Omit<TooltipProps, 'content'> & {
    triggerLabel: string
    content: string
}>
