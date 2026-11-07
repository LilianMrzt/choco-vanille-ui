import type { AccordionProps } from '@components/surfaces/accordion'

/** @internal Storybook-only args; not part of the public package API. */
export type AccordionStoryArgs = Readonly<AccordionProps & {
    firstDisabled?: boolean
    firstStartIcon?: boolean
    firstEndIcon?: boolean
    firstLabel?: string
}>
