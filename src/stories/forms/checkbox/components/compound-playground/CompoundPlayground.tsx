import { useArgs } from 'storybook/preview-api'

import { Checkbox, type CheckboxRootProps } from '@components/forms/checkbox'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'

/**
 * Demonstrates the composable checkbox slots with synchronized controls.
 * @internal Storybook-only component; not part of the public package API.
 * @param _props - Storybook controls.
 * @returns A controlled checkbox with a custom indicator.
 * @example
 * <CompoundPlayground compoundLabel="Accept" indicatorText="X" indicatorKeepMounted={false} />
 */
const CompoundPlayground = (_props: CheckboxStoryArgs) => {
    const [args, updateArgs] = useArgs<CheckboxStoryArgs>()
    const handleCheckedChange: NonNullable<CheckboxRootProps['onCheckedChange']> = (checked, details) => {
        args.onCheckedChange?.(checked, details)
        if (!details.isCanceled) {
            updateArgs({ checked })
        }
    }

    return (
        <Checkbox.Root
            aria-label={args.compoundLabel}
            checked={args.checked}
            disabled={args.disabled}
            indeterminate={args.indeterminate}
            onCheckedChange={handleCheckedChange}
            required={args.required}
        >
            <Checkbox.Indicator keepMounted={args.indicatorKeepMounted}>
                <span aria-hidden={'true'}>{args.indicatorText}</span>
            </Checkbox.Indicator>
        </Checkbox.Root>
    )
}

export default CompoundPlayground
