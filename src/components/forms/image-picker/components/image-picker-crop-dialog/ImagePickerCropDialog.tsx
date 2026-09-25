import Cropper from 'react-easy-crop'
import { useId, memo } from 'react'

import { Button } from '@components/actions/button'
import { Slider } from '@components/forms/slider'
import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import { Box } from '@components/layout/box'
import { Flex } from '@components/layout/flex'
import { IMAGE_PICKER_CROP_DIALOG_STYLES } from '@components/forms/image-picker/components/image-picker-crop-dialog/styles/ImagePickerCropDialog.css.ts'
import type { ImagePickerCropDialogProps } from '@components/forms/image-picker/components/image-picker-crop-dialog/types/ImagePickerCropDialog.props.ts'
import { useImagePickerCrop } from '@components/forms/image-picker/hooks/useImagePickerCrop.hook.ts'
import { Dialog } from '@components/overlay/dialog'
import { IMAGE_PICKER_SHAPES } from '@components/forms/image-picker/constants'

/**
 * Internal crop editor for a validated local ImagePicker file.
 *
 * The dialog owns crop interaction and file generation but does not commit
 * picker state until its parent accepts the generated file.
 */
export const ImagePickerCropDialog = memo<ImagePickerCropDialogProps>(
    ({ file, aspectRatio, shape, labels, onCancel, onConfirm }) => {
        const minZoom = 1
        const maxZoom = 3
        const zoomStep = 0.1
        const titleId = useId()
        const errorId = useId()
        const {
            imageUrl,
            crop,
            setCrop,
            zoom,
            setZoom,
            croppedAreaPixels,
            handleCropComplete,
            handleMediaLoaded,
            handleMediaError,
            isProcessing,
            cropError,
            handleConfirm,
        } = useImagePickerCrop({
            file,
            cropErrorLabel: labels.cropError,
            onConfirm,
        })

        const handleOpenChange = (open: boolean) => {
            if (!open && !isProcessing) {
                onCancel()
            }
        }

        const resolvedAspectRatio = (
            typeof aspectRatio === 'number'
            && Number.isFinite(aspectRatio)
            && aspectRatio > 0
        )
            ? aspectRatio
            : 4 / 3
        const cropShape = shape === IMAGE_PICKER_SHAPES.circle
            ? 'round'
            : 'rect'
        const cropAreaClassName = shape === IMAGE_PICKER_SHAPES.rounded
            ? IMAGE_PICKER_CROP_DIALOG_STYLES.roundedCropArea
            : undefined

        return (
            <Dialog
                open
                onOpenChange={handleOpenChange}
            >
                <Dialog.Content
                    size={'lg'}
                    aria-labelledby={titleId}
                    aria-describedby={cropError ? errorId : undefined}
                >
                    <Dialog.Header
                        title={labels.crop}
                        titleProps={{ id: titleId }}
                        showCloseButton={false}
                    />
                    <Dialog.Body padding={'lg'}>
                        <Flex
                            flexDirection={'column'}
                            gap={'md'}
                        >
                            <Box className={IMAGE_PICKER_CROP_DIALOG_STYLES.viewport}>
                                {imageUrl && (
                                    <Cropper
                                        image={imageUrl}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={resolvedAspectRatio}
                                        minZoom={minZoom}
                                        maxZoom={maxZoom}
                                        zoomSpeed={zoomStep}
                                        cropShape={cropShape}
                                        showGrid
                                        roundCropAreaPixels
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={handleCropComplete}
                                        onMediaLoaded={handleMediaLoaded}
                                        mediaProps={{ onError: handleMediaError }}
                                        cropperProps={{
                                            role: 'group',
                                            'aria-label': labels.cropArea,
                                        }}
                                        classes={{ cropAreaClassName }}
                                    />
                                )}
                            </Box>
                            <Slider
                                label={labels.zoom}
                                value={zoom}
                                min={minZoom}
                                max={maxZoom}
                                step={zoomStep}
                                showValue
                                onValueChange={(value) => {
                                    if (typeof value === 'number') {
                                        setZoom(value)
                                    }
                                }}
                            />
                            {cropError && (
                                <HelperText
                                    id={errorId}
                                    hasError
                                >
                                    {cropError}
                                </HelperText>
                            )}
                        </Flex>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.Close>
                            <Button
                                type={'button'}
                                label={labels.cancel}
                                variant={'outlined'}
                                color={'primary'}
                                disabled={isProcessing}
                            />
                        </Dialog.Close>
                        <Button
                            type={'button'}
                            label={labels.apply}
                            variant={'contained'}
                            color={'primary'}
                            disabled={!croppedAreaPixels || isProcessing}
                            onClick={handleConfirm}
                        />
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog>
        )
    },
)

ImagePickerCropDialog.displayName = 'ImagePicker.CropDialog'
