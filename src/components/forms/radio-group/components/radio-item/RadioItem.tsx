import { Radio } from '@base-ui/react/radio'
import { memo, useId, type FC } from 'react'

import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
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
    helperText,
    error,
    id,
    className,
    value,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
}) => {
    const generatedId = useId()
    const labelId = useId()
    const radioId = id ?? (label ? generatedId : undefined)
    const helperId = error || helperText ? `${generatedId}-helper` : undefined
    const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(' ') || undefined

    return (
        <Flex
            as={'span'}
            inline
            flexDirection={'column'}
            gap={4}
            alignItems={'start'}
        >
            <Flex
                as={'span'}
                inline
                gap={8}
                alignItems={'center'}
            >
                <Radio.Root
                    id={radioId}
                    value={value}
                    className={cn(RADIO_ITEM_STYLES.root, className)}
                    aria-labelledby={label ? labelId : undefined}
                    aria-describedby={describedBy}
                    aria-invalid={error ? true : ariaInvalid}
                    {...props}
                >
                    <Radio.Indicator className={RADIO_ITEM_STYLES.indicator}>
                        <span className={RADIO_ITEM_STYLES.dot} />
                    </Radio.Indicator>
                </Radio.Root>

                {label && (
                    <FormLabel
                        id={labelId}
                        className={RADIO_ITEM_STYLES.label}
                    >
                        {label}
                    </FormLabel>
                )}
            </Flex>
            {(error || helperText) && (
                <HelperText
                    id={helperId}
                    hasError={Boolean(error)}
                >
                    {error ?? helperText}
                </HelperText>
            )}
        </Flex>
    )
})

RadioItem.displayName = 'RadioGroup.Item'

export default RadioItem
