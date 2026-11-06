import type { ImageObjectFit } from '@components/layout/image/types'
import type { IMAGE_PICKER_SHAPES } from '@components/forms/image-picker/constants/imagePickerShapes.const.ts'

/** A remote image URL, a locally selected image file, or no image. */
export type ImagePickerValue = File | string | null;

/** Reasons why a selected or dropped file can be rejected before it becomes the value. */
export type ImagePickerValidationReason = 'invalidType' | 'maxSize';

/** Details passed to `onValidationError` when a file is rejected. */
export type ImagePickerValidationError = {
  /** The validation rule that rejected the file. */
  reason: ImagePickerValidationReason;
  /** The file that failed validation. */
  file: File;
  /** The configured byte limit when `reason` is `maxSize`. */
  maxSize?: number;
};

/** Localizable text used by picker actions, crop controls, empty state, and validation feedback. */
export type ImagePickerLabels = {
  /** Label for the choose action when no image is selected. */
  choose: string;
  /** Label for the choose action when an image is already selected. */
  change: string;
  /** Label for the remove action. */
  remove: string;
  /** Title shown above the crop editor. @default 'Crop image' */
  crop?: string;
  /** Label for the action that discards the current crop. @default 'Cancel' */
  cancel?: string;
  /** Label for the action that applies the current crop. @default 'Apply crop' */
  apply?: string;
  /** Label for the crop zoom control. @default 'Zoom' */
  zoom?: string;
  /** Accessible label for the interactive crop area. @default 'Adjust crop' */
  cropArea?: string;
  /** Feedback shown when the selected crop cannot be generated. */
  cropError?: string;
  /** Instruction shown in the empty preview state. */
  empty: string;
  /** Fallback alternative text for a selected image. */
  selected: string;
  /** Validation message shown for an unsupported file type. */
  invalidType: string;
  /** Validation message shown when a file exceeds `maxSize`. */
  maxSize: string;
};

/** Object-fit values supported by the image preview. */
export type ImagePickerObjectFit = ImageObjectFit;

/** Fully resolved labels used internally after defaults are merged. */
export type ImagePickerResolvedLabels = Required<ImagePickerLabels>;

/** Shape values supported by the clickable image dropzone. */
export type ImagePickerShape =
  (typeof IMAGE_PICKER_SHAPES)[keyof typeof IMAGE_PICKER_SHAPES];
