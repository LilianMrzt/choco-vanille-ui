import { Checkbox } from '@/components/forms/checkbox'
import type { ReactElement } from 'react'

/**
 * Renders the Checkbox States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <CheckboxStatesExample />
 */
const CheckboxStatesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Checkbox
            label={'Disabled'}
            disabled
        />
        <Checkbox
            label={'Updates'}
            helperText={'Receive occasional updates.'}
        />
        <Checkbox
            label={'Consent'}
            error={'Consent is required.'}
        />
    </div>
)

export default CheckboxStatesExample
