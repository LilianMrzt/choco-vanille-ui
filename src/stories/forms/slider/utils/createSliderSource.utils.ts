import { type SliderProps } from '@components/forms/slider'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'

/**
 * Generates source matching the current Slider controls.
 * @internal Not part of the public package API.
 */
export const createSliderSource = createControlledSource<SliderProps>({ component: 'Slider', stateProp: 'value', eventProp: 'onValueChange', stateType: 'number | readonly [number, number]', handler: 'setValue' })
