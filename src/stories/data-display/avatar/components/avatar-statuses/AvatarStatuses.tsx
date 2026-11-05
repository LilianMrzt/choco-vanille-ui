import { Avatar } from '@components/data-display/avatar'
import { Flex } from '@components/layout/flex'
import { STATUSES } from '@stories/data-display/avatar/constants'
import type { ReactElement } from 'react'

const AvatarStatuses = (): ReactElement => (
    <Flex gap={12}>
        {STATUSES.map((status) => (
            <Avatar
                aria-label={`Jane Doe, ${status}`}
                initials={'JD'}
                key={status}
                status={status}
            />
        ))}
    </Flex>
)

export default AvatarStatuses
