import { ToggleGroup, type ToggleGroupProps } from '@components/actions'
import type { ReactElement } from 'react'

const ControlledGroup = (props: ToggleGroupProps): ReactElement => {
    return (
        <ToggleGroup
            {...props}
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
}
export default ControlledGroup
