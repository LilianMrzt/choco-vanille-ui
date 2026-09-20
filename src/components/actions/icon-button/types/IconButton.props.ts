import type * as React from 'react'
import type { IconComponent } from '@components/foundation/icon'
import type { ButtonLayoutProps } from '@components/actions/_shared/buttons/types'

import type {
    IconButtonColor,
    IconButtonSize,
    IconButtonVariant,
} from '@components/actions/icon-button/types/IconButton.types.ts'

export type IconButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label' | 'color'
> &
  (
    | {
        /** SVG component rendered inside the button. */
        icon: IconComponent
        children?: never
      }
    | {
        icon?: never
        /** Custom icon content rendered inside the button. */
        children: React.ReactNode
      }
  ) & {
    variant?: IconButtonVariant
    color?: IconButtonColor
    /** Button size. Defaults to `md`. */
    size?: IconButtonSize
    /** Ref forwarded to the underlying `<button>` element. */
    ref?: React.Ref<HTMLButtonElement>;
    /** Accessible label for the button (used as aria-label). */
    'aria-label': string;
    /** Whether the button is in an active/pressed state, e.g. when it triggers an open menu. */
    active?: boolean;
  } &
  ButtonLayoutProps;
