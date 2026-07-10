import { Radio } from '@base-ui/react/radio'
import { memo, useId, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { Typography } from '@components/foundation/typography'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { RADIO_ITEM_STYLES } from '@components/forms/radio-group/components/radio-item/styles/RadioItem.css.ts'
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
const RadioItem: FC<RadioItemProps> = memo(({
    label,
    id,
    className,
    value,
    ...props
}) => {
    const generatedId = useId()
    const radioId = id ?? (label ? generatedId : undefined)

    return (
        <Flex
            as={'span'}
            inline
            gap={'sm'}
        >
            <Radio.Root
                id={radioId}
                value={value}
                className={cn(RADIO_ITEM_STYLES.root, className)}
                {...props}
            >
                <Radio.Indicator className={RADIO_ITEM_STYLES.indicator}>
                    <Icon
                        icon={IconRegistry.radioIndicator}
                        size={'xs'}
                    />
                </Radio.Indicator>
            </Radio.Root>

            {label && (
                <Typography
                    as={'label'}
                    variant={'label'}
                    color={'foreground'}
                    htmlFor={radioId}
                    className={RADIO_ITEM_STYLES.label}
                >
                    {label}
                </Typography>
            )}
        </Flex>
    )
})

RadioItem.displayName = 'RadioGroup.Item'

export default RadioItem
