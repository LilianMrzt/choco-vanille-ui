import { useId, type FC } from 'react'

import CheckboxRoot from '@components/forms/checkbox/components/checkbox-root/CheckboxRoot.tsx'
import CheckboxIndicator from '@components/forms/checkbox/components/checkbox-indicator/CheckboxIndicator.tsx'
import FormLabel from '@components/forms/primitives/form-label/FormLabel.tsx'
import HelperText from '@components/forms/primitives/helper-text/HelperText.tsx'
import { Flex } from '@components/layout/flex'
import { CHECKBOX_STYLES } from '@components/forms/checkbox/Checkbox.css.ts'
import type { CheckboxCompound, CheckboxProps } from '@components/forms/checkbox/types'

/**
  * Convenience checkbox, also exposed as CheckboxGroup.Item. Use Checkbox.Root
  * and Checkbox.Indicator for custom compositions. Give the control a label or
  * accessible name. The ref targets its visible span and inputRef the form input.
  * @param props - Checkbox state, form attributes and supporting text. aria-labelledby overrides the label association, aria-describedby adds description IDs, and aria-invalid sets the invalid state when no error is supplied.
  * @param props.label - Visible text associated with the checkbox.
  * @param props.helperText - Supporting text, replaced by an error when present.
  * @param props.error - Error message and invalid state.
  * @param props.id - ID of the form input.
  * @param props.className - Additional class or state-dependent class callback.
  * @param props.onCheckedChange - Receives checked state and event details.
  * @returns The checkbox, optional label and supporting text.
  * @example
  * <Checkbox label="Accept terms" defaultChecked />
  */
const CheckboxItem: FC<CheckboxProps> = (props) => {
    const {
        label,
        helperText,
        error,
        id,
        className,
        onCheckedChange,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedBy,
        'aria-invalid': ariaInvalid,
        ...nativeProps
    } = props
    const generatedId = useId()
    const labelId = useId()
    const checkboxId = id ?? (label ? generatedId : undefined)
    const helperId = error || helperText ? `${generatedId}-helper` : undefined
    const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(' ') || undefined

    return (
        <Flex
            as={'span'}
            inline
            flexDirection={'column'}
            alignItems={'start'}
            gap={4}
        >
            <Flex
                as={'span'}
                inline
                gap={8}
                alignItems={'center'}
            >
                <Checkbox.Root
                    id={checkboxId}
                    className={className}
                    onCheckedChange={onCheckedChange}
                    aria-labelledby={ariaLabelledby ?? (label ? labelId : undefined)}
                    aria-describedby={describedBy}
                    aria-invalid={error ? true : ariaInvalid}
                    {...nativeProps}
                >
                    <Checkbox.Indicator />
                </Checkbox.Root>

                {label && (
                    <FormLabel
                        id={labelId}
                        className={CHECKBOX_STYLES.label}
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
}

CheckboxItem.displayName = 'Checkbox'

/**
 * Checkbox convenience component with Root and Indicator composition slots.
 * The ref targets the visible checkbox; inputRef targets the form input.
 * @param props - Checkbox state, accessible name and optional supporting text.
 * @returns A checkbox with its optional label and description.
 * @example
 * <Checkbox label="Accept terms" />
 */
const Checkbox: CheckboxCompound = Object.assign(CheckboxItem, {
    Root: CheckboxRoot,
    Indicator: CheckboxIndicator,
})

export default Checkbox
