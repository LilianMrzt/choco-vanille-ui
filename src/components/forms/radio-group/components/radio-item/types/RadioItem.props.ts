import type * as React from 'react'
import type * as RadixRadioGroup from '@radix-ui/react-radio-group'

export type RadioItemProps = React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> & {
    /** Text label rendered beside the radio button. */
    label?: string
}
