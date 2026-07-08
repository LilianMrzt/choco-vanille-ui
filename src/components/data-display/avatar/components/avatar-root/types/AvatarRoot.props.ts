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
  /** Accessible label for the avatar. Use when the avatar represents a user or entity. */
  'aria-label'?: string;
  /** Id of the element that labels the avatar. */
  'aria-labelledby'?: string;
  /** Semantic role for the avatar. Use `button` when the avatar is interactive. */
  role?: React.HTMLAttributes<HTMLSpanElement>['role'];
  /** Additional CSS class names. */
  className?: string;
  /** Children (image, fallback, status). */
  children?: React.ReactNode;
  /** Native HTML attributes forwarded to the root element. */
  [key: string]: unknown;
};
