import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { useId, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import {
    checkboxRootClass,
    checkboxWrapperClass,
    checkboxIndicatorClass,
    checkboxLabelClass,
} from '@components/forms/checkbox/Checkbox.css.ts'
import type { CheckboxProps } from '@components/forms/checkbox/types/Checkbox.props.ts'

/**
 * A styled checkbox control built on top of `@radix-ui/react-checkbox`.
 *
 * Supports controlled (`checked` + `onCheckedChange`) and uncontrolled
 * (`defaultChecked`) modes, plus an optional inline `label`.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" checked={accepted} onCheckedChange={setAccepted} />
 * ```
 */
const Checkbox: FC<CheckboxProps> = ({ label, id, className, ...props }) => {
    const generatedId = useId()
    const checkboxId = id ?? (label ? generatedId : undefined)

    return (
        <span className={checkboxWrapperClass}>
            <RadixCheckbox.Root
                id={checkboxId}
                className={cn(checkboxRootClass, className)}
                {...props}
            >
                <RadixCheckbox.Indicator className={checkboxIndicatorClass}>
                    <Icon
                        icon={'mdi:check'}
                        size={'xs'}
                    />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>

            {label && (
                <Typography
                    as={'label'}
                    variant={'label'}
                    color={'foreground'}
                    htmlFor={checkboxId}
                    className={checkboxLabelClass}
                >
                    {label}
                </Typography>
            )}
        </span>
    )
}

Checkbox.displayName = 'Checkbox'

export default Checkbox
