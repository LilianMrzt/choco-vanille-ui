import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { STATUSES } from '@stories/data-display/avatar/constants'
import sourceTemplate from '@stories/data-display/avatar/utils/create-avatar-statuses-source/sources/createAvatarStatusesSource.source.txt?raw'
import itemTemplate from '@stories/data-display/avatar/utils/create-avatar-statuses-source/sources/AvatarStatus.source.txt?raw'

export const createAvatarStatusesSource = (): string => {
    const avatars = STATUSES.map((status) => '    ' + renderSource(itemTemplate, {
        label: JSON.stringify('Jane Doe, ' + status),
        status: JSON.stringify(status),
    })).join('\n')

    return renderSource(sourceTemplate, { avatars })
}
