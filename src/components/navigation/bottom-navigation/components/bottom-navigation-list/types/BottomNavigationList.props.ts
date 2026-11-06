import type * as React from 'react'

import type { BoxSpace } from '@components/layout/box/types'

export type BottomNavigationListProps = Omit<
  React.HTMLAttributes<HTMLUListElement>,
  'children'
> &
  React.RefAttributes<HTMLUListElement> & {
    /** The `BottomNavigation.Item` elements rendered in the list. */
    children: React.ReactNode;
    /** Width of the item row. Defaults to `100%`. */
    width?: React.CSSProperties['width'];
    /** Maximum width of the item row. Defaults to `32rem`. */
    maxWidth?: React.CSSProperties['maxWidth'];
    /** Spacing token between navigation items. Defaults to `xxs`. */
    gap?: BoxSpace;
  };
