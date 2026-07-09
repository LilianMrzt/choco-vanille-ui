import type { FC } from 'react'

import type DrawerActionItem from '@components/overlay/drawer/components/items/drawer-action-item/DrawerActionItem.tsx'
import type DrawerBody from '@components/overlay/drawer/components/blocs/drawer-body/DrawerBody.tsx'
import type DrawerFooter from '@components/overlay/drawer/components/blocs/drawer-footer/DrawerFooter.tsx'
import type DrawerHeader from '@components/overlay/drawer/components/blocs/drawer-header/DrawerHeader.tsx'
import type DrawerSection from '@components/overlay/drawer/components/blocs/drawer-section/DrawerSection.tsx'
import type DrawerNavItem from '@components/overlay/drawer/components/items/drawer-nav-item/DrawerNavItem.tsx'
import type DrawerSectionItem from '@components/overlay/drawer/components/items/drawer-section-item/DrawerSectionItem.tsx'
import type { DrawerProps } from '@components/overlay/drawer/types/Drawer.props.ts'

export type DrawerCompound = FC<DrawerProps> & {
  Header: typeof DrawerHeader;
  Body: typeof DrawerBody;
  Footer: typeof DrawerFooter;
  Section: typeof DrawerSection;
  NavItem: typeof DrawerNavItem;
  ActionItem: typeof DrawerActionItem;
  SectionItem: typeof DrawerSectionItem;
};

export type { DrawerProps } from '@components/overlay/drawer/types/Drawer.props.ts'
export type {
    DrawerMode,
    DrawerPosition,
    DrawerSize,
} from '@components/overlay/drawer/types/Drawer.types.ts'
export type { DrawerHeaderProps } from '@components/overlay/drawer/components/blocs/drawer-header/types/DrawerHeader.props.ts'
export type { DrawerBodyProps } from '@components/overlay/drawer/components/blocs/drawer-body/types/DrawerBody.props.ts'
export type { DrawerFooterProps } from '@components/overlay/drawer/components/blocs/drawer-footer/types/DrawerFooter.props.ts'
export type { DrawerSectionProps } from '@components/overlay/drawer/components/blocs/drawer-section/types/DrawerSection.props.ts'
export type { DrawerNavItemProps } from '@components/overlay/drawer/components/items/drawer-nav-item/types/DrawerNavItem.props.ts'
export type { DrawerActionItemProps } from '@components/overlay/drawer/components/items/drawer-action-item/types/DrawerActionItem.props.ts'
export type { DrawerSectionItemProps } from '@components/overlay/drawer/components/items/drawer-section-item/types/DrawerSectionItem.props.ts'
