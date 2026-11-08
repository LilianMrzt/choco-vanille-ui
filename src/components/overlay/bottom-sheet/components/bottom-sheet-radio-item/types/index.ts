import type { Radio } from '@base-ui/react/radio'

import type { IconifyIcon } from '@components/foundation/icon'

/** Props for `BottomSheet.RadioItem`. */
export type BottomSheetRadioItemProps = Omit<Radio.Root.Props, 'children' | 'className'> & {
    /** Text label of the option. */
    label: string
    /** Icon rendered before the label. */
    startIcon?: IconifyIcon
    /** Class name applied to the option row. */
    className?: string
}
