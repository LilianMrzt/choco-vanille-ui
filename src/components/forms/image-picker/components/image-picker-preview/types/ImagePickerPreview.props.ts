import type { CSSProperties, DragEvent, HTMLAttributes } from 'react'

import type { IconComponent } from '@components/foundation/icon'
import type {
    ImagePickerObjectFit,
    ImagePickerShape,
} from '@components/forms/image-picker/types/ImagePicker.types.ts'

export type ImagePickerPreviewProps = {
    actionId: string
    actionLabel: string
    alt: string
    ariaDescribedBy?: string
    ariaInvalid?: HTMLAttributes<HTMLButtonElement>['aria-invalid']
    ariaLabel?: string
    ariaLabelledBy?: string
    aspectRatio?: CSSProperties['aspectRatio']
    disabled: boolean
    emptyLabel: string
    hasError: boolean
    hasValue: boolean
    height?: CSSProperties['height']
    icon?: IconComponent
    isDragging: boolean
    isMobile: boolean
    objectFit: ImagePickerObjectFit
    onClick: () => void
    onDragLeave?: (event: DragEvent<HTMLButtonElement>) => void
    onDragOver?: (event: DragEvent<HTMLButtonElement>) => void
    onDrop?: (event: DragEvent<HTMLButtonElement>) => void
    previewUrl?: string
    shape: ImagePickerShape
}
