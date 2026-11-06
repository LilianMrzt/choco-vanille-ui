import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'

import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import RadioItem from '@components/forms/radio-group/components/radio-item/RadioItem.tsx'
import type { RadioGroupCompound } from '@components/forms/radio-group/types'
import type { RadioGroupProps } from '@components/forms/radio-group/types/RadioGroup.props.ts'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { memo, useCallback, useId } from 'react'

/**
 * The root container for a group of `RadioGroup.Item` components.
 * Manages the single-selection state.
 *
 * @example
 * ```tsx
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioGroup.Item value="a" label="Option A" />
 *   <RadioGroup.Item value="b" label="Option B" />
 * </RadioGroup>
 * ```
 */
const RadioGroup = memo<RadioGroupProps>(({ className, children, label, helperText, error, onValueChange, 'aria-labelledby': ariaLabelledBy, 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, ...props }) => {
    const generatedId = useId()
    const labelId = label ? `${generatedId}-label` : undefined
    const helperId = error || helperText ? `${generatedId}-helper` : undefined
    const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(' ') || undefined
    const handleValueChange = useCallback(
        (...args: Parameters<NonNullable<RadioGroupProps['onValueChange']>>) => { onValueChange?.(...args) },
        [onValueChange],
    )

    return (
        <BaseRadioGroup
            className={cn(className)}
            onValueChange={handleValueChange}
            aria-labelledby={ariaLabelledBy ?? labelId}
            aria-describedby={describedBy}
            aria-invalid={error ? true : ariaInvalid}
            {...props}
        >
            <Flex
                flexDirection={'column'}
                gap={8}
                alignItems={'start'}
            >
                {label && <FormLabel id={labelId}>{label}</FormLabel>}
                {children}
                {(error || helperText) && (
                    <HelperText
                        id={helperId}
                        hasError={Boolean(error)}
                    >
                        {error ?? helperText}
                    </HelperText>
                )}
            </Flex>
        </BaseRadioGroup>
    )
}) as unknown as RadioGroupCompound

RadioGroup.displayName = 'RadioGroup'
RadioGroup.Item = RadioItem

export default RadioGroup
