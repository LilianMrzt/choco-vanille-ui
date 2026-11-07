import { TextArea } from '@components/forms/text-area'
import type { ReactElement } from 'react'

/**
 * Renders the TextArea States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TextAreaStatesExample />
 */
const TextAreaStatesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <TextArea
            label={'Disabled'}
            disabled
        />
        <TextArea
            label={'Comment'}
            helperText={'Add useful details.'}
        />
        <TextArea
            label={'Invalid comment'}
            error={'Enter a comment.'}
        />
    </div>
)

export default TextAreaStatesExample
