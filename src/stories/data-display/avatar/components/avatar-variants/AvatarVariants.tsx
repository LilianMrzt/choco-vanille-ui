import { Avatar } from '@components/data-display/avatar'
import { Flex } from '@components/layout/flex'
import { VARIANTS } from '@stories/data-display/avatar/constants'
import type { ReactElement } from 'react'

const AvatarVariants = (): ReactElement => (
    <Flex gap={12}>
        {VARIANTS.map((variant) => (
            <Avatar
                aria-label={`Jane Doe, ${variant}`}
                initials={'JD'}
                key={variant}
                variant={variant}
            />
        ))}
    </Flex>
)

export default AvatarVariants
