import type * as React from 'react'

import type { IconComponent } from '@components/foundation/icon'
import type { FabColor, FabPosition, FabSize } from '@components/actions/fab/types/Fab.types.ts'

type FabContentProps =
  | {
      /** Visible text rendered next to the icon (extended Fab). */
      label: string;
      /** Optional accessible name override. Defaults to the visible `label`. */
      'aria-label'?: string;
    }
  | {
      /** Round, icon-only Fab: no visible label. */
      label?: never;
      /** Accessible name — required when no visible `label` is rendered. */
      'aria-label': string;
    }

export type FabProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'color' | 'aria-label'
> &
  React.RefAttributes<HTMLButtonElement> &
  FabContentProps & {
    /** SVG component describing the primary action. */
    icon: IconComponent;
    /** Theme color of the Fab. Defaults to `primary`. */
    color?: FabColor;
    /** Fab size. Defaults to `md`. */
    size?: FabSize;
    /** Viewport position the Fab is pinned to. Defaults to `bottom-end`. */
    position?: FabPosition;
  };
