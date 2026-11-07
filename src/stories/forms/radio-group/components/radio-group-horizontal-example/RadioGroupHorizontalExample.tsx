import { RadioGroup } from '@/components/forms/radio-group'
import type { ReactElement } from 'react'

/**
 * Renders the RadioGroup Horizontal example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <RadioGroupHorizontalExample />
 */
const RadioGroupHorizontalExample = (): ReactElement => (
    <RadioGroup
        label={'Theme'}
        defaultValue={'system'}
        aria-orientation={'horizontal'}
    >
        <div style={{ display: 'flex', gap: '1rem' }}>
            <RadioGroup.Item
                value={'light'}
                label={'Light'}
            />
            <RadioGroup.Item
                value={'dark'}
                label={'Dark'}
            />
            <RadioGroup.Item
                value={'system'}
                label={'System'}
            />
        </div>
    </RadioGroup>
)

export default RadioGroupHorizontalExample
