import type { ImageObjectFit } from '@components/layout/image/types/Image.types.ts'
import type { IMAGE_PICKER_SHAPES } from '@components/forms/image-picker/constants/imagePickerShapes.const.ts'

/** A remote image URL, a locally selected image file, or no image. */
export type ImagePickerValue = File | string | null

/** Reasons why a selected or dropped file can be rejected before it becomes the value. */
export type ImagePickerValidationReason = 'invalidType' | 'maxSize'

/** Details passed to `onValidationError` when a file is rejected. */
export type ImagePickerValidationError = {
  /** The validation rule that rejected the file. */
  reason: ImagePickerValidationReason
  /** The file that failed validation. */
  file: File
  /** The configured byte limit when `reason` is `maxSize`. */
  maxSize?: number
};

/** Localizable text used by the picker actions, empty state, and validation feedback. */
export type ImagePickerLabels = {
  /** Label for the choose action when no image is selected. */
  choose: string
  /** Label for the choose action when an image is already selected. */
  change: string
  /** Label for the remove action. */
  remove: string
  /** Instruction shown in the empty preview state. */
  empty: string
  /** Fallback alternative text for a selected image. */
  selected: string
  /** Validation message shown for an unsupported file type. */
  invalidType: string
  /** Validation message shown when a file exceeds `maxSize`. */
  maxSize: string
};

/** Object-fit values supported by the image preview. */
export type ImagePickerObjectFit = ImageObjectFit

/** Shape values supported by the clickable image dropzone. */
export type ImagePickerShape =
    (typeof IMAGE_PICKER_SHAPES)[keyof typeof IMAGE_PICKER_SHAPES]
