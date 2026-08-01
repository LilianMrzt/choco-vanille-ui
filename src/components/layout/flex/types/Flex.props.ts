import type { BoxProps } from '@components/layout/box/types/Box.props.ts'

export type FlexProps = Omit<BoxProps, 'display'> & {
  /** Renders the flex container as `inline-flex` instead of `flex`. */
  inline?: boolean;
};
