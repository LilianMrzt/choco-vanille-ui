import type { Avatar } from '@base-ui/react/avatar'
import type { HTMLAttributes, RefAttributes } from 'react'

import type { AvatarSize } from '@components/data-display/avatar/types'
import type { IconifyIcon } from '@components/foundation/icon'

/** Avatar.Fallback content and native span props; ref targets the visible fallback. */
export type AvatarFallbackProps = Readonly<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement> & {
    /** Initials uppercased and limited to two characters when fallback content is generated. */
    initials?: string
    /** local Iconify data displayed when initials are absent or empty; defaults to a decorative user icon. */
    icon?: IconifyIcon
    /** Size variant used to scale generated initials. Defaults to `md`. */
    size?: AvatarSize
    /** Delay in milliseconds before showing the fallback. Defaults to zero. */
    delay?: Avatar.Fallback.Props['delay']
    /** Overrides generated initials/icon content when non-nullish; custom content is not truncated or hidden. */
    children?: HTMLAttributes<HTMLSpanElement>['children']
    /** Additional CSS class names. */
    className?: string
}>
