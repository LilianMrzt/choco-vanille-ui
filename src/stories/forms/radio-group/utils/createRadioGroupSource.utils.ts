import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'
import consumerSource5 from '@stories/forms/radio-group/sources/RadioGroupTemplate5.source.txt?raw'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import consumerSource6 from '@stories/forms/radio-group/sources/RadioGroupTemplate6.source.txt?raw'
import consumerSource7 from '@stories/forms/radio-group/sources/RadioGroupTemplate7.source.txt?raw'
import type { RadioGroupPlaygroundArgs } from '@stories/forms/radio-group/types'

/**
 * Generates source matching the current RadioGroup controls.
 * @internal Not part of the public package API.
 */
export const createRadioGroupSource = createControlledSource<RadioGroupPlaygroundArgs>({
    component: 'RadioGroup',
    stateProp: 'value',
    eventProp: 'onValueChange',
    handler: 'setValue',
    omitted: ['labelOne', 'labelTwo', 'labelThree'],
    children: (args) => [
        renderSource(consumerSource7, { fragment1: JSON.stringify(args.labelOne) }),
        renderSource(consumerSource6, { fragment1: JSON.stringify(args.labelTwo) }),
        renderSource(consumerSource5, { fragment1: JSON.stringify(args.labelThree) }),
    ].join('\n'),
})
