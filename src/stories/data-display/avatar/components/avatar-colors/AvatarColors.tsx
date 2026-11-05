import { Avatar } from '@components/data-display/avatar'
import { Flex } from '@components/layout/flex'
import { COLORS } from '@stories/data-display/avatar/constants'
import type { ReactElement } from 'react'

const AvatarColors = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
        maxWidth={'30rem'}
    >
        {COLORS.map((color) => (
            <Avatar
                aria-label={`Jane Doe, ${color}`}
                color={color}
                initials={'JD'}
                key={color}
            />
        ))}
    </Flex>
)

export default AvatarColors
