import type { SelectOption } from '@components/forms/select/types/Select.props.ts'

/** Flatten options into the `items` format expected by Base UI `Select.Root`. */
export const flattenItems = (options: SelectOption[]): Array<{ value: string; label: string }> => options.flatMap((option) => {
    if (option.type === 'separator') {
        return []
    }
    if (option.type === 'group') {
        return option.options.map(({ value, label }) => ({ value, label }))
    }
    return [{ value: option.value, label: option.label }]
})
