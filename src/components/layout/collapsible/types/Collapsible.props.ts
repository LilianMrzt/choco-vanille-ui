import type { Collapsible } from '@base-ui/react/collapsible'
import type { CSSProperties } from 'react'

export type CollapsibleProps = Collapsible.Root.Props & {
    /** Overrides the default full-width collapsible. */
    width?: CSSProperties['width'];
}
