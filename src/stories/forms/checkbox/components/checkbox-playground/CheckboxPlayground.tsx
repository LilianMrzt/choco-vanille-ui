import ControlledCheckbox from '@stories/forms/checkbox/components/controlled-checkbox/ControlledCheckbox'
import CompoundPlayground from '@stories/forms/checkbox/components/compound-playground/CompoundPlayground'
import GroupPlayground from '@stories/forms/checkbox/components/group-playground/GroupPlayground'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'
import type { ReactElement } from 'react'

/**
 * Presents all APIs together so every documented slot control has a visible target.
 * @internal Storybook-only example; not part of the public package API.
 * @param props - Controls forwarded to each API example.
 * @returns Three labeled, synchronized examples.
 * @example
 * <CheckboxPlayground {...args} />
 */
const CheckboxPlayground = (props: CheckboxStoryArgs): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem', width: '100%' }}>
        <section aria-label={'Field API'}>
            <h3>Field API</h3>
            <ControlledCheckbox {...props} />
        </section>
        <section aria-label={'Compound API'}>
            <h3>Compound API</h3>
            <CompoundPlayground {...props} />
        </section>
        <section aria-label={'Group API'}>
            <h3>Group API</h3>
            <GroupPlayground {...props} />
        </section>
    </div>
)

export default CheckboxPlayground
