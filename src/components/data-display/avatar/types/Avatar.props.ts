import type * as React from 'react'

import type { Avatar } from '@base-ui/react/avatar'

import type {
    AvatarColor,
    AvatarShape,
    AvatarSize,
    AvatarStatus,
} from '@components/data-display/avatar/types/Avatar.types.ts'

export type AvatarProps = {
  /** Ref forwarded to the underlying `<span>` element. */
  ref?: React.Ref<HTMLSpanElement>;
  /** The URL of the image to display. */
  src?: string;
  /** Accessible text description of the image. */
  alt?: string;
  /** Initials displayed when the image fails to load or is omitted. */
  initials?: string;
  /** Iconify icon name displayed as a fallback when no initials are provided. */
  icon?: string;
  /** Size variant. Defaults to `md`. */
  size?: AvatarSize;
  /** Shape variant. Defaults to `circle`. */
  shape?: AvatarShape;
  /** Semantic color intent for the fallback background. Defaults to `primary`. */
  color?: AvatarColor;
  /** Optional status indicator rendered at the bottom-right edge. */
  status?: AvatarStatus;
  /** Accessible label describing the status. Defaults to the status value. Use this for i18n. */
  statusLabel?: string;
  /** Size of the status indicator. Defaults to the avatar size. */
  statusSize?: AvatarSize;
  /** Accessible label for the avatar. Use when the avatar represents a user or entity. */
  'aria-label'?: string;
  /** Id of the element that labels the avatar. */
  'aria-labelledby'?: string;
  /** Semantic role for the avatar. Use `button` when the avatar is interactive. */
  role?: React.HTMLAttributes<HTMLSpanElement>['role'];
  /** Delay in milliseconds before showing the fallback. */
  fallbackDelay?: Avatar.Fallback.Props['delay'];
  /** Callback fired when the image loading status changes. */
  onLoadingStatusChange?: Avatar.Image.Props['onLoadingStatusChange'];
  /** Additional CSS class names. */
  className?: string;
  /** Native HTML attributes forwarded to the root element. */
  [key: string]: unknown;
};
