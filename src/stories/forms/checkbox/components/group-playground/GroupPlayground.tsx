import { useArgs } from 'storybook/preview-api'

import { CheckboxGroup, type CheckboxGroupProps } from '@components/forms/checkbox-group'
import { GROUP_VALUES } from '@stories/forms/checkbox/constants'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'

/**
 * Renders the controlled group and synchronizes its controls and callback.
 * @internal Storybook-only component; not part of the public package API.
 * @param _props - Storybook controls.
 * @returns The group and its selectable items.
 * @example
 * <GroupPlayground {...args} />
 */
const GroupPlayground = (_props: CheckboxStoryArgs) => {
    const [args, updateArgs] = useArgs<CheckboxStoryArgs>()
    const handleValueChange: NonNullable<CheckboxGroupProps['onValueChange']> = (value, details) => {
        args.groupOnValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ groupValue: value })
        }
    }

    return (
        <CheckboxGroup
            allValues={GROUP_VALUES}
            disabled={args.groupDisabled}
            error={args.groupError}
            helperText={args.groupHelperText}
            label={args.groupLabel}
            onValueChange={handleValueChange}
            value={args.groupValue}
        >
            <CheckboxGroup.Header label={args.groupHeaderLabel} />
            <CheckboxGroup.Item
                value={'email'}
                label={args.groupLabelOne}
            />
            <CheckboxGroup.Item
                value={'sms'}
                label={args.groupLabelTwo}
            />
            <CheckboxGroup.Item
                value={'push'}
                label={args.groupLabelThree}
            />
        </CheckboxGroup>
    )
}

export default GroupPlayground
