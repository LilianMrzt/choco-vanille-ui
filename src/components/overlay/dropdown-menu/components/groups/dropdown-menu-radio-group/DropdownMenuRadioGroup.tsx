import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import type { DropdownMenuRadioGroupProps } from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-radio-group/types/DropdownMenuRadioGroup.props.ts'

/**
 * Groups radio items so only one can be selected at a time.
 * Use `value` and `onValueChange` for controlled behaviour.
 */
const DropdownMenuRadioGroup = (props: DropdownMenuRadioGroupProps) => (
    <RadixDropdownMenu.RadioGroup {...props} />
)

DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup'

export default DropdownMenuRadioGroup
