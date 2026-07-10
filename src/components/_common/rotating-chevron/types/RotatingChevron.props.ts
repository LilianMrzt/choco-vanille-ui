import type { IconProps } from '@components/foundation/icon'

export type RotatingChevronProps = Omit<IconProps, 'icon'> & {
    /** Whether the chevron is rotated (pointing up). */
    expanded?: boolean
}
