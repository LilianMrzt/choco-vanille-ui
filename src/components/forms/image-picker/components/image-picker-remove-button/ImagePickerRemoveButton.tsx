import { TRASH_ICON as TrashIcon } from '@constants/icon-registry'
import { IconButton } from '@components/actions/icon-button'
import type { ImagePickerRemoveButtonProps } from '@components/forms/image-picker/components/image-picker-remove-button/types/ImagePickerRemoveButton.props.ts'
import { IMAGE_PICKER_STYLES } from '@components/forms/image-picker/styles/ImagePicker.css.ts'
import { memo } from 'react'

export const ImagePickerRemoveButton = memo<ImagePickerRemoveButtonProps>(({
    disabled,
    label,
    onClick,
    shape,
}) => (
    <IconButton
        type={'button'}
        icon={TrashIcon}
        size={'sm'}
        variant={'contained'}
        color={'neutral'}
        aria-label={label}
        className={IMAGE_PICKER_STYLES.removeButton({ shape })}
        disabled={disabled}
        onClick={onClick}
    />
))

ImagePickerRemoveButton.displayName = 'ImagePicker.RemoveButton'
