import type * as React from 'react'
import type * as RadixCheckbox from '@radix-ui/react-checkbox'

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> & {
    /** Optional text label rendered beside the checkbox. When provided, `id` is used to associate the label. */
    label?: string
}
