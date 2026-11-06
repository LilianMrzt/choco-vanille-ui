import type * as React from 'react'
import type BottomNavigation from '@components/navigation/bottom-navigation/BottomNavigation.tsx'

/** Navigation landmark and its slots. */
export type BottomNavigationCompound = typeof BottomNavigation

export type BottomNavigationProps = Readonly<Omit<
  React.HTMLAttributes<HTMLElement>,
  'aria-label' | 'children'
> &
  React.RefAttributes<HTMLElement> & {
    /** Accessible name for the bottom navigation landmark. */
    'aria-label': string;
    /** The `BottomNavigation.List` containing the navigation items. */
    children: React.ReactNode;
    /** The selected item value in controlled mode. */
    value?: string;
    /** The initially selected item value in uncontrolled mode. */
    defaultValue?: string;
    /** Called when an enabled item is selected. */
    onValueChange?: (value: string) => void;
    /** Adds a theme-colored border to the top edge. */
    bordered?: boolean;
  }>
