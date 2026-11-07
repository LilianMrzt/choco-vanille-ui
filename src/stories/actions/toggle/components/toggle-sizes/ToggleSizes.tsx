import { Toggle } from '@components/actions'
import { SIZES } from '@stories/actions/toggle/constants'
import type { ReactElement } from 'react'

const ToggleSizes = (): ReactElement => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        {SIZES.map((size) => (
            <Toggle
                key={size}
                label={size.toUpperCase()}
                size={size}
            />
        ))}
    </div>
)
export default ToggleSizes
