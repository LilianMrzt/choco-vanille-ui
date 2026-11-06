import type { Radio } from '@base-ui/react/radio'

export type RadioItemProps = Radio.Root.Props & {
    /** Text label rendered beside the radio button. */
    label?: string
    /** Supporting text, replaced by `error` when present. */
    helperText?: string
    /** Error message associated with the radio. */
    error?: string
}
