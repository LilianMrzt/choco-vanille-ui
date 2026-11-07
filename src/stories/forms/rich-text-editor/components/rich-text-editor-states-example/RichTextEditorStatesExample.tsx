import {
    RichTextEditorField
} from '@components/forms/rich-text-editor'
import { INITIAL_VALUE } from '@stories/forms/rich-text-editor/constants'
import type { ReactElement } from 'react'

/**
 * Renders the RichTextEditor States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <RichTextEditorStatesExample />
 */
const RichTextEditorStatesExample = (): ReactElement => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: 'min(100%, 42rem)',
        }}
    >
        <RichTextEditorField
            label={'Read only'}
            defaultValue={INITIAL_VALUE}
            readOnly
        />
        <RichTextEditorField
            label={'Disabled'}
            defaultValue={INITIAL_VALUE}
            disabled
        />
        <RichTextEditorField
            label={'With error'}
            error={'A description is required.'}
        />
    </div>
)

export default RichTextEditorStatesExample
