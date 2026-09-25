import type { ImagePickerShape } from '@components/forms/image-picker/types/ImagePicker.types.ts'

export type ImagePickerRemoveButtonProps = {
    disabled: boolean
    label: string
    onClick: () => void
    shape: ImagePickerShape
}
