import type { Avatar } from '@base-ui/react/avatar'
import type { HTMLAttributes } from 'react'

import type { AvatarSize } from '@components/data-display/avatar/types/Avatar.types.ts'

export type AvatarFallbackProps = HTMLAttributes<HTMLSpanElement> & {
  /** Initials displayed when the image fails to load or is omitted. */
  initials?: string;
  /** Iconify icon name displayed as a fallback when no initials are provided. */
  icon?: IconComponent;
  /** Size variant used to scale the fallback text. */
  size?: AvatarSize;
  /** Delay in milliseconds before showing the fallback. */
  delay?: Avatar.Fallback.Props['delay'];
  /** Additional CSS class names. */
  className?: string;
};
import type { IconComponent } from '@components/foundation/icon'
