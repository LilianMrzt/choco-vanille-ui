import { RadioGroup } from '@/components/forms/radio-group'
import type { ReactElement } from 'react'

/**
 * Renders the RadioGroup States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <RadioGroupStatesExample />
 */
const RadioGroupStatesExample = (): ReactElement => (
    <RadioGroup
        disabled
        aria-label={'Theme'}
    >
        <RadioGroup.Item
            value={'system'}
            label={'System'}
        />
    </RadioGroup>
)

export default RadioGroupStatesExample
