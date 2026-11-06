import { Typography } from '@/components/foundation/typography'

import { WEIGHTS } from '@stories/foundation/typography/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Typography FontWeights story.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <TypographyFontWeights />
 */
const TypographyFontWeights = (): ReactElement => (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
        {WEIGHTS.map((fontWeight) => (
            <Typography
                key={fontWeight}
                variant={'p'}
                fontWeight={fontWeight}
            >
                {fontWeight}
            </Typography>
        ))}
    </div>
)

export default TypographyFontWeights
