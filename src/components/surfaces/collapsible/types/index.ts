import type { Collapsible } from '@base-ui/react/collapsible'
import type { CSSProperties } from 'react'

/** Props for the collapsible root and outer width. */
export type CollapsibleProps = Readonly<Collapsible.Root.Props & {
    /** Width of the outer container; defaults to 100%. */
    width?: CSSProperties['width']
}>
