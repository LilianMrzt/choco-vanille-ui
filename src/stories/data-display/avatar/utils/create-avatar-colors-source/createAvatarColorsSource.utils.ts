import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { COLORS } from '@stories/data-display/avatar/constants'
import sourceTemplate from '@stories/data-display/avatar/utils/create-avatar-colors-source/sources/createAvatarColorsSource.source.tsx.txt?raw'
import itemTemplate from '@stories/data-display/avatar/utils/create-avatar-colors-source/sources/AvatarColor.source.tsx.txt?raw'

export const createAvatarColorsSource = (): string => {
    const avatars = COLORS.map((color) => '    ' + renderSource(itemTemplate, {
        label: JSON.stringify('Jane Doe, ' + color),
        color: JSON.stringify(color),
    })).join('\n')

    return renderSource(sourceTemplate, { avatars })
}
