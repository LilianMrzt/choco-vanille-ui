import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { memo, useId } from 'react'

import { TextFieldLabel } from '@components/forms/text-field/components'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import NumberFieldInput from '@components/forms/number-field/components/number-field-input/NumberFieldInput.tsx'
import { NUMBER_FIELD_STYLES } from '@components/forms/number-field/styles/NumberField.css.ts'
import type { NumberFieldProps } from '@components/forms/number-field/types'
import { Flex } from '@components/layout/flex'

/**
 * A numeric field with keyboard and button increments, min/max constraints and
 * the same label, helper and error API as TextField.
 */
const NumberField = memo<NumberFieldProps>((props) => {
    const {
        id,
        label,
        helperText,
        error,
        width,
        size: sizeProp = 'md',
        fontSize = 'md',
        className,
        disabled,
        required,
        readOnly,
        name,
        form,
        min,
        max,
        step,
        smallStep,
        largeStep,
        allowOutOfRange,
        allowWheelScrub,
        snapOnStep,
        format,
        locale,
        value,
        defaultValue,
        onValueChange,
        onValueCommitted,
        ref,
        'aria-describedby': ariaDescribedBy,
        ...inputProps
    } = props
    const generatedId = useId()
    const inputId = id ?? generatedId
    const helperId = `${generatedId}-helper`
    const hasError = Boolean(error)
    const describedBy =
    [ariaDescribedBy, error || helperText ? helperId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    return (
        <Flex
            flexDirection={'column'}
            gap={'xs'}
            width={'100%'}
            alignItems={'start'}
            style={width !== undefined ? { width } : undefined}
        >
            {label && (
                <TextFieldLabel
                    htmlFor={inputId}
                    disabled={disabled}
                    fontSize={fontSize}
                >
                    {label}
                </TextFieldLabel>
            )}

            <BaseNumberField.Root
                id={inputId}
                min={min}
                max={max}
                step={step}
                smallStep={smallStep}
                largeStep={largeStep}
                allowOutOfRange={allowOutOfRange}
                allowWheelScrub={allowWheelScrub}
                snapOnStep={snapOnStep}
                format={format}
                locale={locale}
                value={value}
                defaultValue={defaultValue}
                onValueChange={onValueChange}
                onValueCommitted={onValueCommitted}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                name={name}
                form={form}
                className={NUMBER_FIELD_STYLES.root}
            >
                <NumberFieldInput
                    inputProps={inputProps}
                    inputRef={ref}
                    className={className}
                    describedBy={describedBy}
                    hasError={hasError}
                    size={sizeProp}
                    fontSize={fontSize}
                />
            </BaseNumberField.Root>

            {(error || helperText) && (
                <HelperText
                    id={helperId}
                    hasError={hasError}
                >
                    {error ?? helperText}
                </HelperText>
            )}
        </Flex>
    )
})

NumberField.displayName = 'NumberField'

export default NumberField
