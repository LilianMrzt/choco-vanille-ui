import { vars } from '@theme/styles/contract/contract.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { Image } from '@components/layout/image'
import { IMAGE_PICKER_SHAPES } from '@components/forms/image-picker/constants'
import type { ImagePickerPreviewProps } from '@components/forms/image-picker/components/image-picker-preview/types/ImagePickerPreview.props.ts'
import { IMAGE_PICKER_STYLES } from '@components/forms/image-picker/styles/ImagePicker.css.ts'
import ImagePlusIcon from '@resources/asset/ImagePlusIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'
import { memo } from 'react'

export const ImagePickerPreview = memo<ImagePickerPreviewProps>(({
    actionId,
    actionLabel,
    alt,
    ariaDescribedBy,
    ariaInvalid,
    ariaLabel,
    ariaLabelledBy,
    aspectRatio,
    disabled,
    emptyLabel,
    hasError,
    hasValue,
    height,
    icon = ImagePlusIcon,
    isDragging,
    isMobile,
    objectFit,
    onClick,
    onDragLeave,
    onDragOver,
    onDrop,
    previewUrl,
    shape,
}) => (
    // The preview button is the accessible field control and owns validation state.
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <button
        type={'button'}
        className={IMAGE_PICKER_STYLES.preview({ shape })}
        style={shape === IMAGE_PICKER_SHAPES.circle ? undefined : { height, aspectRatio }}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        onClick={onClick}
        onDragOver={isMobile ? undefined : onDragOver}
        onDragLeave={isMobile ? undefined : onDragLeave}
        onDrop={isMobile ? undefined : onDrop}
        disabled={disabled}
        data-disabled={disabled ? 'true' : 'false'}
        data-dragging={isDragging ? 'true' : 'false'}
        data-has-error={hasError ? 'true' : 'false'}
        data-has-value={hasValue ? 'true' : 'false'}
        data-shape={shape}
    >
        <span
            id={actionId}
            className={IMAGE_PICKER_STYLES.visuallyHidden}
        >
            {actionLabel}
        </span>
        {previewUrl ? (
            <Image
                src={previewUrl}
                alt={alt}
                objectFit={objectFit}
                className={IMAGE_PICKER_STYLES.image}
                width={'100%'}
                height={'100%'}
            />
        ) : (
            <span className={IMAGE_PICKER_STYLES.empty}>
                <Icon
                    icon={icon}
                    size={'xl'}
                    color={vars.color.primary.main}
                    className={IMAGE_PICKER_STYLES.emptyIcon}
                />
                {!hasValue && (
                    <Typography
                        as={'span'}
                        fontSize={'sm'}
                        color={vars.color.text.secondary}
                        className={IMAGE_PICKER_STYLES.emptyText}
                        aria-hidden={'true'}
                    >
                        {emptyLabel}
                    </Typography>
                )}
            </span>
        )}
        {!isMobile && hasValue && (
            <span
                className={IMAGE_PICKER_STYLES.scrim}
                aria-hidden={'true'}
            >
                <Icon
                    icon={UploadIcon}
                    size={'lg'}
                />
                <Typography
                    as={'span'}
                    fontSize={'sm'}
                    fontWeight={'medium'}
                    color={vars.color.primary.foreground}
                    className={IMAGE_PICKER_STYLES.scrimText}
                >
                    {actionLabel}
                </Typography>
            </span>
        )}
    </button>
))

ImagePickerPreview.displayName = 'ImagePicker.Preview'
