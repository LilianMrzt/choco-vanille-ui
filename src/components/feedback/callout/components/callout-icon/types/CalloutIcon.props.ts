import type { IconProps } from '@components/foundation/icon'

/** Props for the Callout.Icon sub-component. */
export type CalloutIconProps = Omit<IconProps, 'icon' | 'color'> & {
  /** Icon identifier. Defaults to the root Callout variant icon. */
  icon?: IconProps['icon'];
  /** CSS color or variable reference. Defaults to the root Callout variant color. */
  color?: IconProps['color'];
};
