import { type FC, memo, useCallback, useMemo } from 'react'

import { Flex } from '@components/layout/flex'
import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import Select from '@components/forms/select/Select.tsx'
import type { SelectFieldProps } from '@components/forms/select/types/Select.props.ts'
import useSelectField from '@components/forms/select/components/select-field/hooks/useSelectField.hook.ts'
import { flattenItems } from '@components/forms/select/components/select-field/utils/flattenItems.utils.ts'

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
const SelectField: FC<SelectFieldProps> = memo(({
    label,
    helperText,
    error,
    startIcon,
    placeholder,
    size = 'md',
    fontSize = 'md',
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
    ...props
}) => {
    const { triggerId, helperId, hasError, selectedValue, handleValueChange } = useSelectField({
        error,
        value,
        defaultValue,
        onValueChange,
    })

    const items = useMemo(() => flattenItems(options), [options])

    const handleSelectValueChange = useCallback(
        (v: string | null) => { if (v !== null) { handleValueChange(v) } },
        [handleValueChange],
    )

    return (
        <Flex
            flexDirection={'column'}
            gap={'xs'}
            width={'100%'}
            alignItems={'start'}
            style={width !== undefined ? { width } : undefined}
            className={className}
            {...props}
        >
            {label && (
                <FormLabel
                    htmlFor={triggerId}
                    disabled={disabled}
                    fontSize={fontSize}
                >
                    {label}
                </FormLabel>
            )}

            <Select
                value={selectedValue ?? null}
                onValueChange={handleSelectValueChange}
                disabled={disabled}
                required={required}
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
                name={name}
                items={items}
            >
                <Select.Trigger
                    id={triggerId}
                    placeholder={placeholder}
                    startIcon={startIcon}
                    size={size}
                    fontSize={fontSize}
                    hasError={hasError}
                    aria-describedby={error || helperText ? helperId : undefined}
                    aria-invalid={hasError || undefined}
                />
                <Select.Content listboxAriaLabel={listboxAriaLabel}>
                    <Select.List>
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
                    </Select.List>
                </Select.Content>
            </Select>

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

SelectField.displayName = 'SelectField'

export default SelectField
