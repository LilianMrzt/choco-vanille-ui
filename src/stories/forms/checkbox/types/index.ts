import type { CheckboxProps } from '@components/forms/checkbox'
import type { CheckboxGroupProps } from '@components/forms/checkbox-group'
/** Story-only controls for the checkbox slots and group example. */
export type CheckboxStoryArgs = CheckboxProps & Readonly<{
    compoundLabel: string
    indicatorText: string
    indicatorKeepMounted: boolean
    groupLabel: string
    groupHelperText: string
    groupError?: string
    groupDisabled: boolean
    groupValue: string[]
    groupOnValueChange: CheckboxGroupProps['onValueChange']
    groupHeaderLabel: string
    groupLabelOne: string
    groupLabelTwo: string
    groupLabelThree: string
}>
