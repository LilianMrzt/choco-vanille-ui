import type * as React from 'react'

import type { BadgeColor } from '@components/data-display/badge'
import type { BoxProps } from '@components/layout/box'
import type {
    StatusBadgePosition,
    StatusBadgeSize,
} from '@components/data-display/status-badge/types/StatusBadge.types.ts'

export type StatusBadgeProps = Omit<
  BoxProps,
  'as' | 'children' | 'position' | 'ref'
> & {
  /** The single component displayed beneath the indicator. */
  children: React.ReactElement;
  /** Color intent for the indicator, matching Badge colors. Defaults to `primary`. */
  color?: BadgeColor;
  /** Corner where the indicator is placed. Defaults to `top-right`. */
  position?: StatusBadgePosition;
  /** Size of the indicator. Defaults to `md`. */
  size?: StatusBadgeSize;
  /** Optional number rendered inside the indicator. */
  number?: number;
  /** Accessible label for the indicator. Numbered indicators use their number when omitted. */
  label?: string;
  /** Ref forwarded to the underlying `<span>` wrapper. */
  ref?: React.Ref<HTMLSpanElement>;
};
