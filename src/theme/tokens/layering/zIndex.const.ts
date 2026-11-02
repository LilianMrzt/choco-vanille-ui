/*
 * Stacking order tokens. Theme-agnostic.
 *
 * Centralising z-indexes prevents the "z-index: 99999" arms race and keeps
 * overlay layering predictable across the kit.
 */
export const Z_INDEX = {
    hide: '-1',
    base: '0',
    docked: '10',
    sticky: '100',
    banner: '200',
    overlay: '1100',
    modal: '1200',
    dropdown: '1250',
    popover: '1300',
    toast: '1350',
    tooltip: '1400',
} as const
