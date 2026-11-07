import { type ComponentProps } from 'react'
import { TimePicker } from '@components/forms/time-picker'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import source from '@stories/forms/time-picker/sources/TimePicker.source.txt?raw'

/**
 * Generates source matching the current TimePicker controls.
 * @internal Not part of the public package API.
 */
export const createTimePickerSource = createPrimitiveSource<ComponentProps<typeof TimePicker>>(source, { omit: ['onChange'] })
