import { Badge } from '@components/data-display/badge'
import { Flex } from '@components/layout/flex'
import { COLORS } from '@stories/data-display/badge/constants'
import { type ReactElement } from 'react'

const BadgeColors = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={12}
        maxWidth={'40rem'}
    >
        {COLORS.map((color) => (
            <Badge
                key={color}
                color={color}
                label={color}
            />
        ))}
    </Flex>
)

export default BadgeColors
