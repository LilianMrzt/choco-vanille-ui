import { Menu as BaseMenu } from '@base-ui/react/menu'

import type { DropdownMenuTriggerProps } from '@components/overlay/dropdown-menu/components/trigger/types/DropdownMenuTrigger.props.ts'

/**
 * The element that opens the dropdown.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 */
const DropdownMenuTrigger = ({ children, ...props }: DropdownMenuTriggerProps) => (
    <BaseMenu.Trigger
        {...props}
        render={children}
    />
)

DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger'

export default DropdownMenuTrigger
