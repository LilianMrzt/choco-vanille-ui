import type { ComponentProps } from 'react'
import type { Drawer, DrawerBodyProps, DrawerHeaderProps, DrawerFooterProps } from '@components/overlay/drawer'
import type { TypographyProps } from '@components/foundation/typography'

export type DrawerPlaygroundArgs = ComponentProps<typeof Drawer> & {
  showHeader?: boolean;
  showFooter?: boolean;
  showNavigation?: boolean;
  showSettings?: boolean;
  headerGap?: DrawerHeaderProps['gap'];
  bodyGap?: DrawerBodyProps['gap'];
  footerGap?: DrawerFooterProps['gap'];
  sectionTitleTransform?: TypographyProps['textTransform'];
  sectionTitleLineHeight?: TypographyProps['lineHeight'];
  navigationTitle?: string;
  settingsTitle?: string;
  firstNavItemLabel?: string;
  secondNavItemLabel?: string;
  thirdNavItemLabel?: string;
  fourthNavItemLabel?: string;
  navItemActive?: boolean;
  navItemDisabled?: boolean;
  navItemHideTooltip?: boolean;
  navItemVariant?: 'default' | 'outlined';
  navItemColor?:
    | 'primary'
    | 'secondary'
    | 'neutral'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info';
  collapsibleLabel?: string;
  collapsibleDefaultExpanded?: boolean;
  collapsibleDisabled?: boolean;
  collapsibleHideTooltip?: boolean;
  collapsibleColor?:
    | 'primary'
    | 'secondary'
    | 'neutral'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info';
  actionItemHideTooltip?: boolean;
};
