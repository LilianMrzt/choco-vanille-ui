import { useId, useState, type FC } from 'react'

import { Flex } from '@components/layout/flex'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { TextFieldLabel } from '@components/forms/text-field/components'
import Select from '@components/forms/select/Select.tsx'
import type { SelectFieldProps } from '@components/forms/select/types/Select.props.ts'

/**
 * Convenience wrapper around `Select` that provides a TextField-like API:
 * label, helperText, error, size, width, startIcon, placeholder and an
 * `options` array.
 *
 * @example
 * ```tsx
 * <SelectField
 *   label="Fruit"
 *   placeholder="Pick a fruit"
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana' },
 *   ]}
 *   value={value}
 *   onValueChange={setValue}
 * />
 * ```
 */
const SelectField: FC<SelectFieldProps> = ({
    label,
    helperText,
    error,
    startIcon,
    placeholder,
    size = 'md',
    width,
    disabled,
    required,
    listboxAriaLabel,
    options,
    className,
    value,
    defaultValue,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    name,
    autoComplete,
    ...props
}) => {
    const generatedId = useId()
    const triggerId = `${generatedId}-trigger`
    const helperId = `${generatedId}-helper`
    const hasError = Boolean(error)
    const [internalValue, setInternalValue] = useState<string | undefined>(
        defaultValue ?? (value !== undefined ? String(value) : undefined),
    )

    const isControlled = value !== undefined
    const selectedValue = isControlled ? String(value) : internalValue

    const handleValueChange = (nextValue: string) => {
        if (!isControlled) {
            setInternalValue(nextValue)
        }
        onValueChange?.(nextValue)
    }

    return (
        <Flex
            direction={'column'}
            gap={'xs'}
            w={'full'}
            align={'start'}
            style={width !== undefined ? { width } : undefined}
            className={className}
        >
            {label && (
                <TextFieldLabel
                    htmlFor={triggerId}
                    disabled={disabled}
                >
                    {label}
                </TextFieldLabel>
            )}

            <Select
                value={selectedValue}
                onValueChange={handleValueChange}
                disabled={disabled}
                required={required}
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
                name={name}
                autoComplete={autoComplete}
                {...props}
            >
                <Select.Trigger
                    id={triggerId}
                    placeholder={placeholder}
                    startIcon={startIcon}
                    size={size}
                    hasError={hasError}
                    aria-describedby={error || helperText ? helperId : undefined}
                    aria-invalid={hasError || undefined}
                />
                <Select.Content listboxAriaLabel={listboxAriaLabel}>
                    <Select.Viewport>
                        {options.map((option, index) => {
                            if (option.type === 'separator') {
                                return <Select.Separator key={`sep-${index}`} />
                            }

                            if (option.type === 'group') {
                                return (
                                    <Select.Group key={`group-${option.label}-${index}`}>
                                        <Select.Label>{option.label}</Select.Label>
                                        {option.options.map((item) => (
                                            <Select.Item
                                                key={item.value}
                                                value={item.value}
                                                disabled={item.disabled}
                                                label={item.label}
                                            />
                                        ))}
                                    </Select.Group>
                                )
                            }

                            return (
                                <Select.Item
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    label={option.label}
                                />
                            )
                        })}
                    </Select.Viewport>
                </Select.Content>
            </Select>

            {(error || helperText) && (
                <HelperText
                    id={helperId}
                    error={hasError}
                >
                    {error ?? helperText}
                </HelperText>
            )}
        </Flex>
    )
}

SelectField.displayName = 'SelectField'

export default SelectField
