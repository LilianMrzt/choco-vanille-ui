import AvatarGroupPlayground from '@stories/data-display/avatar-group/components/avatar-group-playground/AvatarGroupPlayground'
import type { AvatarStoryArgs } from '@stories/data-display/avatar/types'
import type { FC } from 'react'

/**
 * Displays group-specific demonstration controls on the group.
 * @internal Not part of the public package API.
 * @param props - Avatar story arguments.
 * @param props.groupMax - Maximum visible avatars.
 * @param props.groupSpacing - Overlap preset.
 * @param props.groupLabel - Accessible group name.
 * @param props.groupOverflowLabel - Accessible overflow formatter.
 * @returns A group of named avatars.
 * @example
 * <AvatarGroupExample groupMax={3} groupLabel="Participants" />
 */
const AvatarGroupExample: FC<AvatarStoryArgs> = ({ groupMax, groupSpacing, groupLabel, groupOverflowLabel }) => (
    <AvatarGroupPlayground
        aria-label={groupLabel}
        max={groupMax}
        overflowLabel={groupOverflowLabel}
        role={'group'}
        spacing={groupSpacing}
    />
)

export default AvatarGroupExample
