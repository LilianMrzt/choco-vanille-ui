import { Menu as BaseMenu } from '@base-ui/react/menu'
import { forwardRef, memo } from 'react'

import type { DropdownMenuTriggerProps } from '@components/overlay/dropdown-menu/components/trigger/types/DropdownMenuTrigger.props.ts'

/**
 * The element that opens the dropdown.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 */
const DropdownMenuTrigger = memo(
    forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(({ children, ...props }, ref) => (
        <BaseMenu.Trigger
            {...props}
            ref={ref}
            render={children}
        />
    )),
)

DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger'

export default DropdownMenuTrigger
