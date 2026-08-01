import type { TEXT_AREA_SIZES } from '@components/forms/text-area/constants'

/** Size variants for the TextArea component. */
export type TextAreaSize = (typeof TEXT_AREA_SIZES)[keyof typeof TEXT_AREA_SIZES]
