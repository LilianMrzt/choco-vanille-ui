import { ToggleGroup } from '@components/actions'
import type { ReactElement } from 'react'

const ToggleUncontrolledGroup = (): ReactElement => (
    <ToggleGroup
        aria-label={'Text formatting'}
        multiple
        defaultValue={['bold']}
    >
        <ToggleGroup.Item
            value={'bold'}
            label={'Bold'}
        />
        <ToggleGroup.Item
            value={'italic'}
            label={'Italic'}
        />
        <ToggleGroup.Item
            value={'underline'}
            label={'Underline'}
        />
    </ToggleGroup>
)
export default ToggleUncontrolledGroup
