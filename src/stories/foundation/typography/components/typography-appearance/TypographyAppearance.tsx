import type { ReactElement } from 'react'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import TypographyVariants from '@stories/foundation/typography/components/typography-variants/TypographyVariants'
import TypographyFontWeights from '@stories/foundation/typography/components/typography-font-weights/TypographyFontWeights'

/**
 * Compares the public appearance axes without a Cartesian matrix.
 * @internal Not part of the public package API.
 * @returns Labelled comparison sections.
 * @example <TypographyAppearance />
 */
const TypographyAppearance = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={24}
        maxWidth={'100%'}
        width={'min(40rem, calc(100vw - 32px))'}
    >
        <section>
            <Typography as={'h3'}>Variants</Typography>
            <TypographyVariants />
        </section>
        <section>
            <Typography as={'h3'}>Font Weights</Typography>
            <TypographyFontWeights />
        </section>
    </Flex>
)

export default TypographyAppearance
