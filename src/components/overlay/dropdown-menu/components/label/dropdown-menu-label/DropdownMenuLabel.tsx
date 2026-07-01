import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_LABEL_STYLES } from '@components/overlay/dropdown-menu/components/label/dropdown-menu-label/DropdownMenuLabel.css.ts'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuLabelProps } from '@components/overlay/dropdown-menu/components/label/dropdown-menu-label/types/DropdownMenuLabel.props.ts'

/**
 * A non-interactive section heading. Pair with `DropdownMenuGroup` for
 * semantic grouping of related items.
 */
const DropdownMenuLabel = ({ className, label, ...props }: DropdownMenuLabelProps) => (
    <RadixDropdownMenu.Label
        className={cn(DROPDOWN_MENU_LABEL_STYLES.root, className)}
        {...props}
    >
        <Typography as={'span'} variant={'span'}>{label}</Typography>
    </RadixDropdownMenu.Label>
)

DropdownMenuLabel.displayName = 'DropdownMenuLabel'

export default DropdownMenuLabel
