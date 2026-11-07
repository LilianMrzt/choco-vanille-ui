import { type TextFieldProps } from '@components/forms/text-field'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'

/**
 * Generates source matching the current TextField controls.
 * @internal Not part of the public package API.
 */
export const createTextFieldSource = createControlledSource<TextFieldProps>({ component: 'TextField', stateProp: 'value', eventProp: 'onChange', handler: '(event) => setValue(event.target.value)', icon: { prop: 'startIcon', name: 'SearchIcon' } })
