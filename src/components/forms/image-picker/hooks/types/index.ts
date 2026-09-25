import type { ChangeEvent, DragEvent, RefObject } from 'react'
import type { Area, Point } from 'react-easy-crop'

import type { ImagePickerProps } from '@components/forms/image-picker/types/ImagePicker.props.ts'
import type { ImagePickerResolvedLabels } from '@components/forms/image-picker/types/ImagePicker.types.ts'

/** Options consumed by the ImagePicker state and interaction hook. */
export type UseImagePickerOptions = Pick<
    ImagePickerProps,
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'accept'
    | 'maxSize'
    | 'onValidationError'
    | 'disabled'
    | 'disableChange'
    | 'disableRemove'
    | 'isMobile'
    | 'labels'
    | 'crop'
>

/** State and event handlers returned by the ImagePicker hook. */
export type UseImagePickerReturn = {
    /** Ref attached to the hidden native file input. */
    inputRef: RefObject<HTMLInputElement | null>
    /** URL used by the preview, either the supplied URL or a local object URL. */
    previewUrl: string | undefined
    /** Labels merged from the desktop or mobile defaults and consumer overrides. */
    resolvedLabels: ImagePickerResolvedLabels
    /** Localized validation feedback for the most recently rejected file. */
    validationMessage: string | undefined
    /** Whether the picker currently contains an image value. */
    hasValue: boolean
    /** Whether choosing, changing, and drag-and-drop interactions are disabled. */
    isChangeDisabled: boolean
    /** Whether remove interactions are disabled. */
    isRemoveDisabled: boolean
    /** Whether a supported file is currently dragged over the preview. */
    isDragging: boolean
    /** The validated file waiting for the user to confirm a crop. */
    pendingCropFile: File | undefined
    /** Opens the native file chooser unless changing is disabled. */
    handleOpen: () => void
    /** Validates and stores the first file selected by the native input. */
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    /** Updates the drag state for file drag-over events. */
    handleDragOver: (event: DragEvent<HTMLButtonElement>) => void
    /** Clears the drag state when a file leaves the preview. */
    handleDragLeave: (event: DragEvent<HTMLButtonElement>) => void
    /** Validates and stores the first file dropped on the preview. */
    handleDrop: (event: DragEvent<HTMLButtonElement>) => void
    /** Clears the selected value unless removal is disabled. */
    handleClear: () => void
    /** Discards the pending crop and restores the committed form value. */
    handleCropCancel: () => void
    /** Commits the cropped file and synchronizes the native input. */
    handleCropConfirm: (file: File) => void
}

/** Options for the internal crop interaction hook. */
export type UseImagePickerCropOptions = {
    /** The validated local file being edited. */
    file: File
    /** Localized message shown when crop generation fails. */
    cropErrorLabel: string
    /** Receives the generated file after a successful crop. */
    onConfirm: (file: File) => void
}

/** Crop state and handlers returned to the internal crop dialog. */
export type UseImagePickerCropReturn = {
    /** Object URL used as the crop editor source image. */
    imageUrl: string | undefined
    /** Current crop position. */
    crop: Point
    /** Updates the crop position. */
    setCrop: (location: Point) => void
    /** Current crop zoom level. */
    zoom: number
    /** Updates the crop zoom level. */
    setZoom: (value: number) => void
    /** Crop rectangle in source-image pixels. */
    croppedAreaPixels: Area | undefined
    /** Stores the latest crop rectangle emitted by the cropper. */
    handleCropComplete: (
        croppedArea: Area,
        croppedAreaPixels: Area,
    ) => void
    /** Clears the crop error after the source image loads. */
    handleMediaLoaded: () => void
    /** Surfaces a source-image loading failure in the dialog. */
    handleMediaError: () => void
    /** Whether the crop file is currently being generated. */
    isProcessing: boolean
    /** Localized crop generation error, when one occurred. */
    cropError: string | undefined
    /** Generates and submits the cropped file when the crop is ready. */
    handleConfirm: () => Promise<void>
}
