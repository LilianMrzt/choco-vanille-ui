import { type TextAreaProps } from '@components/forms/text-area'
import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'

/**
 * Generates source matching the current TextArea controls.
 * @internal Not part of the public package API.
 */
export const createTextAreaSource = createControlledSource<TextAreaProps>({ component: 'TextArea', stateProp: 'value', eventProp: 'onChange', handler: '(event) => setValue(event.target.value)', icon: { prop: 'startIcon', name: 'InfoIcon', module: '@iconify-icons/lucide/info' } })
