import { TRASH_ICON as TrashIcon, UPLOAD_ICON as UploadIcon } from '@constants/icon-registry'
import { Button } from '@components/actions/button'
import { IMAGE_PICKER_STYLES } from '@components/forms/image-picker/styles/ImagePicker.css.ts'
import type { ImagePickerActionsProps } from '@components/forms/image-picker/components/image-picker-actions/types/ImagePickerActions.props.ts'
import { memo } from 'react'

export const ImagePickerActions = memo<ImagePickerActionsProps>(({
    actionLabel,
    changeDisabled,
    hasValue,
    onChange,
    onRemove,
    removeDisabled,
    removeLabel,
    showRemove,
}) => (
    <div className={IMAGE_PICKER_STYLES.actions}>
        <Button
            type={'button'}
            label={actionLabel}
            startIcon={UploadIcon}
            size={'md'}
            variant={'outlined'}
            width={'100%'}
            disabled={changeDisabled}
            onClick={onChange}
        />
        {hasValue && showRemove && (
            <Button
                type={'button'}
                label={removeLabel}
                startIcon={TrashIcon}
                size={'md'}
                variant={'ghost'}
                color={'danger'}
                width={'100%'}
                disabled={removeDisabled}
                onClick={onRemove}
            />
        )}
    </div>
))

ImagePickerActions.displayName = 'ImagePicker.Actions'
