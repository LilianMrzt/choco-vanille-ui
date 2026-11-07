import { CheckboxGroup } from '@components/forms/checkbox-group'
import { GROUP_VALUES } from '@stories/forms/checkbox/constants'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'
import type { ReactElement } from 'react'

/**
 * Renders the controlled group and synchronizes its controls and callback.
 * @internal Storybook-only component; not part of the public package API.
 * @param args - Story controls and the group callback supplied by the story renderer.
 * @returns The group and its selectable items.
 * @example
 * <GroupPlayground {...args} />
 */
const GroupPlayground = (args: CheckboxStoryArgs): ReactElement => {
    return (
        <CheckboxGroup
            allValues={GROUP_VALUES}
            disabled={args.groupDisabled}
            error={args.groupError}
            helperText={args.groupHelperText}
            label={args.groupLabel}
            onValueChange={args.groupOnValueChange}
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
