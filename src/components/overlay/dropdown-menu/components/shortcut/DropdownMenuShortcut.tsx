import { cn } from '@utils/cn.ts'
import { Flex } from '@components/layout/flex'
import { DROPDOWN_MENU_SHORTCUT_STYLES } from '@components/overlay/dropdown-menu/components/shortcut/DropdownMenuShortcut.css.ts'
import type { DropdownMenuShortcutProps } from '@components/overlay/dropdown-menu/components/shortcut/types'
import { memo, type FC } from 'react'

/**
 * Displays a keyboard shortcut hint aligned to the right of an item.
 * Automatically aria-hidden — purely decorative.
 */
const DropdownMenuShortcut: FC<DropdownMenuShortcutProps> = memo(({ className, ...props }) => (
    <Flex
        as={'span'}
        inline
        className={cn(DROPDOWN_MENU_SHORTCUT_STYLES.root, className)}
        aria-hidden
        {...props}
    />
))

DropdownMenuShortcut.displayName = 'DropdownMenu.Shortcut'

export default DropdownMenuShortcut
