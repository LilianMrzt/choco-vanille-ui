import { TextField } from '@components/forms/text-field'
import type { ReactElement } from 'react'

/**
 * Renders the TextField Sizes example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TextFieldSizesExample />
 */
const TextFieldSizesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <TextField
            label={'Small'}
            size={'sm'}
            width={'100%'}
        />
        <TextField
            label={'Medium'}
            size={'md'}
            width={'100%'}
        />
        <TextField
            label={'Large'}
            size={'lg'}
            width={'100%'}
        />
    </div>
)

export default TextFieldSizesExample
