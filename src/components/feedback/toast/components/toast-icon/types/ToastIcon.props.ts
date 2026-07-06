import type { IconProps } from '@components/foundation/icon'
import type { ThemeColor } from '@theme'

/** Props for the Toast.Icon sub-component. */
export type ToastIconProps = Omit<IconProps, 'icon' | 'color'> & {
  /** Icon identifier. Defaults to the root Toast variant icon. */
  icon?: IconProps['icon'];
  /** Theme color token. Defaults to the root Toast variant color. */
  color?: ThemeColor;
};
