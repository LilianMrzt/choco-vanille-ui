import { Switch, type SwitchProps } from '@components/forms/switch'
import type { ReactElement } from 'react'

/**
 * Renders the Switch Uncontrolled example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <SwitchUncontrolledExample />
 */
const SwitchUncontrolledExample = (args: SwitchProps): ReactElement => (
    <Switch
        key={String(args.defaultChecked)}
        {...args}
    />
)

export default SwitchUncontrolledExample
