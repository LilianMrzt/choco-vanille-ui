import { SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { IconButton } from '@/components/actions/icon-button'
import type { ReactElement } from 'react'

const IconButtonStates = (): ReactElement => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
        <IconButton
            icon={SearchIcon}
            aria-label={'Disabled'}
            disabled
        />
        <IconButton
            icon={SearchIcon}
            aria-label={'Active'}
            active
        />
    </div>
)
export default IconButtonStates
