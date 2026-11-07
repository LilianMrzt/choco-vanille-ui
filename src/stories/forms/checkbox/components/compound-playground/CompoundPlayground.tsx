import { Checkbox } from '@components/forms/checkbox'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'
import type { ReactElement } from 'react'

/**
 * Demonstrates the composable checkbox slots with synchronized controls.
 * @internal Storybook-only component; not part of the public package API.
 * @param args - Story controls and the callback supplied by the story renderer.
 * @returns A controlled checkbox with a custom indicator.
 * @example
 * <CompoundPlayground compoundLabel="Accept" indicatorText="X" indicatorKeepMounted={false} />
 */
const CompoundPlayground = (args: CheckboxStoryArgs): ReactElement => {
    return (
        <Checkbox.Root
            aria-label={args.compoundLabel}
            checked={args.checked}
            disabled={args.disabled}
            indeterminate={args.indeterminate}
            onCheckedChange={args.onCheckedChange}
            required={args.required}
        >
            <Checkbox.Indicator keepMounted={args.indicatorKeepMounted}>
                <span aria-hidden={'true'}>{args.indicatorText}</span>
            </Checkbox.Indicator>
        </Checkbox.Root>
    )
}

export default CompoundPlayground
