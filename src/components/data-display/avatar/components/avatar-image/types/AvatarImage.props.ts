import type { Avatar } from '@base-ui/react/avatar'
import type { ImgHTMLAttributes } from 'react'

export type AvatarImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** The URL of the image to display. */
  src?: string;
  /** Accessible text description of the image. */
  alt?: string;
  /** Callback fired when the image loading status changes. */
  onLoadingStatusChange?: Avatar.Image.Props['onLoadingStatusChange'];
  /** Additional CSS class names. */
  className?: string;
};
