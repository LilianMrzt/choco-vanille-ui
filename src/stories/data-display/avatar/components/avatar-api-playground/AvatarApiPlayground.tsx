import type { ReactElement } from 'react'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import AvatarPlayground from '@stories/data-display/avatar/components/avatar-playground/AvatarPlayground'
import CompoundPlayground from '@stories/data-display/avatar/components/compound-playground/CompoundPlayground'
import AvatarGroupExample from '@stories/data-display/avatar/components/avatar-group-example/AvatarGroupExample'
import type { AvatarStoryArgs } from '@stories/data-display/avatar/types'

/**
 * Displays each API beside its functional controls.
 * @internal Not part of the public package API.
 * @param props - Convenience, compound-slot and group demonstration controls.
 * @returns Three labelled API examples.
 * @example <AvatarApiPlayground initials="JD" aria-label="Jane Doe" />
 */
const AvatarApiPlayground = (props: AvatarStoryArgs): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={24}
        maxWidth={'100%'}
        width={'min(40rem, calc(100vw - 32px))'}
    >
        <section aria-label={'Convenience API'}>
            <Typography as={'h3'}>Convenience API</Typography>
            <AvatarPlayground {...props} />
        </section>
        <section aria-label={'Compound API'}>
            <Typography as={'h3'}>Compound API</Typography>
            <CompoundPlayground {...props} />
        </section>
        <section aria-label={'Group'}>
            <Typography as={'h3'}>Group</Typography>
            <AvatarGroupExample {...props} />
        </section>
    </Flex>
)

export default AvatarApiPlayground
