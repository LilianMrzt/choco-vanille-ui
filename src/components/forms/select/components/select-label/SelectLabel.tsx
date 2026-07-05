import * as RadixSelect from '@radix-ui/react-select'
import type { FC } from 'react'

import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { SELECT_LABEL_STYLES } from '@components/forms/select/components/select-label/SelectLabel.css.ts'

/**
 * Non-interactive section heading inside the listbox.
 */
const SelectLabel: FC<RadixSelect.SelectLabelProps> = ({ className, children, ...props }) => (
    <RadixSelect.Label
        className={cn(SELECT_LABEL_STYLES.root, className)}
        {...props}
    >
        <Typography
            as={'span'}
            variant={'span'}
        >
            {children}
        </Typography>
    </RadixSelect.Label>
)

SelectLabel.displayName = 'SelectLabel'

export default SelectLabel
