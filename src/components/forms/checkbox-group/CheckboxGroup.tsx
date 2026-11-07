import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { useId, type FC } from 'react'

import FormLabel from '@components/forms/primitives/form-label/FormLabel.tsx'
import HelperText from '@components/forms/primitives/helper-text/HelperText.tsx'
import Checkbox from '@components/forms/checkbox/Checkbox.tsx'
import CheckboxGroupHeader from '@components/forms/checkbox-group/components/header/CheckboxGroupHeader.tsx'
import { CheckboxGroupContext } from '@components/forms/checkbox-group/context/CheckboxGroup.context.ts'
import { useCheckboxGroup } from '@components/forms/checkbox-group/hooks/useCheckboxGroup.hook.ts'
import type { CheckboxGroupCompound, CheckboxGroupProps } from '@components/forms/checkbox-group/types'
import { Flex } from '@components/layout/flex'

/**
 * A named group of checkboxes with controlled or uncontrolled selection.
 * CheckboxGroup.Item and Checkbox are the same component. Provide `allValues`
 * when using CheckboxGroup.Header, including values rendered through wrappers.
 * Parent selection preserves selected disabled items and values outside
 * allValues. The default selection is empty; callbacks can cancel changes.
 * Native attributes and ref target the group div.
 * @param props - Group selection, accessible name and native attributes. aria-labelledby overrides the group name, aria-describedby adds description IDs, and aria-invalid sets the invalid state when no error is supplied.
 * @param props.className - Consumer class or state-dependent class callback.
 * @param props.children - Checkbox items, header and custom content.
 * @param props.label - Optional visible group name.
 * @param props.helperText - Supporting text, replaced by an error when present.
 * @param props.error - Error message and invalid state.
 * @param props.allValues - All item values; required when composing a header.
 * @param props.value - Controlled selected values.
 * @param props.defaultValue - Initial uncontrolled selected values.
 * @param props.onValueChange - Receives selected values and cancellable event details.
 * @returns The group and its children.
 * @example
 * ```tsx
 * <CheckboxGroup label="Notifications" allValues={['email', 'sms']}>
 *   <CheckboxGroup.Header label="All" />
 *   <CheckboxGroup.Item value="email" label="Email" />
 *   <CheckboxGroup.Item value="sms" label="SMS" />
 * </CheckboxGroup>
 * ```
 */
const CheckboxGroupRoot: FC<CheckboxGroupProps> = (props) => {
    const {
        className,
        children,
        label,
        helperText,
        error,
        allValues,
        value,
        defaultValue,
        onValueChange,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        'aria-invalid': ariaInvalid,
        ...nativeProps
    } = props
    const generatedId = useId()
    const labelId = label ? `${generatedId}-label` : undefined
    const helperId = error || helperText ? `${generatedId}-helper` : undefined
    const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(' ') || undefined
    const group = useCheckboxGroup({ allValues, value, defaultValue, onValueChange })

    return (
        <BaseCheckboxGroup
            className={className}
            value={group.value}
            onValueChange={group.onValueChange}
            aria-labelledby={ariaLabelledBy ?? labelId}
            aria-describedby={describedBy}
            aria-invalid={error ? true : ariaInvalid}
            {...nativeProps}
        >
            <CheckboxGroupContext.Provider value={group}>
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
            </CheckboxGroupContext.Provider>
        </BaseCheckboxGroup>
    )
}

CheckboxGroupRoot.displayName = 'CheckboxGroup'

/**
 * Checkbox group exposing Item and Header slots. Name the group accessibly and
 * provide allValues for a header; its ref targets the group div.
 * @param props - Group selection, accessible name and composed children.
 * @returns The group and its checkbox slots.
 * @example
 * <CheckboxGroup label="Options"><CheckboxGroup.Item value="a" label="A" /></CheckboxGroup>
 */
const CheckboxGroup: CheckboxGroupCompound = Object.assign(CheckboxGroupRoot, {
    Item: Checkbox,
    Header: CheckboxGroupHeader,
})

export default CheckboxGroup
