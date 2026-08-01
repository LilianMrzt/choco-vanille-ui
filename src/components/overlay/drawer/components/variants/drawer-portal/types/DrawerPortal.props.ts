import type { HTMLAttributes, ReactNode } from 'react'

import type {
    DrawerColor,
    DrawerPosition,
    DrawerSize,
} from '@components/overlay/drawer/types'

/** Props for the portal drawer renderer. */
export type DrawerPortalProps = HTMLAttributes<HTMLDivElement> & {
  /** Current open state. */
  open: boolean;
  /** Called when the open state changes. */
  onOpenChange: (open: boolean) => void;
  /** Side the drawer attaches to. */
  position: DrawerPosition;
  /** Width preset. */
  size: DrawerSize;
  /** Whether to render the backdrop. @default true */
  withBackdrop?: boolean;
  /** Theme color token applied to the drawer panel background. */
  backgroundColor?: DrawerColor;
  /** Accessible name used when no visible title is present. */
  accessibleName: string | undefined;
  /** Accessible labelled-by id. */
  ariaLabelledBy: string | undefined;
  /** Drawer content. */
  children?: ReactNode;
};
