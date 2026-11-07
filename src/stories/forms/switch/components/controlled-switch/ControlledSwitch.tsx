import { useArgs } from 'storybook/preview-api'
import { Switch, type SwitchProps } from '@components/forms/switch'
import type { ReactElement } from 'react'

/**
 * Renders the Switch interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ControlledSwitch />
 */
const ControlledSwitch = (_args: SwitchProps): ReactElement => {
    const [args, updateArgs] = useArgs<SwitchProps>()

    /**
     * Notifies the consumer before updating the control unless canceled.
     * @internal Storybook-only handler; not part of the public package API.
     * @param checked - Requested checked state.
     * @param details - Base UI change details.
     * @returns Nothing.
     * @example
     * handleCheckedChange(true, details)
     */
    const handleCheckedChange: NonNullable<SwitchProps['onCheckedChange']> = (checked, details) => {
        args.onCheckedChange?.(checked, details)

        if (!details.isCanceled) {
            updateArgs({ checked })
        }
    }

    return (
        <Switch
            {...args}
            onCheckedChange={handleCheckedChange}
        />
    )
}

export default ControlledSwitch
