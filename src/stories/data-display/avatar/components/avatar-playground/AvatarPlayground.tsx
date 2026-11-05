import { Avatar } from '@components/data-display/avatar'
import type { AvatarStoryArgs } from '@stories/data-display/avatar/types'
import type { FC } from 'react'

/**
 * Removes composition-only demonstration controls before forwarding real args.
 * @internal Not part of the public package API.
 * @param props - Avatar args and optional compound demonstration values.
 * @param props.compoundImage - Composition-only image URL excluded from convenience Avatar props.
 * @param props.compoundAlt - Composition-only alternative text excluded from convenience Avatar props.
 * @param props.compoundFallback - Composition-only initials excluded from convenience Avatar props.
 * @param props.compoundLabel - Composition-only accessible root name excluded from convenience Avatar props.
 * @param props.compoundStatus - Composition-only presence value excluded from convenience Avatar props.
 * @returns A convenience Avatar driven by Controls.
 * @example
 * <AvatarPlayground initials="JD" aria-label="Jane Doe" />
 */
const AvatarPlayground: FC<AvatarStoryArgs> = ({
    compoundImage: _compoundImage,
    compoundAlt: _compoundAlt,
    compoundFallback: _compoundFallback,
    compoundLabel: _compoundLabel,
    compoundStatus: _compoundStatus,
    ...args
}) => <Avatar {...args} />

export default AvatarPlayground
