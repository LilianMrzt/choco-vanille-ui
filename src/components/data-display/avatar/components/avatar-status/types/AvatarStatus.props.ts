import type {
    AvatarSize,
    AvatarStatus as AvatarStatusType,
} from '@components/data-display/avatar/types/Avatar.types.ts'

export type AvatarStatusProps = {
  /** Status indicator variant. Defaults to `online`. */
  status?: AvatarStatusType;
  /** Size of the status indicator. Defaults to `md`. */
  size?: AvatarSize;
  /** Additional CSS class names. */
  className?: string;
  /** Native HTML attributes forwarded to the status element. */
  [key: string]: unknown;
};
