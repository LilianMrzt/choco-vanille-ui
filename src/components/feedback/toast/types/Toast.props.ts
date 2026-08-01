import type * as React from 'react'

import type { RefAttributes } from 'react'
import type { ToastRole, ToastVariant } from '@components/feedback/toast/types/Toast.types.ts'

export type ToastProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children' | 'role'
> &
  RefAttributes<HTMLDivElement> &
  {
    /** Visual intent of the toast. Defaults to `info`. */
    variant?: ToastVariant;
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
