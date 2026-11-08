import type { ElementType, ReactElement } from 'react'
import type { BoxProps } from '@components/layout/box/types'

/** Props for the card surface, including forwarded Box attributes and ref. */
export type CardProps<Element extends ElementType = 'div'> = Readonly<
    Omit<
        BoxProps<Element>,
        | 'backgroundColor'
        | 'color'
        | 'borderRadius'
        | 'borderWidth'
        | 'borderColor'
        | 'boxShadow'
        | 'overflow'
        | 'borderStyle'
    > & {
        /** CSS background color; the stylesheet uses the surface color by default. */
        backgroundColor?: BoxProps<Element>['backgroundColor']
        /** CSS text color; the stylesheet uses the surface foreground by default. */
        color?: BoxProps<Element>['color']
        /** Radius token. Defaults to 6. */
        borderRadius?: BoxProps<Element>['borderRadius']
        /** Border width. Defaults to 1px. */
        borderWidth?: BoxProps<Element>['borderWidth']
        /** CSS border color; the stylesheet uses the muted border color by default. */
        borderColor?: BoxProps<Element>['borderColor']
        /** Border style. Defaults to solid. */
        borderStyle?: BoxProps<Element>['borderStyle']
        /** Shadow token. Defaults to none. */
        boxShadow?: BoxProps<Element>['boxShadow']
        /** Overflow behavior. Defaults to hidden. */
        overflow?: BoxProps<Element>['overflow']
    }
>

/** Polymorphic Card with a div default. */
export type CardComponent = {
    <Element extends ElementType>(
        props: CardProps<Element> & Readonly<{ as: Element }>,
    ): ReactElement
    (props: CardProps): ReactElement
}
