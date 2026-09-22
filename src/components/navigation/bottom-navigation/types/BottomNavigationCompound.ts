import type { FC } from 'react'

import type BottomNavigationItem from '@components/navigation/bottom-navigation/components/bottom-navigation-item/BottomNavigationItem.tsx'
import type BottomNavigationList from '@components/navigation/bottom-navigation/components/bottom-navigation-list/BottomNavigationList.tsx'
import type { BottomNavigationProps } from '@components/navigation/bottom-navigation/types/BottomNavigation.props.ts'

export type BottomNavigationCompound = FC<BottomNavigationProps> & {
  List: typeof BottomNavigationList;
  Item: typeof BottomNavigationItem;
};
