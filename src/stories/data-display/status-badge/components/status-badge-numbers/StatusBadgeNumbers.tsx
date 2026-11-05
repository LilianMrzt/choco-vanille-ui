import { Avatar } from '@components/data-display/avatar'
import {
    StatusBadge
} from '@components/data-display/status-badge'
import { Flex } from '@components/layout/flex'
import { type ReactElement } from 'react'

const StatusBadgeNumbers = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={32}
        padding={12}
    >
        <StatusBadge
            number={0}
            size={'sm'}
        >
            <Avatar initials={'SM'} />
        </StatusBadge>
        <StatusBadge
            number={12}
            size={'md'}
        >
            <Avatar initials={'MD'} />
        </StatusBadge>
        <StatusBadge
            number={123456}
            size={'lg'}
        >
            <Avatar initials={'LG'} />
        </StatusBadge>
    </Flex>
)

export default StatusBadgeNumbers
