import type { ElementType, ReactElement } from 'react'
import type { Space } from '@theme/tokens/spacing/types/index.ts'
import type {
    INSET_CLIPS,
    INSET_SIDES,
} from '@components/layout/inset/constants'
import type { BoxProps } from '@components/layout/box/types'

/** Semantic spacing tokens supported by the Inset component. */
export type InsetSpace = keyof Space

/** Logical sides that can bleed outside the surrounding container. */
export type InsetSide = (typeof INSET_SIDES)[keyof typeof INSET_SIDES]

/** The boundary to which overflowing content is clipped. */
export type InsetClip = (typeof INSET_CLIPS)[keyof typeof INSET_CLIPS]

/** Padding tokens for preserving space beside bleeding content. */
export type InsetPadding = 'current' | InsetSpace

export type InsetProps<Element extends ElementType = 'div'> = Readonly<
    Omit<
        BoxProps<Element>,
        | 'padding'
        | 'paddingX'
        | 'paddingY'
        | 'paddingTop'
        | 'paddingRight'
        | 'paddingBottom'
        | 'paddingLeft'
    > & {
        /** The surrounding-container padding token negated to create the bleed. */
        space: InsetSpace
        /** The logical side to bleed. Defaults to `all`. */
        side?: InsetSide
        /** The boundary used to clip overflowing content. Defaults to `border-box`. */
        clip?: InsetClip
        /** Padding applied to all sides. `current` uses the space token. */
        padding?: InsetPadding
        /** Padding applied to the inline axis. `current` uses the space token. */
        paddingX?: InsetPadding
        /** Padding applied to the block axis. `current` uses the space token. */
        paddingY?: InsetPadding
        /** Padding applied to the block start. `current` uses the space token. */
        paddingTop?: InsetPadding
        /** Padding applied to the inline end. `current` uses the space token. */
        paddingRight?: InsetPadding
        /** Padding applied to the block end. `current` uses the space token. */
        paddingBottom?: InsetPadding
        /** Padding applied to the inline start. `current` uses the space token. */
        paddingLeft?: InsetPadding
    }
>

/** Polymorphic Inset with a div default. */
export type InsetComponent = {
    <Element extends ElementType>(
        props: InsetProps<Element> & Readonly<{ as: Element }>,
    ): ReactElement
    (props: InsetProps): ReactElement
}
