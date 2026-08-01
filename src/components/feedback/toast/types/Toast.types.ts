import type { TOAST_VARIANTS } from '@components/feedback/toast/constants/toastVariants.const.ts'

/** Visual intent variants for the Toast component. */
export type ToastVariant =
  (typeof TOAST_VARIANTS)[keyof typeof TOAST_VARIANTS];

/** ARIA live-region role for the Toast component. */
export type ToastRole = 'alert' | 'status' | 'none';
