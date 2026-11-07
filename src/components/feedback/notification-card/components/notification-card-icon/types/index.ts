import type { IconProps } from '@components/foundation/icon'

/** Props for the NotificationCard.Icon sub-component. */
export type NotificationCardIconProps = Readonly<Omit<IconProps, 'icon' | 'color' | 'size'> & {
    /** SVG size; defaults to `sm` (14px at a 16px root font size). */
    size?: IconProps['size']
    /** Icon identifier. Defaults to the root NotificationCard variant icon. */
    icon?: IconProps['icon']
    /** CSS color or variable reference. Defaults to the root NotificationCard variant color. */
    color?: IconProps['color']
}>
