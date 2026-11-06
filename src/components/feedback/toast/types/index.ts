import type * as React from 'react'

import type Toast from '@components/feedback/toast/Toast.tsx'
import type { TOAST_VARIANTS } from '@components/feedback/toast/constants'
import type { IconComponent } from '@components/foundation/icon'

/** Visual intent of the toast. */
export type ToastVariant = (typeof TOAST_VARIANTS)[keyof typeof TOAST_VARIANTS]
/** ARIA live-region role, or `none` to omit the role. */
export type ToastRole = 'alert' | 'status' | 'none'

/** Toast content and root attributes. */
export type ToastProps = Readonly<Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'role'> &
    React.RefAttributes<HTMLDivElement> & {
        /** Visual intent; defaults to `info`. */
        variant?: ToastVariant
        /** Optional title content. */
        title?: React.ReactNode
        /** Optional message content. */
        description?: React.ReactNode
        /** SVG icon; defaults to the variant icon. */
        icon?: IconComponent
        /** Live-region role; defaults to `status`. */
        role?: ToastRole
        /** Accessible close label; defaults to `Close notification`. */
        closeLabel?: string
        /** Callback for the convenience close button. */
        onClose?: () => void
        /** Compound content overrides the convenience title, description and close button. */
        children?: React.ReactNode
    }>

/** Props for the Sonner viewport provider. */
export type ToastProviderProps = React.PropsWithChildren
/** Toast root and its compound slots. */
export type ToastCompound = typeof Toast
