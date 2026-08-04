import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import type {
    InsetClip,
    InsetPadding,
    InsetSide,
    InsetSpace,
} from '@components/layout/inset/types/Inset.types.ts'

export type InsetProps = Omit<
  BoxProps,
  | 'padding'
  | 'paddingX'
  | 'paddingY'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
> & {
    /** The surrounding-container padding token negated to create the bleed. */
    space: InsetSpace;
    /** The logical side to bleed. Defaults to `all`. */
    side?: InsetSide;
    /** The boundary used to clip overflowing content. Defaults to `border-box`. */
    clip?: InsetClip;
    /** Padding applied to all sides. `current` uses the space token. */
    padding?: InsetPadding;
    /** Padding applied to the inline axis. `current` uses the space token. */
    paddingX?: InsetPadding;
    /** Padding applied to the block axis. `current` uses the space token. */
    paddingY?: InsetPadding;
    /** Padding applied to the block start. `current` uses the space token. */
    paddingTop?: InsetPadding;
    /** Padding applied to the inline end. `current` uses the space token. */
    paddingRight?: InsetPadding;
    /** Padding applied to the block end. `current` uses the space token. */
    paddingBottom?: InsetPadding;
    /** Padding applied to the inline start. `current` uses the space token. */
    paddingLeft?: InsetPadding;
  }
