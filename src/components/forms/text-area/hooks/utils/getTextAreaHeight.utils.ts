import type { TextAreaHeightOptions } from '@components/forms/text-area/hooks/types'
import { getLineHeight } from '@components/forms/text-area/hooks/utils/getLineHeight.utils'
import { getVerticalExtras } from '@components/forms/text-area/hooks/utils/getVerticalExtras.utils'

/**
 * Computes the height (in px) a `<textarea>` should have to fit its content
 * between `minRows` and `maxRows`, based on its current computed style and
 * `scrollHeight`.
 */
export const getTextAreaHeight = (el: HTMLTextAreaElement, { minRows, maxRows }: TextAreaHeightOptions): number => {
    const computed = window.getComputedStyle(el)
    const lineHeight = getLineHeight(computed)
    const verticalExtras = getVerticalExtras(computed)

    const minHeight = minRows !== undefined ? minRows * lineHeight + verticalExtras : undefined
    const maxHeight = maxRows !== undefined ? maxRows * lineHeight + verticalExtras : undefined

    // Reset height to auto so scrollHeight reflects the content size.
    el.style.height = 'auto'
    let newHeight = el.scrollHeight

    if (minHeight !== undefined) {
        newHeight = Math.max(newHeight, minHeight)
    }
    if (maxHeight !== undefined) {
        newHeight = Math.min(newHeight, maxHeight)
    }

    return newHeight
}
