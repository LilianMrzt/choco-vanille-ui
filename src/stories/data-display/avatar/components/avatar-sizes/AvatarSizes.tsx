import { Avatar } from '@components/data-display/avatar'
import { Flex } from '@components/layout/flex'
import { SIZES } from '@stories/data-display/avatar/constants'
import type { ReactElement } from 'react'

const AvatarSizes = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={12}
    >
        {SIZES.map((size) => (
            <Avatar
                aria-label={`Jane Doe, ${size}`}
                initials={'JD'}
                key={size}
                size={size}
            />
        ))}
    </Flex>
)

export default AvatarSizes
