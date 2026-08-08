import type { ReactNode } from 'react'

export type TextFieldLabelProps = {
    htmlFor?: string
    disabled?: boolean
    required?: boolean
    children: ReactNode
}
