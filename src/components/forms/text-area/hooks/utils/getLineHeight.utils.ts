import { FALLBACK_LINE_HEIGHT, FALLBACK_LINE_HEIGHT_RATIO } from '@components/forms/text-area/hooks/constants'

/**
 * Reads the resolved line-height of an element. `line-height: normal` (and
 * any non-length value) parses to NaN, which would poison the height math,
 * so we fall back to a font-size-derived value.
 */
export const getLineHeight = (computed: CSSStyleDeclaration): number => {
    const lineHeight = parseFloat(computed.lineHeight)
    if (!Number.isNaN(lineHeight)) {
        return lineHeight
    }

    const fontSize = parseFloat(computed.fontSize)
    return Number.isNaN(fontSize) ? FALLBACK_LINE_HEIGHT : fontSize * FALLBACK_LINE_HEIGHT_RATIO
}
