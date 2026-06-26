import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { useId, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import {
    radioItemRootClass,
    radioItemWrapperClass,
    radioIndicatorClass,
    radioItemLabelClass,
} from '@components/forms/radio-group/components/radio-item/RadioItem.css.ts'
import type { RadioItemProps } from '@components/forms/radio-group/components/radio-item/types/RadioItem.props.ts'

/**
 * A single radio button inside a `RadioGroup`.
 * Renders a circular indicator that fills with the primary colour when selected.
 *
 * @example
 * ```tsx
 * <RadioItem value="dark" label="Dark mode" />
 * ```
 */
const RadioItem: FC<RadioItemProps> = ({ label, id, className, value, ...props }) => {
    const generatedId = useId()
    const radioId = id ?? (label ? generatedId : undefined)

    return (
        <span className={radioItemWrapperClass}>
            <RadixRadioGroup.Item
                id={radioId}
                value={value}
                className={cn(radioItemRootClass, className)}
                {...props}
            >
                <RadixRadioGroup.Indicator className={radioIndicatorClass}>
                    <Icon
                        icon={'mdi:circle'}
                        size={'xs'}
                    />
                </RadixRadioGroup.Indicator>
            </RadixRadioGroup.Item>

            {label && (
                <Typography
                    as={'label'}
                    variant={'label'}
                    color={'foreground'}
                    htmlFor={radioId}
                    className={radioItemLabelClass}
                >
                    {label}
                </Typography>
            )}
        </span>
    )
}

RadioItem.displayName = 'RadioItem'

export default RadioItem
