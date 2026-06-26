// Radix parks the panel off-screen at this exact transform while floating-ui
// measures it (before `isPositioned` becomes true). Any correction computed in
// that state would be garbage, so we detect & skip it.
export const OFFSCREEN_SENTINEL = '-200%'
