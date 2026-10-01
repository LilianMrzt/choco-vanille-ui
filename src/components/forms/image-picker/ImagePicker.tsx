import FormLabel from '@components/forms/_shared/components/form-label/FormLabel.tsx'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import {
    ImagePickerActions,
    ImagePickerCropDialog,
    ImagePickerInput,
    ImagePickerPreview,
    ImagePickerRemoveButton,
} from '@components/forms/image-picker/components'
import { IMAGE_PICKER_DEFAULT_ACCEPT } from '@components/forms/image-picker/constants/imagePickerDefaults.const.ts'
import { IMAGE_PICKER_SHAPES } from '@components/forms/image-picker/constants'
import { IMAGE_PICKER_STYLES } from '@components/forms/image-picker/styles/ImagePicker.css.ts'
import type { ImagePickerProps } from '@components/forms/image-picker/types/ImagePicker.props.ts'
import { useImagePicker } from '@components/forms/image-picker/hooks/useImagePicker.hook.ts'
import { resolveImagePickerAspectRatio } from '@components/forms/image-picker/utils/imagePicker.utils.ts'
import { cn } from '@utils/cn.ts'
import { memo, useId } from 'react'

/**
 * A controlled or uncontrolled single-image picker, designed first for
 * profile pictures. The preview is the button that opens the native chooser.
 * On desktop it accepts drag and drop, reveals a "change" hint on hover and
 * shows a corner remove button; with `isMobile` it renders explicit
 * touch-sized action buttons instead. Change and remove actions can be
 * disabled independently. Set `crop` to open a crop editor before a newly
 * selected image is committed.
 *
 * @example
 * ```tsx
 * import { useState } from 'react'
 * import { ImagePicker } from '@choco-vanille/ui'
 *
 * const ProfilePictureField = () => {
 *     const [value, setValue] = useState<File | string | null>(null)
 *
 *     return (
 *         <ImagePicker
 *             label="Profile picture"
 *             name="profilePicture"
 *             value={value}
 *             onValueChange={setValue}
 *             shape="circle"
 *         />
 *     )
 * }
 * ```
 */
const ImagePicker = memo<ImagePickerProps>(
    ({
        value,
        defaultValue,
        onValueChange,
        label,
        alt,
        helperText,
        error,
        accept: acceptProp,
        maxSize,
        onValidationError,
        disabled = false,
        disableChange = false,
        disableRemove = false,
        required = false,
        clearable = true,
        isMobile = false,
        icon,
        inputId,
        name,
        capture,
        labels,
        crop = false,
        cropAspectRatio,
        width,
        height,
        aspectRatio,
        shape = IMAGE_PICKER_SHAPES.rounded,
        objectFit = 'cover',
        className,
        style,
        ref,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        'aria-invalid': ariaInvalid,
        ...rootProps
    }) => {
        const generatedId = useId()
        const resolvedInputId = inputId ?? generatedId
        const labelId = label ? `${resolvedInputId}-label` : undefined
        const actionId = `${resolvedInputId}-action`
        const helperId = `${resolvedInputId}-helper`
        const accept = acceptProp ?? IMAGE_PICKER_DEFAULT_ACCEPT
        const {
            inputRef,
            previewUrl,
            resolvedLabels,
            validationMessage,
            hasValue,
            isChangeDisabled,
            isRemoveDisabled,
            isDragging,
            handleOpen,
            handleInputChange,
            handleDragOver,
            handleDragLeave,
            handleDrop,
            handleClear,
            pendingCropFile,
            handleCropCancel,
            handleCropConfirm,
        } = useImagePicker({
            value,
            defaultValue,
            onValueChange,
            accept,
            maxSize,
            onValidationError,
            disabled,
            disableChange,
            disableRemove,
            isMobile,
            labels,
            crop,
        })
        const displayedError = error ?? validationMessage
        const hasError = Boolean(displayedError)
        const buttonAriaInvalid = hasError ? true : ariaInvalid
        const hasDescription = Boolean(displayedError || helperText)
        const actionLabel = hasValue
            ? resolvedLabels.change
            : resolvedLabels.choose
        // The picker button is named "<label> <action>", e.g. "Profile picture Change image".
        const previewLabelledBy = ariaLabel
            ? undefined
            : [ariaLabelledBy ?? labelId, actionId].filter(Boolean).join(' ')
        const describedBy =
      [ariaDescribedBy, hasDescription ? helperId : undefined]
          .filter(Boolean)
          .join(' ') || undefined
        const showDesktopRemove = !isMobile && hasValue && clearable
        const resolvedCropAspectRatio = cropAspectRatio ?? (
            shape === IMAGE_PICKER_SHAPES.circle
                ? 1
                : resolveImagePickerAspectRatio(aspectRatio)
        )
        const rootStyle = isMobile
            ? style
            : { width, ...style }
        const previewWrapperStyle = isMobile ? { width } : undefined

        return (
            <div
                ref={ref}
                className={cn(IMAGE_PICKER_STYLES.root, className)}
                style={rootStyle}
                data-mobile={isMobile ? 'true' : 'false'}
                {...rootProps}
            >
                {label && (
                    <FormLabel
                        id={labelId}
                        disabled={disabled}
                        required={required}
                    >
                        {label}
                    </FormLabel>
                )}

                <div
                    className={IMAGE_PICKER_STYLES.wrapper}
                    style={previewWrapperStyle}
                >
                    <ImagePickerPreview
                        actionId={actionId}
                        actionLabel={actionLabel}
                        alt={alt ?? label ?? resolvedLabels.selected}
                        ariaDescribedBy={describedBy}
                        ariaInvalid={buttonAriaInvalid}
                        ariaLabel={ariaLabel}
                        ariaLabelledBy={previewLabelledBy}
                        aspectRatio={aspectRatio}
                        disabled={isChangeDisabled}
                        emptyLabel={resolvedLabels.empty}
                        hasError={hasError}
                        hasValue={hasValue}
                        height={height}
                        icon={icon}
                        isDragging={isDragging}
                        isMobile={isMobile}
                        objectFit={objectFit}
                        onClick={handleOpen}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        previewUrl={previewUrl}
                        shape={shape}
                    />

                    {showDesktopRemove && (
                        <ImagePickerRemoveButton
                            disabled={isRemoveDisabled}
                            label={resolvedLabels.remove}
                            onClick={handleClear}
                            shape={shape}
                        />
                    )}

                    <ImagePickerInput
                        accept={accept}
                        capture={capture}
                        disabled={isChangeDisabled}
                        id={resolvedInputId}
                        inputRef={inputRef}
                        name={name}
                        required={required && !hasValue}
                        onChange={handleInputChange}
                    />
                </div>

                {isMobile && (
                    <ImagePickerActions
                        actionLabel={actionLabel}
                        changeDisabled={isChangeDisabled}
                        hasValue={hasValue}
                        onChange={handleOpen}
                        onRemove={handleClear}
                        removeDisabled={isRemoveDisabled}
                        removeLabel={resolvedLabels.remove}
                        showRemove={clearable}
                    />
                )}

                {hasDescription && (
                    <HelperText
                        id={helperId}
                        hasError={hasError}
                    >
                        {displayedError ?? helperText}
                    </HelperText>
                )}

                {pendingCropFile && (
                    <ImagePickerCropDialog
                        file={pendingCropFile}
                        aspectRatio={resolvedCropAspectRatio}
                        shape={shape}
                        labels={resolvedLabels}
                        onCancel={handleCropCancel}
                        onConfirm={handleCropConfirm}
                    />
                )}
            </div>
        )
    },
)

ImagePicker.displayName = 'ImagePicker'

export default ImagePicker
