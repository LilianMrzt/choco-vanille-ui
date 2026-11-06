import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Tooltip } from '@components/overlay/tooltip'

/**
 * Demonstrates enabled, disabled and controlled-open tooltips.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Tooltip examples.
 * @example
 * <TooltipStates />
 */
const TooltipStates = (): ReactElement => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', padding: '3rem 1rem 2rem' }}>
        <Tooltip content={'Enabled tooltip'}>
            <Button label={'Enabled'} />
        </Tooltip>
        <Tooltip
            content={'Disabled tooltip'}
            disabled
        >
            <Button label={'Disabled'} />
        </Tooltip>
        <Tooltip
            content={'Controlled open tooltip'}
            open
        >
            <Button label={'Open'} />
        </Tooltip>
    </div>
)

export default TooltipStates
