import type { ToastRecipeVariants } from '@components/feedback/toast/styles/Toast.css.ts'

/** Visual intent variants for the Toast component. */
export type ToastVariant = NonNullable<ToastRecipeVariants['variant']>;

/** ARIA live-region role for the Toast component. */
export type ToastRole = 'alert' | 'status' | 'none';
