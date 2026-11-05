import { Avatar } from '@components/data-display/avatar'
import { AvatarGroup, type AvatarGroupProps } from '@components/data-display/avatar-group'
import { PEOPLE } from '@stories/data-display/avatar-group/constants'
import type { ReactElement } from 'react'

const AvatarGroupPlayground = (args: AvatarGroupProps): ReactElement => (
    <AvatarGroup {...args}>
        {PEOPLE.map(({ initials, label }) => (
            <Avatar
                aria-label={label}
                initials={initials}
                key={initials}
            />
        ))}
    </AvatarGroup>
)

export default AvatarGroupPlayground
