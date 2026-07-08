import type { Avatar } from '@base-ui/react/avatar'

export type AvatarFallbackProps = {
  /** Initials displayed when the image fails to load or is omitted. */
  initials?: string;
  /** Iconify icon name displayed as a fallback when no initials are provided. */
  icon?: string;
  /** Delay in milliseconds before showing the fallback. */
  delay?: Avatar.Fallback.Props['delay'];
  /** Additional CSS class names. */
  className?: string;
  /** Native HTML attributes forwarded to the fallback element. */
  [key: string]: unknown;
};
