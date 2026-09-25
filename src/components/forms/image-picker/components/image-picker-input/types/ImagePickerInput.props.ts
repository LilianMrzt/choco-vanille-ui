import type { ChangeEvent, InputHTMLAttributes, RefObject } from 'react'

export type ImagePickerInputProps = {
    accept: string
    capture?: InputHTMLAttributes<HTMLInputElement>['capture']
    disabled: boolean
    id: string
    inputRef: RefObject<HTMLInputElement | null>
    name?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    required: boolean
}
