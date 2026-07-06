import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_LABEL_STYLES } from '@components/overlay/dropdown-menu/components/label/DropdownMenuLabel.css.ts'
import { Typography } from '@components/foundation/typography'
import type { DropdownMenuLabelProps } from '@components/overlay/dropdown-menu/components/label/types/DropdownMenuLabel.props.ts'

/**
 * A non-interactive section heading. Must be rendered inside a
 * `DropdownMenu.Group` or `DropdownMenu.RadioGroup` so Base UI can provide
 * the required menu context.
 */
const DropdownMenuLabel = ({ className, label, ...props }: DropdownMenuLabelProps) => (
    <BaseMenu.GroupLabel
        className={cn(DROPDOWN_MENU_LABEL_STYLES.root, className)}
        {...props}
    >
        <Typography
            as={'span'}
            variant={'span'}
        >{label}</Typography>
    </BaseMenu.GroupLabel>
)

DropdownMenuLabel.displayName = 'DropdownMenu.Label'

export default DropdownMenuLabel
