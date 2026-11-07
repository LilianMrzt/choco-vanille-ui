import type { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import type { FC } from 'react'

import type Checkbox from '@components/forms/checkbox/Checkbox.tsx'
import type CheckboxGroupHeader from '@components/forms/checkbox-group/components/header/CheckboxGroupHeader.tsx'
import type { CheckboxProps } from '@components/forms/checkbox/types'

/** Group selection, accessible naming and optional supporting text. */
export type CheckboxGroupProps = Readonly<BaseCheckboxGroup.Props & {
    label?: string
    helperText?: string
    error?: string
}>

/** A mounted checkbox participating in a group's parent selection. */
export type CheckboxGroupRegistration = Readonly<{
    id: string
    value: string
    disabled: boolean
}>

/** Group selection and mounted items needed by the parent checkbox. */
export type CheckboxGroupContextValue = Readonly<{
    allValues: string[] | undefined
    value: string[]
    registrations: ReadonlyMap<string, CheckboxGroupRegistration>
    register: (key: string, registration: CheckboxGroupRegistration) => () => void
    onValueChange: NonNullable<CheckboxGroupProps['onValueChange']>
}>

/** Parent checkbox; the group owns its checked and mixed state. */
export type CheckboxGroupHeaderProps = Readonly<Omit<CheckboxProps, 'parent' | 'checked' | 'defaultChecked' | 'indeterminate' | 'value'>>

/** Group with reusable checkbox and parent checkbox slots. */
export type CheckboxGroupCompound = FC<CheckboxGroupProps> & Readonly<{
    Item: typeof Checkbox
    Header: typeof CheckboxGroupHeader
}>
