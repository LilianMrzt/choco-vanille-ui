import type { IconProps } from '@components/foundation/icon'

/** Props for the Toast.Icon sub-component. */
export type ToastIconProps = Readonly<Omit<IconProps, 'icon' | 'color'> & {
  /** Icon identifier. Defaults to the root Toast variant icon. */
  icon?: IconProps['icon'];
  /** CSS color or variable reference. Defaults to the root Toast variant color. */
  color?: IconProps['color'];
}>
