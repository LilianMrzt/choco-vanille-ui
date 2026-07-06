import { createContext } from 'react'

import type { ToastVariant } from '@components/feedback/toast/types/Toast.types.ts'

export interface ToastContextValue {
  variant: ToastVariant;
}

export const ToastContext = createContext<ToastContextValue>({
    variant: 'info',
})
