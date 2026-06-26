import { cn } from '@utils/cn.ts'
import { dropdownMenuShortcutClass } from '@components/overlay/dropdown-menu/DropdownMenu.css.ts'
import type { DropdownMenuShortcutProps } from '@components/overlay/dropdown-menu/components/shortcut/dropdown-menu-shortcut/types/DropdownMenuShortcut.props.ts'

/**
 * Displays a keyboard shortcut hint aligned to the right of an item.
 * Automatically aria-hidden — purely decorative.
 */
const DropdownMenuShortcut = ({ className, ...props }: DropdownMenuShortcutProps) => (
    <span
        className={cn(dropdownMenuShortcutClass, className)}
        aria-hidden
        {...props}
    />
)

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export default DropdownMenuShortcut
