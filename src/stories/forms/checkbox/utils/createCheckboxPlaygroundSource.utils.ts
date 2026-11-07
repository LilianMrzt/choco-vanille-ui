import { createControlledSource } from '@stories/_shared/controlled-source/utils/create-controlled-source/createControlledSource.utils'
import type { CheckboxProps } from '@components/forms/checkbox'

/**
 * Generates the standalone checkbox consumer example.
 * @internal Not part of the public package API.
 * @param source - Storybook's generated source.
 * @param context - Current story context.
 * @returns The controlled checkbox consumer example.
 * @example
 * createCheckboxPlaygroundSource('', { args })
 */
export const createCheckboxPlaygroundSource = (source: string, context: Readonly<{ args: CheckboxProps }>): string => {
    return createControlledSource<CheckboxProps>({
        component: 'Checkbox',
        stateProp: 'checked',
        eventProp: 'onCheckedChange',
        handler: 'setValue',
    })(source, context)
}
