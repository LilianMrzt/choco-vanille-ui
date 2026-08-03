import type { TEXT_FIELD_SIZES } from '@components/forms/text-field/constants'

/** Size variants shared with the text field family. */
export type NumberFieldSize =
  (typeof TEXT_FIELD_SIZES)[keyof typeof TEXT_FIELD_SIZES];
