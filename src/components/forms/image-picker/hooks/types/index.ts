import type { ChangeEvent, DragEvent, RefObject } from 'react'

import type { ImagePickerProps } from '@components/forms/image-picker/types/ImagePicker.props.ts'
import type { ImagePickerLabels } from '@components/forms/image-picker/types/ImagePicker.types.ts'

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
>

/** State and event handlers returned by the ImagePicker hook. */
export type UseImagePickerReturn = {
    /** Ref attached to the hidden native file input. */
    inputRef: RefObject<HTMLInputElement | null>
    /** URL used by the preview, either the supplied URL or a local object URL. */
    previewUrl: string | undefined
    /** Labels merged from the desktop or mobile defaults and consumer overrides. */
    resolvedLabels: ImagePickerLabels
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
}
