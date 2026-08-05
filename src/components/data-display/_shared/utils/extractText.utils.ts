import { isValidElement, type ReactNode } from 'react'

export const extractTextFromReactNode = (value: ReactNode): string => {
    if (typeof value === 'string' || typeof value === 'number') {
        return String(value)
    }

    if (Array.isArray(value)) {
        return value.map(extractTextFromReactNode).join('')
    }

    if (isValidElement<{ children?: ReactNode }>(value)) {
        return extractTextFromReactNode(value.props.children)
    }

    return ''
}
