import type { IconProps } from '@components/foundation/icon'
import type { ThemeColor } from '@theme/tokens/colors/types/index.ts'

/** Props for the Callout.Icon sub-component. */
export type CalloutIconProps = Omit<IconProps, 'icon' | 'color'> & {
  /** Icon identifier. Defaults to the root Callout variant icon. */
  icon?: IconProps['icon'];
  /** Theme color token. Defaults to the root Callout variant color. */
  color?: ThemeColor;
};
