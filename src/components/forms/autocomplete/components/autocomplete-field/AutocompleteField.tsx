import { Fragment, type FC, memo, useCallback, useMemo } from 'react'

import { Flex } from '@components/layout/flex'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { TextFieldLabel, TextFieldStartIcon } from '@components/forms/text-field/components'
import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import type { AutocompleteFieldProps } from '@components/forms/autocomplete/types/Autocomplete.props.ts'
import useAutocompleteField from '@components/forms/autocomplete/components/autocomplete-field/hooks/useAutocompleteField.hook.ts'
import { toRootItems } from '@components/forms/autocomplete/components/autocomplete-field/utils/toRootItems.utils.ts'

/**
 * Convenience wrapper around `Autocomplete` that provides a TextField-like API:
 * label, helperText, error, size, width, startIcon, placeholder and an
 * `options` array.
 *
 * @example
 * ```tsx
 * <AutocompleteField
 *   label="Fruit"
 *   placeholder="Search a fruit"
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana' },
 *   ]}
 *   value={value}
 *   onValueChange={setValue}
 * />
 * ```
 */
const AutocompleteField: FC<AutocompleteFieldProps> = memo(({
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
    emptyText = 'No results found.',
    options,
    className,
    value,
    defaultValue,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    name,
}) => {
    const { inputId, helperId, hasError, inputValue, handleValueChange } = useAutocompleteField({
        error,
        value,
        defaultValue,
        onValueChange,
    })

    const items = useMemo(() => toRootItems(options), [options])
    const hasGroups = useMemo(() => options.some((option) => option.type === 'group'), [options])

    const handleAutocompleteValueChange = useCallback(
        (nextValue: string) => { handleValueChange(nextValue) },
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

            <Flex
                position={'relative'}
                width={'100%'}
                gap={'none'}
            >
                {startIcon && (
                    <TextFieldStartIcon
                        icon={startIcon}
                        size={size}
                    />
                )}

                <Autocomplete
                    value={inputValue}
                    onValueChange={handleAutocompleteValueChange}
                    disabled={disabled}
                    required={required}
                    open={open}
                    defaultOpen={defaultOpen}
                    onOpenChange={onOpenChange}
                    name={name}
                    items={items}
                >
                    <Autocomplete.InputGroup style={{ width: '100%' }}>
                        <Autocomplete.Input
                            id={inputId}
                            placeholder={placeholder}
                            startIcon={startIcon}
                            size={size}
                            fontSize={fontSize}
                            hasError={hasError}
                            aria-describedby={error || helperText ? helperId : undefined}
                            aria-invalid={hasError || undefined}
                        />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content listboxAriaLabel={listboxAriaLabel}>
                        {/*
                         * Pass a function as children so Base UI's `Autocomplete.List` only
                         * renders items that survived its own filtering (driven by the `items`
                         * prop on the root). Mapping over the raw `options` array here would
                         * always render every option, bypassing filtering entirely.
                         */}
                        {hasGroups ? (
                            <Autocomplete.List>
                                {(group: { label: string; items: { value: string; label: string; disabled?: boolean }[] }, groupIndex: number) => (
                                    <Fragment key={`group-${group.label}-${groupIndex}`}>
                                        {groupIndex > 0 && <Autocomplete.Separator />}
                                        <Autocomplete.Group items={group.items}>
                                            <Autocomplete.Label>{group.label}</Autocomplete.Label>
                                            <Autocomplete.Collection>
                                                {(item: { value: string; label: string; disabled?: boolean }) => (
                                                    <Autocomplete.Item
                                                        key={item.value}
                                                        value={item.value}
                                                        disabled={item.disabled}
                                                    >
                                                        {item.label}
                                                    </Autocomplete.Item>
                                                )}
                                            </Autocomplete.Collection>
                                        </Autocomplete.Group>
                                    </Fragment>
                                )}
                            </Autocomplete.List>
                        ) : (
                            <Autocomplete.List>
                                {(item: { value: string; label: string; disabled?: boolean }) => (
                                    <Autocomplete.Item
                                        key={item.value}
                                        value={item.value}
                                        disabled={item.disabled}
                                    >
                                        {item.label}
                                    </Autocomplete.Item>
                                )}
                            </Autocomplete.List>
                        )}
                        <Autocomplete.Empty>{emptyText}</Autocomplete.Empty>
                    </Autocomplete.Content>
                </Autocomplete>
            </Flex>

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

AutocompleteField.displayName = 'AutocompleteField'

export default AutocompleteField
