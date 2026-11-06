import type { RadioGroup } from '@base-ui/react/radio-group'

export type RadioGroupProps = RadioGroup.Props & {
    /** Optional visible group label. */
    label?: string
    /** Supporting text, replaced by `error` when present. */
    helperText?: string
    /** Error message associated with the group. */
    error?: string
}
