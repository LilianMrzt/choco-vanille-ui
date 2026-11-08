import type * as React from 'react'
import type { CSSProperties, HTMLAttributes, RefAttributes } from 'react'

import type { IconifyIcon } from '@components/foundation/icon'
import type {
    ImagePickerLabels,
    ImagePickerObjectFit,
    ImagePickerShape,
    ImagePickerValidationError,
    ImagePickerValue,
} from '@components/forms/image-picker/types/ImagePicker.types.ts'

/**
 * Props for the ImagePicker component.
 *
 * All other supported `HTMLAttributes<HTMLDivElement>` are forwarded to the
 * root wrapper. Use `onValueChange` rather than a native `onChange` handler to
 * observe image selection and removal.
 */
export type ImagePickerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange' | 'defaultValue'
> &
  RefAttributes<HTMLDivElement> & {
    /** The controlled image value. Use a URL for an existing image or a File for a newly selected image. */
    value?: ImagePickerValue
    /** The initial image value for uncontrolled usage. @default null */
    defaultValue?: ImagePickerValue
    /** Called whenever the selected image changes or is cleared. */
    onValueChange?: (value: ImagePickerValue) => void
    /** Visible field label. Also names the picker button unless `aria-label` or `aria-labelledby` is provided. */
    label?: string
    /** Alternative text of the image preview. Defaults to `label`, then `labels.selected`. */
    alt?: string
    /** Helper text rendered below the picker. Hidden when `error` is provided. */
    helperText?: string
    /** Error text rendered below the picker, takes precedence over validation feedback, and sets `aria-invalid`. */
    error?: string
    /** Accepted file types passed to the native file input and used for file validation. @default 'image/*' */
    accept?: string
    /** Maximum accepted file size in bytes. Files larger than this value are rejected. */
    maxSize?: number
    /** Called when a file does not match `accept` or exceeds `maxSize`. */
    onValidationError?: (error: ImagePickerValidationError) => void
    /** Disables opening the file picker, drag and drop, and all image actions. @default false */
    disabled?: boolean
    /** Disables the choose/change action, native input, and drag and drop while leaving removal available. @default false */
    disableChange?: boolean
    /** Disables the remove action while leaving choosing or changing the image available. @default false */
    disableRemove?: boolean
    /** Marks the field as required. Native validation applies only while no image is selected. @default false */
    required?: boolean
    /** Shows the remove action when an image is selected. @default true */
    clearable?: boolean
    /**
     * Touch-first layout: disables drag and drop and renders explicit, full-size
     * action buttons below the preview instead of the hover overlay and the
     * corner remove button. @default false
     */
    isMobile?: boolean
    /** Icon shown in the empty state. @default the bundled image-plus icon */
    icon?: IconifyIcon
    /** Id applied to the native file input. An id is generated when omitted. */
    inputId?: string
    /** Name applied to the native file input for native form submission. */
    name?: string
    /** Native file-input capture hint. Leave unset to let users pick from their gallery. */
    capture?: React.InputHTMLAttributes<HTMLInputElement>['capture']
    /** Localizable labels merged over the desktop or mobile defaults. */
    labels?: Partial<ImagePickerLabels>
    /**
     * Opens a crop editor for newly selected or dropped local files before
     * committing them as the picker value. Existing URL values are not cropped.
     * @default false
     */
    crop?: boolean
    /**
     * Fixed aspect ratio used by the crop editor. Defaults to `1` for a
     * circular picker, the numeric value represented by `aspectRatio` when
     * provided, or `4 / 3`.
     */
    cropAspectRatio?: number
    /**
     * CSS width of the picker preview. On mobile, action buttons use the
     * available width of the parent container. @default '100%'
     */
    width?: CSSProperties['width']
    /** CSS height of the preview surface. Ignored when `shape` is `circle`. */
    height?: CSSProperties['height']
    /** CSS aspect ratio of the preview surface. Ignored when `shape` is `circle`. */
    aspectRatio?: CSSProperties['aspectRatio']
    /** Shape of the clickable preview. Use `circle` for profile pictures. @default 'rounded' */
    shape?: ImagePickerShape
    /** Object-fit value applied to the image preview. @default 'cover' */
    objectFit?: ImagePickerObjectFit
  }
