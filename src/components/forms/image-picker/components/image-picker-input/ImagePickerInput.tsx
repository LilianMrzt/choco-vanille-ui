import { IMAGE_PICKER_STYLES } from '@components/forms/image-picker/styles/ImagePicker.css.ts'
import type { ImagePickerInputProps } from '@components/forms/image-picker/components/image-picker-input/types/ImagePickerInput.props.ts'
import { memo } from 'react'

export const ImagePickerInput = memo<ImagePickerInputProps>(({
    accept,
    capture,
    disabled,
    id,
    inputRef,
    name,
    onChange,
    required,
}: ImagePickerInputProps) => (
    <input
        ref={inputRef}
        id={id}
        className={IMAGE_PICKER_STYLES.input}
        type={'file'}
        accept={accept}
        capture={capture}
        name={name}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden={'true'}
        onChange={onChange}
    />
))

ImagePickerInput.displayName = 'ImagePicker.Input'
