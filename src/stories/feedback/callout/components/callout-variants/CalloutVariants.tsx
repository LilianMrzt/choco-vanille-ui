import type { ReactElement } from 'react'

import { Callout } from '@components/feedback/callout'
import { VARIANTS } from '@stories/feedback/callout/constants'

/**
 * Demonstrates callout intent variants.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Callout examples.
 * @example
 * <CalloutVariants />
 */
const CalloutVariants = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem' }}>
        {VARIANTS.map((variant) => (
            <Callout
                key={variant}
                variant={variant}
                title={variant}
                description={'A contextual message.'}
            />
        ))}
    </div>
)

export default CalloutVariants
