import type * as React from 'react'

import type { ToastRecipeVariants } from '@components/feedback/toast/Toast.css.ts'
import type { ToastRole } from '@components/feedback/toast/types/Toast.types.ts'
import type { RefAttributes } from 'react'

export type ToastProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'role'
> &
  RefAttributes<HTMLDivElement> &
  ToastRecipeVariants & {
    /** Optional title rendered in bold above the description. */
    title?: React.ReactNode;
    /** Main message content of the toast. */
    description?: React.ReactNode;
    /** Iconify icon name. Defaults to the variant icon when omitted. */
    icon?: string;
    /** ARIA live-region role. Defaults to `status`. */
    role?: ToastRole;
    /** Accessible label for the close button. Rendered only when `onClose` is provided. */
    closeLabel?: string;
    /** Callback invoked when the close button is pressed. */
    onClose?: () => void;
    /** Content of the toast. Overrides `title`, `description`, `icon`, and `onClose` when provided. */
    children?: React.ReactNode;
  };
