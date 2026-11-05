import { Badge } from '@components/data-display/badge'
import { Flex } from '@components/layout/flex'
import { VARIANTS } from '@stories/data-display/badge/constants'
import { type ReactElement } from 'react'

const BadgeVariants = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={12}
    >
        {VARIANTS.map((variant) => (
            <Badge
                key={variant}
                label={variant}
                variant={variant}
            />
        ))}
    </Flex>
)

export default BadgeVariants
