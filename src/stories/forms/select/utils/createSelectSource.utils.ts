import { type SelectFieldProps } from '@components/forms/select'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'

/**
 * Generates source matching the current Select controls.
 * @internal Not part of the public package API.
 */
export const createSelectSource = createControlledSource<SelectFieldProps>({ component: 'SelectField', stateProp: 'value', eventProp: 'onValueChange', handler: 'setValue', openState: true, icon: { prop: 'startIcon', name: 'SearchIcon', module: '@iconify-icons/lucide/search' } })
