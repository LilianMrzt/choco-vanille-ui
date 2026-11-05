import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { COLORS } from '@stories/data-display/badge/constants'
import sourceTemplate from '@stories/data-display/badge/utils/create-badge-colors-source/sources/createBadgeColorsSource.source.tsx.txt?raw'
import itemTemplate from '@stories/data-display/badge/utils/create-badge-colors-source/sources/BadgeColor.source.tsx.txt?raw'

export const createBadgeColorsSource = (): string => {
    const colors = COLORS.map((color) => '    ' + renderSource(itemTemplate, {
        color: JSON.stringify(color),
    })).join('\n')

    return renderSource(sourceTemplate, { colors })
}
