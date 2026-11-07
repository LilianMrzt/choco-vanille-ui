import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import type { FC } from 'react'

import { useCheckboxRoot } from '@components/forms/checkbox/components/checkbox-root/hooks/use-checkbox-root/useCheckboxRoot.hook.ts'
import { CHECKBOX_STYLES } from '@components/forms/checkbox/Checkbox.css.ts'
import type { CheckboxRootProps } from '@components/forms/checkbox/types'
import { cn } from '@utils/cn.ts'

/**
 * Interactive checkbox root. Provide an accessible name and compose an indicator
 * inside it. The ref targets the visible span; inputRef targets the form input.
 * Checked and defaultChecked support controlled and uncontrolled usage.
 * A parent checkbox requires a group with allValues. It controls enabled
 * items while retaining selected disabled items and values outside its scope.
 * @param props - Checkbox state, accessible name, slots and native attributes.
 * @param props.className - Additional class or state-dependent class callback.
 * @param props.value - Identifies the checkbox within a group.
 * @param props.name - Form name and fallback group value.
 * @param props.disabled - Prevents user interaction.
 * @param props.parent - Marks a parent checkbox rather than a group item.
 * @param props.ref - Ref to the visible checkbox.
 * @param props.checked - Controlled checked state for a regular checkbox.
 * @param props.indeterminate - Mixed state for a regular checkbox.
 * @param props.onCheckedChange - Receives checked state and cancellable event details.
 * @param props["aria-controls"] - Additional element IDs controlled by a parent checkbox.
 * @returns The checkbox root and hidden form input.
 * @throws {Error} If a parent checkbox has no group or the group has no allValues.
 * @example
 * <Checkbox.Root aria-label="Accept"><Checkbox.Indicator /></Checkbox.Root>
 */
const CheckboxRoot: FC<CheckboxRootProps> = ({
    className, value, name, disabled, parent, ref, checked, indeterminate, onCheckedChange,
    'aria-controls': ariaControls, ...props
}) => {
    const behavior = useCheckboxRoot({
        value, name, disabled, parent, ref, checked, indeterminate, onCheckedChange, 'aria-controls': ariaControls,
    })

    return (
        <BaseCheckbox.Root
            {...props}
            value={value}
            name={name}
            disabled={disabled}
            parent={parent}
            {...behavior}
            className={typeof className === 'function'
                ? (state) => cn(CHECKBOX_STYLES.root, className(state))
                : cn(CHECKBOX_STYLES.root, className)}
        />
    )
}

CheckboxRoot.displayName = 'Checkbox.Root'

export default CheckboxRoot
