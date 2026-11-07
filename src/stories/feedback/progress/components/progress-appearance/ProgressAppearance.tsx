import type { ReactElement } from 'react'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import ProgressColors from '@stories/feedback/progress/components/progress-colors/ProgressColors'

/**
 * Compares the public appearance axes without a Cartesian matrix.
 * @internal Not part of the public package API.
 * @returns Labelled comparison sections.
 * @example <ProgressAppearance />
 */
const ProgressAppearance = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={24}
        maxWidth={'100%'}
        width={'min(40rem, calc(100vw - 32px))'}
    >
        <section>
            <Typography as={'h3'}>Colors</Typography>
            <ProgressColors />
        </section>
    </Flex>
)

export default ProgressAppearance
