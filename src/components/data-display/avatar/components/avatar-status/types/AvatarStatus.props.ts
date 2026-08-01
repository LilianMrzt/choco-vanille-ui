import type {
    AvatarSize,
    AvatarStatus as AvatarStatusType,
} from '@components/data-display/avatar/types/Avatar.types.ts'
import type { HTMLAttributes } from 'react'

export type AvatarStatusProps = HTMLAttributes<HTMLSpanElement> & {
  /** Status indicator variant. Defaults to `online`. */
  status?: AvatarStatusType;
  /** Size of the status indicator. Defaults to `md`. */
  size?: AvatarSize;
  /** Accessible label describing the status. Defaults to the status value. Use this for i18n. */
  label?: string;
  /** Additional CSS class names. */
  className?: string;
};
