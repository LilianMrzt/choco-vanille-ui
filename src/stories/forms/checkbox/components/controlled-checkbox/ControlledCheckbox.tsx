import { Checkbox } from '@/components/forms/checkbox'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'
import type { ReactElement } from 'react'

/**
 * Renders the Checkbox interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @param args - Controlled props and the callback supplied by the story renderer.
 * @returns The pure checkbox field.
 * @example
 * <ControlledCheckbox />
 */
const ControlledCheckbox = (args: CheckboxStoryArgs): ReactElement => {
    const {
        compoundLabel: _compoundLabel, indicatorText: _indicatorText, indicatorKeepMounted: _indicatorKeepMounted,
        groupLabel: _groupLabel, groupHelperText: _groupHelperText, groupError: _groupError,
        groupDisabled: _groupDisabled, groupValue: _groupValue, groupOnValueChange: _groupOnValueChange,
        groupHeaderLabel: _groupHeaderLabel, groupLabelOne: _groupLabelOne,
        groupLabelTwo: _groupLabelTwo, groupLabelThree: _groupLabelThree, ...checkboxProps
    } = args
    return (
        <Checkbox
            {...checkboxProps}
        />
    )
}

export default ControlledCheckbox
