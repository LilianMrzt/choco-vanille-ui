export type TextStyleActionProps = {
    mark: 'bold' | 'italic' | 'underline' | 'strike'
    icon: IconifyIcon
    label: string
    onToggle: () => void
}
import type { IconifyIcon } from '@components/foundation/icon'
