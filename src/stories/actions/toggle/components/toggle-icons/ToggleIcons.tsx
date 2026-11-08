import { BOLD_ICON as BoldIcon, CHEVRON_RIGHT_ICON as ChevronRightIcon, UPLOAD_ICON as UploadIcon } from '@constants/icon-registry'
import { Toggle } from '@components/actions'
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
