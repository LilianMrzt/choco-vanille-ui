import type { ReactElement } from 'react'

import { Fab } from '@components/actions/fab'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import FabFrame from '@stories/actions/fab/components/fab-frame/FabFrame'

/**
 * Shows a disabled floating action button.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The disabled example.
 * @example
 * <FabStates />
 */
const FabStates = (): ReactElement => (
    <FabFrame>
        <Fab
            aria-label={'Disabled'}
            disabled
            icon={SearchIcon}
        />
    </FabFrame>
)

export default FabStates
