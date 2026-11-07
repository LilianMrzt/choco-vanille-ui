import type { CSSProperties } from 'react'
import type { ToasterProps as SonnerToasterProps } from 'sonner'

/** Manual viewport configuration; prefer ToasterProvider for application integration. */
export type ToasterProps = Readonly<{
    /** Transient toast position; defaults to `bottom-right`. */
    toastPosition?: SonnerToasterProps['position']
    /** Persistent notification position; defaults to `top-right`. */
    notificationPosition?: SonnerToasterProps['position']
    /** Accessible transient viewport name; defaults to `Toasts`. */
    toastLabel?: string
    /** Accessible persistent viewport name; defaults to `Notifications`. */
    notificationLabel?: string
    /** Additional class applied to both viewports. */
    className?: string
    /** Style overrides applied to both viewports. */
    style?: CSSProperties
}>
