import { Toggle } from '@components/actions'
import BoldIcon from '@resources/asset/BoldIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'
import type { ReactElement } from 'react'

const ToggleIcons = (): ReactElement => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        <Toggle
            label={'Bold'}
            startIcon={BoldIcon}
        />
        <Toggle
            label={'Next'}
            endIcon={ChevronRightIcon}
        />
        <Toggle
            label={'Upload'}
            startIcon={UploadIcon}
            endIcon={ChevronRightIcon}
        />
    </div>
)
export default ToggleIcons
