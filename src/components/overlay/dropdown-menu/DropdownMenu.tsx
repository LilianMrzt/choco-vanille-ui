import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import type { DropdownMenuProps } from '@components/overlay/dropdown-menu/types/DropdownMenu.props.ts'

/**
 * The root wrapper that manages open/close state.
 * Accepts `open`, `onOpenChange`, `defaultOpen` and `modal` from Radix.
 */
const DropdownMenu = (props: DropdownMenuProps) => (
    <RadixDropdownMenu.Root {...props} />
)

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu