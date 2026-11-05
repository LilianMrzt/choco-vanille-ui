import { Badge } from '@components/data-display/badge'
import { Flex } from '@components/layout/flex'
import { SIZES } from '@stories/data-display/badge/constants'
import { type ReactElement } from 'react'

const BadgeSizes = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={12}
    >
        {SIZES.map((size) => (
            <Badge
                key={size}
                label={size.toUpperCase()}
                size={size}
            />
        ))}
    </Flex>
)

export default BadgeSizes
