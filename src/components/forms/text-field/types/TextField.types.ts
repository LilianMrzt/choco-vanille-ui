import type { TEXT_FIELD_SIZES } from '@components/forms/text-field/constants'

/** Size variants for the TextField component. */
export type TextFieldSize = (typeof TEXT_FIELD_SIZES)[keyof typeof TEXT_FIELD_SIZES]
