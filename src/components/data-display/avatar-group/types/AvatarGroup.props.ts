import type * as React from 'react'

import type { BoxProps } from '@components/layout/box'

export type AvatarGroupSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarGroupProps = Omit<BoxProps, 'ref' | 'children'> & {
  /** Ref forwarded to the underlying `<div>` element. */
  ref?: React.Ref<HTMLDivElement>;
  /** Avatar elements to stack. */
  children?: React.ReactNode;
  /** Maximum number of avatars to display before rendering a `+N` overflow indicator. */
  max?: number;
  /** Amount of negative overlap between avatars. Defaults to `md`. */
  spacing?: AvatarGroupSpacing;
  /** Accessible label for the overflow indicator. Receives the hidden count. Defaults to `${count} more`. Use this for i18n. */
  overflowLabel?: (count: number) => string;
};
