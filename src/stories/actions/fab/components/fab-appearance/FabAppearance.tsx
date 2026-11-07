import type { ReactElement } from 'react'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import FabColors from '@stories/actions/fab/components/fab-colors/FabColors'

/**
 * Compares the public appearance axes without a Cartesian matrix.
 * @internal Not part of the public package API.
 * @returns Labelled comparison sections.
 * @example <FabAppearance />
 */
const FabAppearance = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={24}
        maxWidth={'100%'}
        width={'min(40rem, calc(100vw - 32px))'}
    >
        <section>
            <Typography as={'h3'}>Colors</Typography>
            <FabColors />
        </section>
    </Flex>
)

export default FabAppearance
