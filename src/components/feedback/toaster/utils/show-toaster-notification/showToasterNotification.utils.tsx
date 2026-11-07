import { toast } from 'sonner'

import ToasterNotification from '@components/feedback/toaster/components/toaster-notification/ToasterNotification.tsx'
import { TOASTER_CHANNELS } from '@components/feedback/toaster/constants'
import type { ShowToasterNotificationOptions } from '@components/feedback/toaster/utils/show-toaster-notification/types'

/**
 * Submits a compound notification to one of the Toaster's independent channels.
 * @param channel - Target viewport.
 * @param options - Content and lifetime, with Infinity for persistent messages.
 * @param options.duration - Resolved lifetime in milliseconds.
 * @returns The identifier usable with the hook's dismiss method.
 * @example
 * showToasterNotification('toasts', { title: 'Saved', duration: 5000 })
 */
export const showToasterNotification = (
    channel: keyof typeof TOASTER_CHANNELS,
    { duration, ...content }: ShowToasterNotificationOptions,
): number | string => toast.custom(
    (id) => (
        <ToasterNotification
            id={id}
            showClose={channel === 'notifications'}
            {...content}
        />
    ),
    { dismissible: true, duration, toasterId: TOASTER_CHANNELS[channel] },
)
