import type { ReactElement } from 'react'

import { Grid } from '@components/layout/grid'
import { Link } from '@components/navigation/link'
import { FONT_SIZES } from '@stories/navigation/link/constants'

/**
 * Displays the available link font sizes.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The size examples.
 * @example
 * <LinkFontSizes />
 */
const LinkFontSizes = (): ReactElement => (
    <Grid gap={8}>
        {FONT_SIZES.map((fontSize) => (
            <Link
                key={fontSize}
                fontSize={fontSize}
                label={String(fontSize)}
            />
        ))}
    </Grid>
)

export default LinkFontSizes
