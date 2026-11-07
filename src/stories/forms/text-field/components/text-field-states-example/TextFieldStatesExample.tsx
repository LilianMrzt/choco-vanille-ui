import { TextField } from '@components/forms/text-field'
import type { ReactElement } from 'react'

/**
 * Renders the TextField States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TextFieldStatesExample />
 */
const TextFieldStatesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <TextField
            label={'Disabled'}
            disabled
        />
        <TextField
            label={'Email'}
            helperText={'Use your work email.'}
        />
        <TextField
            label={'Invalid email'}
            error={'Enter a valid email address.'}
        />
    </div>
)

export default TextFieldStatesExample
