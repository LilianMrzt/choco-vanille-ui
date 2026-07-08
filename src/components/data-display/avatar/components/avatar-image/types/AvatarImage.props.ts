import type { Avatar } from '@base-ui/react/avatar'

export type AvatarImageProps = {
  /** The URL of the image to display. */
  src?: string;
  /** Accessible text description of the image. */
  alt?: string;
  /** Callback fired when the image loading status changes. */
  onLoadingStatusChange?: Avatar.Image.Props['onLoadingStatusChange'];
  /** Additional CSS class names. */
  className?: string;
  /** Native HTML attributes forwarded to the image element. */
  [key: string]: unknown;
};
