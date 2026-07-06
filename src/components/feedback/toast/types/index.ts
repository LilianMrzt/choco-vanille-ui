import type { FC } from 'react'

import type ToastClose from '@components/feedback/toast/components/toast-close/ToastClose.tsx'
import type ToastDescription from '@components/feedback/toast/components/toast-description/ToastDescription.tsx'
import type ToastIcon from '@components/feedback/toast/components/toast-icon/ToastIcon.tsx'
import type ToastTitle from '@components/feedback/toast/components/toast-title/ToastTitle.tsx'
import type { ToastProps } from '@components/feedback/toast/types/Toast.props.ts'

export type ToastCompound = FC<ToastProps> & {
  Icon: typeof ToastIcon;
  Title: typeof ToastTitle;
  Description: typeof ToastDescription;
  Close: typeof ToastClose;
};
