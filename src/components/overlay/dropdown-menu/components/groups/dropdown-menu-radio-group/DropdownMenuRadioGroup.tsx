import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo, type FC } from 'react'

import { DropdownMenuGroupProvider } from '@components/overlay/dropdown-menu/components/groups/DropdownMenuGroupContext.tsx'
import type { DropdownMenuRadioGroupProps } from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-radio-group/types'

/**
 * Groups radio items so only one can be selected at a time.
 * Use `value` and `onValueChange` for controlled behaviour.
 */
const DropdownMenuRadioGroup: FC<DropdownMenuRadioGroupProps> = memo((props) => (
    <DropdownMenuGroupProvider value={true}>
        <BaseMenu.RadioGroup {...props} />
    </DropdownMenuGroupProvider>
))

DropdownMenuRadioGroup.displayName = 'DropdownMenu.RadioGroup'

export default DropdownMenuRadioGroup
