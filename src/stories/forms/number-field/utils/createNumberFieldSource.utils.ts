import {
    type NumberFieldProps,
} from '@components/forms/number-field'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'

/**
 * Generates source matching the current NumberField controls.
 * @internal Not part of the public package API.
 */
export const createNumberFieldSource = createControlledSource<NumberFieldProps>({ component: 'NumberField', stateProp: 'value', eventProp: 'onValueChange', stateType: 'number | null', handler: 'setValue' })
