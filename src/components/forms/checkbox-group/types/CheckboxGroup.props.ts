import type { CheckboxGroup } from '@base-ui/react/checkbox-group'

export type CheckboxGroupProps = CheckboxGroup.Props & {
    /** Optional visible group label. */
    label?: string
    /** Supporting text, replaced by `error` when present. */
    helperText?: string
    /** Error message associated with the group. */
    error?: string
}
