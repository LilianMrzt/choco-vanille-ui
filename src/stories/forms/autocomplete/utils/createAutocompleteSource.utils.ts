import { type AutocompleteFieldProps } from '@components/forms/autocomplete'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'

/**
 * Generates source matching the current Autocomplete controls.
 * @internal Not part of the public package API.
 */
export const createAutocompleteSource = createControlledSource<AutocompleteFieldProps>({ component: 'AutocompleteField', stateProp: 'value', eventProp: 'onValueChange', handler: 'setValue', openState: true, icon: { prop: 'startIcon', name: 'SearchIcon', module: '@iconify-icons/lucide/search' } })
