import type { Area, Point } from 'react-easy-crop'
import { useCallback, useEffect, useState } from 'react'

import type {
    UseImagePickerCropOptions,
    UseImagePickerCropReturn,
} from '@components/forms/image-picker/hooks/types'
import { createImagePickerCroppedFile } from '@components/forms/image-picker/utils/imagePicker.utils.ts'

/**
 * Manages cropper state and turns a selected crop area into a local file.
 *
 * The hook does not update picker state itself. Its caller decides when the
 * generated file becomes the committed ImagePicker value.
 */
export const useImagePickerCrop = ({
    file,
    cropErrorLabel,
    onConfirm,
}: UseImagePickerCropOptions): UseImagePickerCropReturn => {
    const [imageUrl, setImageUrl] = useState<string>()
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()
    const [isProcessing, setIsProcessing] = useState(false)
    const [cropError, setCropError] = useState<string>()

    useEffect(() => {
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setCroppedAreaPixels(undefined)
        setCropError(undefined)

        if (
            typeof URL === 'undefined'
            || typeof URL.createObjectURL !== 'function'
        ) {
            setImageUrl(undefined)
            setCropError(cropErrorLabel)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setImageUrl(objectUrl)

        return () => {
            if (typeof URL.revokeObjectURL === 'function') {
                URL.revokeObjectURL(objectUrl)
            }
        }
    }, [cropErrorLabel, file])

    const handleCropComplete = useCallback(
        (_croppedArea: Area, nextCroppedAreaPixels: Area) => {
            setCroppedAreaPixels(nextCroppedAreaPixels)
        },
        [],
    )

    const handleMediaLoaded = useCallback(() => {
        setCropError(undefined)
    }, [])

    const handleMediaError = useCallback(() => {
        setCropError(cropErrorLabel)
    }, [cropErrorLabel])

    const handleConfirm = useCallback(async () => {
        if (!imageUrl || !croppedAreaPixels || isProcessing) {
            return
        }

        setIsProcessing(true)
        setCropError(undefined)

        let croppedFile: File
        try {
            croppedFile = await createImagePickerCroppedFile(
                file,
                croppedAreaPixels,
            )
        } catch {
            setCropError(cropErrorLabel)
            setIsProcessing(false)
            return
        }

        setIsProcessing(false)
        onConfirm(croppedFile)
    }, [
        cropErrorLabel,
        croppedAreaPixels,
        file,
        imageUrl,
        isProcessing,
        onConfirm,
    ])

    return {
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
    }
}
