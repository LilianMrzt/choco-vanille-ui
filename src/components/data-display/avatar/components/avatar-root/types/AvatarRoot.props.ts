import type * as React from 'react'

import type {
    AvatarColor,
    AvatarShape,
    AvatarSize,
} from '@components/data-display/avatar/types/Avatar.types.ts'

export type AvatarRootProps = {
  /** Ref forwarded to the underlying `<span>` element. */
  ref?: React.Ref<HTMLSpanElement>;
  /** Size variant. Defaults to `md`. */
  size?: AvatarSize;
  /** Shape variant. Defaults to `circle`. */
  shape?: AvatarShape;
  /** Semantic color intent for the fallback background. Defaults to `primary`. */
  color?: AvatarColor;
  /** Whether to render a subtle ring around the avatar. Defaults to `false`. */
  ring?: boolean;
  /** Additional CSS class names. */
  className?: string;
  /** Children (image, fallback, status). */
  children?: React.ReactNode;
  /** Native HTML attributes forwarded to the root element. */
  [key: string]: unknown;
};
