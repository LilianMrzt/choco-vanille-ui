import type * as React from 'react'
import type { IconifyIcon } from '@components/foundation/icon'
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
        /** local Iconify data rendered inside the button. */
        icon: IconifyIcon
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
    /** Square size at a 16px root: xs 24px, sm 28px, md 36px, lg 44px. Defaults to `md`. Prefer lg for touch. */
    size?: IconButtonSize
    /** Ref forwarded to the underlying `<button>` element. */
    ref?: React.Ref<HTMLButtonElement>;
    /** Accessible label for the button (used as aria-label). */
    'aria-label': string;
    /** Whether the button is in an active/pressed state, e.g. when it triggers an open menu. */
    active?: boolean;
  } &
  ButtonLayoutProps;
