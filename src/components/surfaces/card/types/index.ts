import type { BoxProps } from '@components/layout/box/types'

/** Props for the card surface, including forwarded Box attributes and ref. */
export type CardProps = Readonly<Omit<BoxProps, 'backgroundColor' | 'color' | 'borderRadius' | 'borderWidth' | 'borderColor' | 'boxShadow' | 'overflow' | 'borderStyle'> & {
    /** CSS background color; the stylesheet uses the surface color by default. */
    backgroundColor?: BoxProps['backgroundColor']
    /** CSS text color; the stylesheet uses the surface foreground by default. */
    color?: BoxProps['color']
    /** Radius token. Defaults to 6. */
    borderRadius?: BoxProps['borderRadius']
    /** Border width. Defaults to 1px. */
    borderWidth?: BoxProps['borderWidth']
    /** CSS border color; the stylesheet uses the main border color by default. */
    borderColor?: BoxProps['borderColor']
    /** Border style. Defaults to solid. */
    borderStyle?: BoxProps['borderStyle']
    /** Shadow token. Defaults to none. */
    boxShadow?: BoxProps['boxShadow']
    /** Overflow behavior. Defaults to hidden. */
    overflow?: BoxProps['overflow']
}>
