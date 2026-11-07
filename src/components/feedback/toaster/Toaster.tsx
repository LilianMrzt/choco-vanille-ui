import type { FC } from 'react'
import { Toaster as SonnerToaster } from 'sonner'

import { TOASTER_STYLES } from '@components/feedback/toaster/Toaster.css.ts'
import { TOASTER_CHANNELS, TOASTER_WIDTH } from '@components/feedback/toaster/constants'
import type { ToasterProps } from '@components/feedback/toaster/types'
import { cn } from '@utils/cn.ts'

const TOAST_OPTIONS = {
    unstyled: true,
    closeButton: false,
    classNames: {
        toast: TOASTER_STYLES.toast,
    },
} as const

/**
 * Displays transient toasts and persistent notifications built from NotificationCard.
 * Prefer ToasterProvider to mount these viewports alongside application content;
 * use Toaster directly for manual mounting, without also mounting a provider.
 * Mount once beside application content, inside the desired theme scope and
 * outside transformed or clipping containers. Viewports render in place and
 * inherit local theme variables without modifying the document.
 * Sonner owns announcements, keyboard navigation, swipe dismissal and timers.
 * Alt+T focuses toasts; Alt+N focuses persistent notifications.
 * Toasts appear at bottom-right without close buttons; notifications appear at
 * top-right with close buttons. Each channel shows up to three stacked messages;
 * remaining messages stay in Sonner's queue. Cards retain their content when
 * collapsed with a 16px stack offset and use an 8px gap when expanded.
 * Both channels support swipe dismissal.
 * @param props - Viewport configuration.
 * @param props.toastPosition - Transient position; defaults to `bottom-right`.
 * @param props.notificationPosition - Persistent position; defaults to `top-right`.
 * @param props.toastLabel - Transient region name; defaults to `Toasts`.
 * @param props.notificationLabel - Persistent region name; defaults to `Notifications`.
 * @param props.className - Additional class on both viewports.
 * @param props.style - Style overrides on both viewports.
 * @returns The two independent notification viewports.
 * @example
 * <><App /><Toaster /></>
 */
const Toaster: FC<ToasterProps> = ({
    toastPosition = 'bottom-right',
    notificationPosition = 'top-right',
    toastLabel = 'Toasts',
    notificationLabel = 'Notifications',
    className,
    style,
}) => {
    const viewportStyle = { '--width': TOASTER_WIDTH, ...style }

    return (
        <>
            <SonnerToaster
                className={cn(TOASTER_STYLES.viewport, className)}
                containerAriaLabel={toastLabel}
                gap={8}
                id={TOASTER_CHANNELS.toasts}
                mobileOffset={16}
                offset={24}
                position={toastPosition}
                style={viewportStyle}
                toastOptions={TOAST_OPTIONS}
                visibleToasts={3}
            />
            <SonnerToaster
                className={cn(TOASTER_STYLES.viewport, className)}
                containerAriaLabel={notificationLabel}
                gap={8}
                hotkey={['altKey', 'KeyN']}
                id={TOASTER_CHANNELS.notifications}
                mobileOffset={16}
                offset={24}
                position={notificationPosition}
                style={viewportStyle}
                toastOptions={TOAST_OPTIONS}
                visibleToasts={3}
            />
        </>
    )
}

Toaster.displayName = 'Toaster'

export default Toaster
