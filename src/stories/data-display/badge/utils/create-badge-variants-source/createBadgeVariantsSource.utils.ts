import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { VARIANTS } from '@stories/data-display/badge/constants'
import sourceTemplate from '@stories/data-display/badge/utils/create-badge-variants-source/sources/createBadgeVariantsSource.source.tsx.txt?raw'
import itemTemplate from '@stories/data-display/badge/utils/create-badge-variants-source/sources/BadgeVariant.source.tsx.txt?raw'

export const createBadgeVariantsSource = (): string => {
    const variants = VARIANTS.map((variant) => '    ' + renderSource(itemTemplate, {
        variant: JSON.stringify(variant),
    })).join('\n')

    return renderSource(sourceTemplate, { variants })
}
