import type {
    ImagePickerResolvedLabels,
    ImagePickerShape,
} from '@components/forms/image-picker/types/ImagePicker.types.ts'

/**
 * Props for the internal crop editor shown after a valid file is selected.
 */
export type ImagePickerCropDialogProps = {
    /** The validated local file being edited. */
    file: File
    /** Fixed crop ratio, or the cropper's default ratio when omitted. */
    aspectRatio?: number
    /** Shape used to select a square, rounded, or circular crop area. */
    shape: ImagePickerShape
    /** Localized crop title, action labels, crop-area label, and failure feedback. */
    labels: ImagePickerResolvedLabels
    /** Discards the pending crop and closes the editor. */
    onCancel: () => void
    /** Receives the generated file after the crop is successfully applied. */
    onConfirm: (file: File) => void
}
