import type { Accordion } from '@base-ui/react/accordion'
import type { CSSProperties } from 'react'

export type AccordionProps = Accordion.Root.Props & {
    /** Overrides the default full-width accordion. */
    width?: CSSProperties['width'];
}
