import type { ImagePickerResolvedLabels } from '@components/forms/image-picker/types/ImagePicker.types.ts'

export const IMAGE_PICKER_DEFAULT_ACCEPT = 'image/*'

export const IMAGE_PICKER_DEFAULT_LABELS: ImagePickerResolvedLabels = {
    choose: 'Choose image',
    change: 'Change image',
    remove: 'Remove image',
    crop: 'Crop image',
    cancel: 'Cancel',
    apply: 'Apply crop',
    zoom: 'Zoom',
    cropArea: 'Adjust crop',
    cropError: 'Unable to crop this image. Please try again.',
    empty: 'Drag an image here or click to browse',
    selected: 'Image selected',
    invalidType: 'Choose an image file.',
    maxSize: 'This image is too large.',
}

export const IMAGE_PICKER_MOBILE_LABELS: ImagePickerResolvedLabels = {
    ...IMAGE_PICKER_DEFAULT_LABELS,
    empty: 'Tap to choose an image',
}
