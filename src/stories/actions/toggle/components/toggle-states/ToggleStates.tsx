import { Toggle } from '@components/actions'
import type { ReactElement } from 'react'

const ToggleStates = (): ReactElement => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Toggle
            label={'Disabled'}
            disabled
        />
        <Toggle
            label={'Pressed'}
            defaultPressed
        />
    </div>
)
export default ToggleStates
