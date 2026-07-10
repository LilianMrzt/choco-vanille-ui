import { Select as BaseSelect } from '@base-ui/react/select'
import { memo, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { SELECT_LABEL_STYLES } from '@components/forms/select/components/select-label/styles/SelectLabel.css.ts'

/**
 * Non-interactive section heading inside a `Select.Group`.
 * Maps to Base UI's `Select.GroupLabel`.
 */
const SelectLabel: FC<BaseSelect.GroupLabel.Props> = memo(({ className, children, ...props }) => (
    <BaseSelect.GroupLabel
        className={cn(SELECT_LABEL_STYLES.root, className)}
        {...props}
    >
        <Typography
            as={'span'}
            variant={'span'}
        >
            {children}
        </Typography>
    </BaseSelect.GroupLabel>
))

SelectLabel.displayName = 'Select.Label'

export default SelectLabel
