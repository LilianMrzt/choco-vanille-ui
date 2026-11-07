import { createControlledSource } from '@stories/_shared/controlled-source/utils/createControlledSource.utils'
import { GROUP_VALUES } from '@stories/forms/checkbox/constants'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'

type GroupSourceArgs = Readonly<{
    label: string
    helperText: string
    error?: string
    disabled: boolean
    value: string[]
    allValues: string[]
    headerLabel: string
    labelOne: string
    labelTwo: string
    labelThree: string
}>

const transformGroupSource = createControlledSource<GroupSourceArgs>({
    component: 'CheckboxGroup',
    stateProp: 'value',
    eventProp: 'onValueChange',
    stateType: 'string[]',
    handler: 'setValue',
    omitted: ['headerLabel', 'labelOne', 'labelTwo', 'labelThree'],
    children: (args) => [
        `        <CheckboxGroup.Header label={${JSON.stringify(args.headerLabel)}} />`,
        `        <CheckboxGroup.Item value="email" label={${JSON.stringify(args.labelOne)}} />`,
        `        <CheckboxGroup.Item value="sms" label={${JSON.stringify(args.labelTwo)}} />`,
        `        <CheckboxGroup.Item value="push" label={${JSON.stringify(args.labelThree)}} />`,
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
