import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { IconButton } from '@/components/actions/icon-button'
import { SIZES } from '@stories/actions/icon-button/constants'
import type { ReactElement } from 'react'

const IconButtonSizes = (): ReactElement => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        {SIZES.map((size) => (
            <IconButton
                key={size}
                icon={SearchIcon}
                aria-label={size}
                size={size}
            />
        ))}
    </div>
)
export default IconButtonSizes
