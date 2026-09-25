import type { DragEvent } from 'react'

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
