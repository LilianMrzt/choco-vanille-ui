import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'
import { createCompoundSource } from '@stories/forms/checkbox/utils/create-compound-source/createCompoundSource.utils'
import { createGroupSource } from '@stories/forms/checkbox/utils/create-group-source/createGroupSource.utils'
import type { CheckboxStoryArgs } from '@stories/forms/checkbox/types'

/**
 * Combines all visible APIs as independently runnable named consumer examples.
 * @internal Not part of the public package API.
 * @param source - Storybook's generated source.
 * @param context - Current story context.
 * @returns Consumer examples for the field, compound checkbox, and group.
 * @example
 * createCheckboxPlaygroundSource('', { args })
 */
export const createCheckboxPlaygroundSource = (source: string, context: Readonly<{ args: CheckboxStoryArgs }>): string => {
    const field = createControlledSource<CheckboxStoryArgs>({
        component: 'Checkbox',
        stateProp: 'checked',
        eventProp: 'onCheckedChange',
        handler: 'setValue',
        omitted: [
            'compoundLabel', 'indicatorText', 'indicatorKeepMounted', 'groupLabel',
            'groupHelperText', 'groupError', 'groupDisabled', 'groupValue',
            'groupOnValueChange', 'groupHeaderLabel', 'groupLabelOne', 'groupLabelTwo', 'groupLabelThree',
        ],
    })(source, context)
    const examples = [
        field.replace('const Example =', 'const FieldExample ='),
        createCompoundSource(source, context).replace('const Example =', 'const CompoundExample ='),
        createGroupSource(source, context).replace('const Example =', 'const GroupExample ='),
    ]
    const imports = new Set<string>()
    const bodies = examples.map((example) => example.split('\n').filter((line) => {
        if (line.startsWith('import ')) {
            imports.add(line)
            return false
        }
        return true
    }).join('\n').trim())

    return [...imports, '', ...bodies].join('\n\n')
}
