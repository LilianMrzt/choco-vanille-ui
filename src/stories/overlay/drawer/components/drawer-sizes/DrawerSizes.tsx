import type { ReactElement } from 'react'
import { DRAWER_SIZES_ARRAY } from '@components/overlay/drawer/constants'
import DrawerSizeSample from '../drawer-size-sample/DrawerSizeSample'

/**
 * Compares drawer widths through independently opened samples.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The responsive size samples.
 * @example <DrawerSizes />
 */
const DrawerSizes = (): ReactElement => (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {DRAWER_SIZES_ARRAY.map((size) => (
            <DrawerSizeSample
                key={size}
                size={size}
            />
        ))}
    </div>
)

export default DrawerSizes
