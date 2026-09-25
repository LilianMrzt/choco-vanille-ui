import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type DragEvent,
} from 'react'

import {
    IMAGE_PICKER_DEFAULT_ACCEPT,
    IMAGE_PICKER_DEFAULT_LABELS,
    IMAGE_PICKER_MOBILE_LABELS,
} from '@components/forms/image-picker/constants/imagePickerDefaults.const.ts'
import type {
    UseImagePickerOptions,
    UseImagePickerReturn,
} from '@components/forms/image-picker/hooks/types'
import type {
    ImagePickerValidationReason,
    ImagePickerValue,
} from '@components/forms/image-picker/types/ImagePicker.types.ts'
import {
    acceptsImagePickerFile,
    hasImagePickerFiles,
    isImagePickerFile,
    syncImagePickerInput,
} from '@components/forms/image-picker/utils/imagePicker.utils.ts'

/**
 * Manages value state and browser interactions for ImagePicker.
 *
 * Supports controlled and uncontrolled values, local preview URLs, native
 * input synchronization, file validation, chooser opening, drag and drop, and
 * removal. The returned handlers are ready to pass to the ImagePicker
 * subcomponents.
 */
export const useImagePicker = ({
    value,
    defaultValue = null,
    onValueChange,
    accept = IMAGE_PICKER_DEFAULT_ACCEPT,
    maxSize,
    onValidationError,
    disabled = false,
    disableChange = false,
    disableRemove = false,
    isMobile = false,
    labels,
}: UseImagePickerOptions): UseImagePickerReturn => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [uncontrolledValue, setUncontrolledValue] =
        useState<ImagePickerValue>(defaultValue)
    const [filePreviewUrl, setFilePreviewUrl] = useState<string>()
    const [validationReason, setValidationReason] =
        useState<ImagePickerValidationReason>()
    const [isDragging, setIsDragging] = useState(false)

    const isControlled = value !== undefined
    const currentValue = isControlled ? value : uncontrolledValue
    const hasValue = currentValue !== null
    const isChangeDisabled = disabled || disableChange
    const isRemoveDisabled = disabled || disableRemove
    const resolvedLabels = {
        ...(isMobile ? IMAGE_PICKER_MOBILE_LABELS : IMAGE_PICKER_DEFAULT_LABELS),
        ...labels,
    }
    const previewUrl = typeof currentValue === 'string'
        ? currentValue
        : filePreviewUrl
    const validationMessage = validationReason
        ? resolvedLabels[validationReason]
        : undefined

    useEffect(() => {
        if (
            !isImagePickerFile(currentValue) ||
            typeof URL === 'undefined' ||
            typeof URL.createObjectURL !== 'function'
        ) {
            setFilePreviewUrl(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(currentValue)
        setFilePreviewUrl(objectUrl)

        return () => {
            if (typeof URL.revokeObjectURL === 'function') {
                URL.revokeObjectURL(objectUrl)
            }
        }
    }, [currentValue])

    useEffect(() => {
        syncImagePickerInput(inputRef.current, currentValue)
    }, [currentValue])

    const updateValue = useCallback(
        (nextValue: ImagePickerValue) => {
            if (!isControlled) {
                setUncontrolledValue(nextValue)
            }
            onValueChange?.(nextValue)
        },
        [isControlled, onValueChange],
    )

    const handleOpen = useCallback(() => {
        if (!isChangeDisabled) {
            inputRef.current?.click()
        }
    }, [isChangeDisabled])

    const handleFile = useCallback(
        (file: File) => {
            if (isChangeDisabled) {
                return
            }

            let reason: ImagePickerValidationReason | undefined

            if (!acceptsImagePickerFile(file, accept)) {
                reason = 'invalidType'
            } else if (maxSize !== undefined && file.size > maxSize) {
                reason = 'maxSize'
            }

            if (reason) {
                setValidationReason(reason)
                syncImagePickerInput(inputRef.current, currentValue)
                onValidationError?.(
                    reason === 'maxSize'
                        ? { reason, file, maxSize }
                        : { reason, file },
                )
                return
            }

            setValidationReason(undefined)
            syncImagePickerInput(inputRef.current, file)
            updateValue(file)
        },
        [
            accept,
            currentValue,
            isChangeDisabled,
            maxSize,
            onValidationError,
            updateValue,
        ],
    )

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (file) {
                handleFile(file)
            }
        },
        [handleFile],
    )

    const handleDragOver = useCallback(
        (event: DragEvent<HTMLButtonElement>) => {
            if (!hasImagePickerFiles(event)) {
                return
            }

            event.preventDefault()
            event.dataTransfer.dropEffect = isChangeDisabled ? 'none' : 'copy'
            if (!isChangeDisabled) {
                setIsDragging(true)
            }
        },
        [isChangeDisabled],
    )

    const handleDragLeave = useCallback(
        (event: DragEvent<HTMLButtonElement>) => {
            if (event.target !== event.currentTarget) {
                return
            }

            const relatedTarget = event.relatedTarget
            if (
                typeof Node !== 'undefined'
                && relatedTarget instanceof Node
                && event.currentTarget.contains(relatedTarget)
            ) {
                return
            }

            setIsDragging(false)
        },
        [],
    )

    const handleDrop = useCallback(
        (event: DragEvent<HTMLButtonElement>) => {
            if (!hasImagePickerFiles(event)) {
                return
            }

            event.preventDefault()
            setIsDragging(false)
            if (isChangeDisabled) {
                return
            }

            const file = event.dataTransfer.files?.[0]
            if (file) {
                handleFile(file)
            }
        },
        [handleFile, isChangeDisabled],
    )

    const handleClear = useCallback(() => {
        if (isRemoveDisabled) {
            return
        }

        setValidationReason(undefined)
        setIsDragging(false)
        updateValue(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [isRemoveDisabled, updateValue])

    return {
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
    }
}
