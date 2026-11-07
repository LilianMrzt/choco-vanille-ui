import { TextArea } from '@components/forms/text-area'
import type { ReactElement } from 'react'

/**
 * Renders the TextArea Sizes example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TextAreaSizesExample />
 */
const TextAreaSizesExample = (): ReactElement => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <TextArea
            label={'Small'}
            size={'sm'}
            width={'100%'}
        />
        <TextArea
            label={'Medium'}
            size={'md'}
            width={'100%'}
        />
        <TextArea
            label={'Large'}
            size={'lg'}
            width={'100%'}
        />
    </div>
)

export default TextAreaSizesExample
