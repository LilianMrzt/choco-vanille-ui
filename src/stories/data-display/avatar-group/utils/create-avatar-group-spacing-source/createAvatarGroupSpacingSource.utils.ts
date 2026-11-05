import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { SPACINGS } from '@stories/data-display/avatar-group/constants'
import sourceTemplate from '@stories/data-display/avatar-group/utils/create-avatar-group-spacing-source/sources/createAvatarGroupSpacingSource.source.tsx.txt?raw'
import itemTemplate from '@stories/data-display/avatar-group/utils/create-avatar-group-spacing-source/sources/AvatarGroupSpacing.source.tsx.txt?raw'

export const createAvatarGroupSpacingSource = (): string => {
    const groups = SPACINGS.map((spacing) => renderSource(itemTemplate, {
        label: JSON.stringify('Participants, ' + spacing),
        spacing: JSON.stringify(spacing),
    }).replace(/^/gm, '    ')).join('\n\n')

    return renderSource(sourceTemplate, { groups })
}
