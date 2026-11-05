import { Avatar } from '@components/data-display/avatar'
import {
    StatusBadge
} from '@components/data-display/status-badge'
import { Flex } from '@components/layout/flex'
import { type ReactElement } from 'react'

const StatusBadgeSizes = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={32}
        padding={12}
    >
        <StatusBadge size={'sm'}>
            <Avatar initials={'SM'} />
        </StatusBadge>
        <StatusBadge size={'md'}>
            <Avatar initials={'MD'} />
        </StatusBadge>
        <StatusBadge size={'lg'}>
            <Avatar initials={'LG'} />
        </StatusBadge>
    </Flex>
)

export default StatusBadgeSizes
