import type { ToasterNotificationProps } from '@components/feedback/toaster/components/toaster-notification/types'

/** Content and resolved lifetime of a notification submitted to a viewport. */
export type ShowToasterNotificationOptions = Readonly<Omit<ToasterNotificationProps, 'id' | 'showClose'> & {
    /** Lifetime in milliseconds, or Infinity for persistent notifications. */
    duration: number
}>
