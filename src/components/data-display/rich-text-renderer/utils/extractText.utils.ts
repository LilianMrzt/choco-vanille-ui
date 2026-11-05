import { isValidElement, type ReactNode } from 'react'

/**
 * Extracts visible text from nested React content for rich-text link labels.
 * Null, booleans and elements without children contribute no text.
 *
 * @param value - Text, arrays or elements whose children should be read.
 * @returns Concatenated text without adding separators.
 * @example
 * extractTextFromReactNode(['Read ', 'more'])
 */
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
