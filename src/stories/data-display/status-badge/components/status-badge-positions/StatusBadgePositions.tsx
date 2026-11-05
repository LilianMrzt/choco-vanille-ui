import { Avatar } from '@components/data-display/avatar'
import {
    StatusBadge
} from '@components/data-display/status-badge'
import { Flex } from '@components/layout/flex'
import { type ReactElement } from 'react'

const StatusBadgePositions = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={32}
        padding={16}
    >
        <StatusBadge position={'top-left'}>
            <Avatar initials={'TL'} />
        </StatusBadge>
        <StatusBadge position={'top-right'}>
            <Avatar initials={'TR'} />
        </StatusBadge>
        <StatusBadge position={'bottom-left'}>
            <Avatar initials={'BL'} />
        </StatusBadge>
        <StatusBadge position={'bottom-right'}>
            <Avatar initials={'BR'} />
        </StatusBadge>
    </Flex>
)

export default StatusBadgePositions
