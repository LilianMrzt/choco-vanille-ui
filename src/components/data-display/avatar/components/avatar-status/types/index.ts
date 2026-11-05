import type {
    AvatarSize,
    AvatarStatus as AvatarStatusType,
} from '@components/data-display/avatar/types'
import type { HTMLAttributes, RefAttributes } from 'react'

/** Avatar.Status presence and native span props; ref targets the status span. */
export type AvatarStatusProps = Readonly<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement> & {
    /** Status indicator variant. Defaults to `online`. */
    status?: AvatarStatusType
    /** Size of the status indicator. Defaults to `md`. */
    size?: AvatarSize
    /** Accessible label describing the status. Defaults to the status value. Explicit native aria-label takes precedence. */
    label?: string
    /** Additional CSS class names. */
    className?: string
}>
