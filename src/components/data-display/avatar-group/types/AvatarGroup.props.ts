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
  /** Whether every avatar in the group should render a ring. Defaults to `true`. */
  ring?: boolean;
};
