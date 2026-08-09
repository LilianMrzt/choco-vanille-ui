export type TextStyleActionProps = {
    mark: 'bold' | 'italic' | 'underline' | 'strike'
    icon: IconComponent
    label: string
    onToggle: () => void
}
import type { IconComponent } from '@components/foundation/icon'
