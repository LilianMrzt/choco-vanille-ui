import type { FC } from 'react'

import Toaster from '@components/feedback/toaster/Toaster'
import type { ToasterProviderProps } from '@components/feedback/toaster-provider/types'

/**
 * Mounts both notification channels alongside application content.
 * Wrap the application once inside its theme scope, outside transformed or
 * clipping containers. Viewports render in place and inherit the local theme.
 * Descendants can use useToast and useNotification without additional setup.
 * Toasts default to bottom-right for 5 seconds without a close button;
 * notifications default to top-right and persist until dismissed.
 * Each channel displays up to three messages with Sonner's native queue.
 * Do not also mount Toaster for the same application.
 * @param props - Application content and shared viewport configuration.
 * @param props.children - Application content rendered without a DOM wrapper.
 * @returns Application content and both notification viewports.
 * @example
 * <ThemeProvider><ToasterProvider><App /></ToasterProvider></ThemeProvider>
 */
const ToasterProvider: FC<ToasterProviderProps> = ({ children, ...props }) => (
    <>
        {children}
        <Toaster {...props} />
    </>
)

export default ToasterProvider
