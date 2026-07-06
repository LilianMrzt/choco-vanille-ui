import type { Checkbox } from '@base-ui/react/checkbox'

export type CheckboxProps = Checkbox.Root.Props & {
    /** Optional text label rendered beside the checkbox. When provided, `id` is used to associate the label. */
    label?: string
}
