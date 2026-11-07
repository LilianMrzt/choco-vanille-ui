import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'
import { GROUP_VALUES } from '@stories/forms/checkbox/constants'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'
import consumerSource1 from '@stories/forms/checkbox/utils/create-group-source/sources/createGroupSource.utilsTemplate1.source.txt?raw'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import consumerSource2 from '@stories/forms/checkbox/utils/create-group-source/sources/createGroupSource.utilsTemplate2.source.txt?raw'
import consumerSource3 from '@stories/forms/checkbox/utils/create-group-source/sources/createGroupSource.utilsTemplate3.source.txt?raw'
import consumerSource4 from '@stories/forms/checkbox/utils/create-group-source/sources/createGroupSource.utilsTemplate4.source.txt?raw'
import type { GroupSourceArgs } from '@stories/forms/checkbox/utils/create-group-source/types'

const transformGroupSource = createControlledSource<GroupSourceArgs>({
    component: 'CheckboxGroup',
    stateProp: 'value',
    eventProp: 'onValueChange',
    stateType: 'string[]',
    handler: 'setValue',
    omitted: ['headerLabel', 'labelOne', 'labelTwo', 'labelThree'],
    children: (args) => [
        renderSource(consumerSource4, { fragment1: JSON.stringify(args.headerLabel) }),
        renderSource(consumerSource3, { fragment1: JSON.stringify(args.labelOne) }),
        renderSource(consumerSource2, { fragment1: JSON.stringify(args.labelTwo) }),
        renderSource(consumerSource1, { fragment1: JSON.stringify(args.labelThree) }),
    ].join('\n'),
})

/**
 * Generates a consumer example from the group controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param source - Original generated source.
 * @param context - Current Storybook context.
 * @param context.args - Current group controls.
 * @returns Controlled group consumer source.
 * @example
 * createGroupSource('', { args })
 */
export const createGroupSource = (source: string, { args }: Readonly<{ args: CheckboxStoryArgs }>): string =>
    transformGroupSource(source, {
        args: {
            label: args.groupLabel,
            helperText: args.groupHelperText,
            error: args.groupError,
            disabled: args.groupDisabled,
            value: args.groupValue,
            allValues: GROUP_VALUES,
            headerLabel: args.groupHeaderLabel,
            labelOne: args.groupLabelOne,
            labelTwo: args.groupLabelTwo,
            labelThree: args.groupLabelThree,
        },
    })
