import type { ImagePickerLabels } from '@components/forms/image-picker/types/ImagePicker.types.ts'

export const IMAGE_PICKER_DEFAULT_ACCEPT = 'image/*'

export const IMAGE_PICKER_DEFAULT_LABELS: ImagePickerLabels = {
    choose: 'Choose image',
    change: 'Change image',
    remove: 'Remove image',
    empty: 'Drag an image here or click to browse',
    selected: 'Image selected',
    invalidType: 'Choose an image file.',
    maxSize: 'This image is too large.',
}

export const IMAGE_PICKER_MOBILE_LABELS: ImagePickerLabels = {
    ...IMAGE_PICKER_DEFAULT_LABELS,
    empty: 'Tap to choose an image',
}
