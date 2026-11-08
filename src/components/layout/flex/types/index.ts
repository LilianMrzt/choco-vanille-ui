import type { ElementType, ReactElement } from 'react'
import type { BoxProps } from '@components/layout/box/types'

/** flex-direction values for the Flex component. */
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'

/** flex-wrap values for the Flex component. */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

/** align-items values for the Flex component. */
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch' | 'baseline'

/** justify-content values for the Flex component. */
export type FlexJustify =
    'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'

export type FlexProps<Element extends ElementType = 'div'> = Readonly<
    Omit<BoxProps<Element>, 'display'> & {
        /** Renders the flex container as `inline-flex` instead of `flex`. */
        inline?: boolean
    }
>

/** Polymorphic Flex with a div default. */
export type FlexComponent = {
    <Element extends ElementType>(
        props: FlexProps<Element> & Readonly<{ as: Element }>,
    ): ReactElement
    (props: FlexProps): ReactElement
}
