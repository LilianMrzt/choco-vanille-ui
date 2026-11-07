import { RadioGroup } from '@/components/forms/radio-group'
import type { ReactElement } from 'react'

/**
 * Renders the RadioGroup ItemHelp example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <RadioGroupItemHelpExample />
 */
const RadioGroupItemHelpExample = (): ReactElement => (
    <RadioGroup label={'Theme'}>
        <RadioGroup.Item
            value={'system'}
            label={'System'}
            helperText={'Follow your device settings.'}
        />
    </RadioGroup>
)

export default RadioGroupItemHelpExample
