import type { Avatar } from '@base-ui/react/avatar'
import type { ImgHTMLAttributes, RefAttributes } from 'react'

/** Avatar.Image native image props; ref targets the image when loaded. */
export type AvatarImageProps = Readonly<ImgHTMLAttributes<HTMLImageElement> & RefAttributes<HTMLImageElement> & {
    /** The URL of the image to display. */
    src?: string
    /** Accessible text description of the image. Defaults to an empty decorative alternative. */
    alt?: string
    /** Receives the upstream image loading status (`idle`, `loading`, `loaded`, `error`) unchanged. */
    onLoadingStatusChange?: Avatar.Image.Props['onLoadingStatusChange']
    /** Additional CSS class names. */
    className?: string
}>
