import { Typography } from '@/components/foundation/typography'

import { SIZES } from '@stories/foundation/typography/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Typography FontSizes story.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <TypographyFontSizes />
 */
const TypographyFontSizes = (): ReactElement => (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
        {SIZES.map((fontSize) => (
            <Typography
                key={fontSize}
                variant={'p'}
                fontSize={fontSize}
            >
                {fontSize}
            </Typography>
        ))}
    </div>
)

export default TypographyFontSizes
