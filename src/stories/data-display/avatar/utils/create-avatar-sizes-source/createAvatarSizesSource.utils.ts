import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { SIZES } from '@stories/data-display/avatar/constants'
import sourceTemplate from '@stories/data-display/avatar/utils/create-avatar-sizes-source/sources/createAvatarSizesSource.source.tsx.txt?raw'
import itemTemplate from '@stories/data-display/avatar/utils/create-avatar-sizes-source/sources/AvatarSize.source.tsx.txt?raw'

export const createAvatarSizesSource = (): string => {
    const avatars = SIZES.map((size) => '    ' + renderSource(itemTemplate, {
        label: JSON.stringify('Jane Doe, ' + size),
        size: JSON.stringify(size),
    })).join('\n')

    return renderSource(sourceTemplate, { avatars })
}
