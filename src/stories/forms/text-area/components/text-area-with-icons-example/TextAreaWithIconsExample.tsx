import { TextArea } from '@components/forms/text-area'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import type { ReactElement } from 'react'

/**
 * Renders the TextArea WithIcons example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <TextAreaWithIconsExample />
 */
const TextAreaWithIconsExample = (): ReactElement => (
    <TextArea
        label={'Comment'}
        startIcon={InfoIcon}
    />
)

export default TextAreaWithIconsExample
