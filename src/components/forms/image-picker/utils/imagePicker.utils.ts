import type { CSSProperties, DragEvent } from 'react'
import type { Area } from 'react-easy-crop'

import type { ImagePickerValue } from '@components/forms/image-picker/types/ImagePicker.types.ts'

/**
 * Checks whether a picker value is a locally selected file.
 *
 * @param value The current picker value to narrow.
 * @returns `true` when `value` is a `File`.
 */
export const isImagePickerFile = (
    value: ImagePickerValue,
): value is File =>
    typeof File !== 'undefined' && value instanceof File

/**
 * Checks whether a drag event contains files rather than unrelated data.
 *
 * @param event The drag event emitted by the preview button.
 * @returns `true` when the event advertises files or contains at least one file.
 */
export const hasImagePickerFiles = (event: DragEvent): boolean => {
    const dataTransfer = event.dataTransfer
    const types = Array.from(dataTransfer?.types ?? [])

    return types.includes('Files') || Boolean(dataTransfer?.files?.length)
}

/**
 * Resolves a CSS aspect-ratio value to the numeric ratio required by the
 * cropper.
 *
 * @param aspectRatio The CSS ratio, such as `16 / 9`, or a numeric ratio.
 * @returns The positive numeric ratio, or `undefined` for non-fixed values.
 */
export const resolveImagePickerAspectRatio = (
    aspectRatio: CSSProperties['aspectRatio'],
): number | undefined => {
    if (typeof aspectRatio === 'number') {
        return Number.isFinite(aspectRatio) && aspectRatio > 0
            ? aspectRatio
            : undefined
    }

    if (typeof aspectRatio !== 'string') {
        return undefined
    }

    const numericRatio = Number(aspectRatio.trim())
    if (Number.isFinite(numericRatio) && numericRatio > 0) {
        return numericRatio
    }

    const ratioParts = aspectRatio.split('/').map((part) => Number(part.trim()))
    if (
        ratioParts.length !== 2
        || ratioParts.some((part) => !Number.isFinite(part) || part <= 0)
    ) {
        return undefined
    }

    return ratioParts[0] / ratioParts[1]
}

/**
 * Tests a file against a native-style comma-separated `accept` value.
 *
 * MIME types, MIME wildcards such as `image/*`, and file extensions are
 * supported. An empty `accept` value accepts every file.
 *
 * @param file The file to validate.
 * @param accept The comma-separated accepted MIME types or extensions.
 * @returns `true` when the file matches at least one accepted value.
 */
export const acceptsImagePickerFile = (
    file: File,
    accept: string,
): boolean => {
    const acceptedTypes = accept
        .split(',')
        .map((type) => type.trim().toLowerCase())
        .filter(Boolean)

    if (acceptedTypes.length === 0) {
        return true
    }

    const fileType = file.type.toLowerCase()
    const fileName = file.name.toLowerCase()

    return acceptedTypes.some((acceptedType) => {
        if (acceptedType.startsWith('.')) {
            return fileName.endsWith(acceptedType)
        }

        if (acceptedType.endsWith('/*')) {
            return fileType.startsWith(acceptedType.slice(0, -1))
        }

        return fileType === acceptedType
    })
}

/**
 * Mirrors a local file value into the native file input so form submission and
 * validation stay consistent with the picker preview.
 *
 * URL and empty values clear the input. Local files are assigned through
 * `DataTransfer` when the browser supports it; unsupported environments leave
 * the input cleared.
 *
 * @param input The native file input to synchronize, if mounted.
 * @param value The current picker value.
 */
export const syncImagePickerInput = (
    input: HTMLInputElement | null,
    value: ImagePickerValue,
) => {
    if (!input) {
        return
    }

    if (!isImagePickerFile(value)) {
        input.value = ''
        return
    }

    if (input.files?.[0] === value) {
        return
    }

    input.value = ''

    if (typeof DataTransfer !== 'function') {
        return
    }

    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(value)
    input.files = dataTransfer.files
}

const loadImagePickerImage = (source: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error('The image could not be loaded.'))
        image.src = source
    })

/**
 * Renders a crop area into a new local image file.
 *
 * The crop coordinates emitted by `react-easy-crop` are already expressed in
 * the source image's natural pixels, so no additional scale conversion is
 * needed before drawing to the canvas.
 *
 * @param file The original local image file.
 * @param cropAreaPixels The selected crop rectangle in source-image pixels.
 * @returns A new file with the original name and image MIME type.
 * @throws When the browser cannot load the image, create a canvas context, or
 *         encode the cropped canvas.
 */
export const createImagePickerCroppedFile = async (
    file: File,
    cropAreaPixels: Area,
): Promise<File> => {
    if (
        typeof document === 'undefined'
        || typeof URL === 'undefined'
        || typeof URL.createObjectURL !== 'function'
    ) {
        throw new Error('Image cropping is not available in this environment.')
    }

    const sourceUrl = URL.createObjectURL(file)

    try {
        const image = await loadImagePickerImage(sourceUrl)
        const width = Math.max(1, Math.round(cropAreaPixels.width))
        const height = Math.max(1, Math.round(cropAreaPixels.height))
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')
        if (!context) {
            throw new Error('The image crop canvas is not available.')
        }

        context.drawImage(
            image,
            Math.round(cropAreaPixels.x),
            Math.round(cropAreaPixels.y),
            width,
            height,
            0,
            0,
            width,
            height,
        )

        const outputType = file.type || 'image/png'
        const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((result) => {
                if (result) {
                    resolve(result)
                    return
                }

                reject(new Error('The cropped image could not be encoded.'))
            }, outputType)
        })

        return new File([blob], file.name, {
            type: blob.type || outputType,
            lastModified: file.lastModified,
        })
    } finally {
        if (typeof URL.revokeObjectURL === 'function') {
            URL.revokeObjectURL(sourceUrl)
        }
    }
}
