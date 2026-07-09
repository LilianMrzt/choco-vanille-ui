/** Number of equal columns (repeat(N, 1fr)) or common patterns. */
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none'

/** grid-auto-rows values for the Grid component. */
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'

/** grid-template-rows values for the Grid component. */
export type GridTemplateRows = 'none' | 'auto' | 'min' | 'max' | '1fr' | '0fr'

/** grid-auto-flow values. */
export type GridFlow = 'row' | 'column' | 'dense' | 'row-dense' | 'column-dense'

/** align-items values for the Grid component. */
export type GridAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline'

/** justify-items values for the Grid component. */
export type GridJustifyItems = 'start' | 'end' | 'center' | 'stretch'

/** align-content values for the Grid component. */
export type GridAlignContent = 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around' | 'evenly'

/** justify-content values for the Grid component. */
export type GridJustifyContent = 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around' | 'evenly'
