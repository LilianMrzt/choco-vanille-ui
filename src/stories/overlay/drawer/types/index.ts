import type { ComponentProps } from 'react'
import type { Drawer } from '@components/overlay/drawer'

export type DrawerPlaygroundArgs = ComponentProps<typeof Drawer> & {
  showHeader?: boolean;
  showFooter?: boolean;
  showNavigation?: boolean;
  showSettings?: boolean;
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
    | 'tertiary'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info';
  sectionItemLabel?: string;
  sectionItemDefaultExpanded?: boolean;
  sectionItemDisabled?: boolean;
  sectionItemHideTooltip?: boolean;
  sectionItemColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info';
  actionItemHideTooltip?: boolean;
};
