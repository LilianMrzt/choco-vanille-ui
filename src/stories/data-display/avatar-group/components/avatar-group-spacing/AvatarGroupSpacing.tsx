import { Avatar } from '@components/data-display/avatar'
import { AvatarGroup } from '@components/data-display/avatar-group'
import { Flex } from '@components/layout/flex'
import { SPACINGS } from '@stories/data-display/avatar-group/constants'
import type { ReactElement } from 'react'

const AvatarGroupSpacing = (): ReactElement => (
    <Flex
        alignItems={'flex-start'}
        flexDirection={'column'}
        gap={24}
    >
        {SPACINGS.map((spacing) => (
            <AvatarGroup
                aria-label={`Participants, ${spacing}`}
                key={spacing}
                role={'group'}
                spacing={spacing}
            >
                <Avatar
                    aria-label={'Alex Brown'}
                    initials={'AB'}
                />
                <Avatar
                    aria-label={'Chris Diaz'}
                    initials={'CD'}
                />
            </AvatarGroup>
        ))}
    </Flex>
)

export default AvatarGroupSpacing
