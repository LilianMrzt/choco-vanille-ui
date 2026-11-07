import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import template from '@stories/navigation/bottom-navigation/utils/create-sizes-source/sources/sizes.source.txt?raw'
import heights from '@stories/navigation/bottom-navigation/sources/CustomHeights.source.txt?raw'
import widths from '@stories/navigation/bottom-navigation/sources/ParentWidths.source.txt?raw'

/**
 * Combines consumer compositions as separate examples with one import block.
 * @internal Storybook-only utility; not part of the public package API.
 * @returns Source for all four visible size comparison instances.
 * @example createSizesSource()
 */
export const createSizesSource = (): string => renderSource(template, {
    heights: heights.slice(heights.indexOf('<')).trim(),
    widths: widths.slice(widths.indexOf('<')).trim(),
})
