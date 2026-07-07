import type { Accordion } from '@base-ui/react/accordion'
import type { Space } from '@theme/tokens/spacing.ts'

export type AccordionContentProps = Accordion.Panel.Props & {
    /** Bottom padding applied to the panel when open. @default 'md' */
    padding?: keyof Space;
}
