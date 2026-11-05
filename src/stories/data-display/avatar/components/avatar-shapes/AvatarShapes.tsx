import { Avatar } from '@components/data-display/avatar'
import { Flex } from '@components/layout/flex'
import { SHAPES } from '@stories/data-display/avatar/constants'
import type { ReactElement } from 'react'

const AvatarShapes = (): ReactElement => (
    <Flex gap={12}>
        {SHAPES.map((shape) => (
            <Avatar
                aria-label={`Jane Doe, ${shape}`}
                initials={'JD'}
                key={shape}
                shape={shape}
            />
        ))}
    </Flex>
)

export default AvatarShapes
