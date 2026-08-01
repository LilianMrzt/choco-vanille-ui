import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import type {
    DrawerColor,
    DrawerSize,
} from '@components/overlay/drawer/types'

/** Props for the inline drawer renderer. */
export type DrawerMiniProps = HTMLAttributes<HTMLDivElement> & {
  /** Current open state. */
  open: boolean;
  /** Width preset. */
  size: DrawerSize;
  /** Maps a size preset to a CSS width value. */
  sizeWidthMap: Record<DrawerSize, string>;
  /** Width applied when the drawer is collapsed. @default '4rem' */
  collapsedWidth?: string;
  /** Theme color token applied to the drawer panel background. */
  backgroundColor?: DrawerColor;
  /** Accessible name used when no visible title is present. */
  accessibleName?: string;
  /** Accessible labelled-by id. */
  ariaLabelledBy?: string;
  /** Drawer content. */
  children?: ReactNode;
  /** Optional inline styles. */
  style?: CSSProperties;
};
