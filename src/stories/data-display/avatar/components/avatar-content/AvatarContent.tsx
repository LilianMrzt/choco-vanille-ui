import type { ReactElement } from 'react'
import { Avatar } from '@components/data-display/avatar'
import { Flex } from '@components/layout/flex'
import { PREVIEW_IMAGE } from '@stories/data-display/avatar/constants'

/**
 * Compares image, initials and default-icon content.
 * @internal Not part of the public package API.
 * @returns Named examples of the available content fallbacks.
 * @example <AvatarContent />
 */
const AvatarContent = (): ReactElement => (
    <Flex
        flexWrap={'wrap'}
        gap={16}
    >
        <Avatar
            alt={'shadcn'}
            aria-label={'shadcn'}
            initials={'CN'}
            src={PREVIEW_IMAGE}
        />
        <Avatar
            aria-label={'Jane Doe'}
            initials={'JD'}
        />
        <Avatar aria-label={'Unnamed profile'} />
    </Flex>
)

export default AvatarContent
