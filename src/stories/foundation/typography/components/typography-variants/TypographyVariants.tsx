import { Typography } from '@/components/foundation/typography'

import { VARIANTS } from '@stories/foundation/typography/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Typography Variants story.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <TypographyVariants />
 */
const TypographyVariants = (): ReactElement => (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
        {VARIANTS.map((variant) => (
            <Typography
                key={variant}
                variant={variant}
            >
                {variant}
            </Typography>
        ))}
    </div>
)

export default TypographyVariants
