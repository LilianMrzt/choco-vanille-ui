import type { ReactElement } from 'react'

import { Grid } from '@components/layout/grid'
import { Link } from '@components/navigation/link'
import { FONT_WEIGHTS } from '@stories/navigation/link/constants'

/**
 * Displays the available link font weights.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The weight examples.
 * @example
 * <LinkFontWeights />
 */
const LinkFontWeights = (): ReactElement => (
    <Grid gap={8}>
        {FONT_WEIGHTS.map((fontWeight) => (
            <Link
                key={fontWeight}
                fontWeight={fontWeight}
                label={fontWeight}
            />
        ))}
    </Grid>
)

export default LinkFontWeights
