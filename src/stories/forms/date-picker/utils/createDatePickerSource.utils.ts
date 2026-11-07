import { type ComponentProps } from 'react'
import { DatePicker } from '@components/forms/date-picker'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import source from '@stories/forms/date-picker/sources/DatePicker.source.txt?raw'

/**
 * Generates source matching the current DatePicker controls.
 * @internal Not part of the public package API.
 */
export const createDatePickerSource = createPrimitiveSource<ComponentProps<typeof DatePicker>>(source, { omit: ['onChange'] })
