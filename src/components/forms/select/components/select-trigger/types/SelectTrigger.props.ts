import type * as React from 'react'
import type { Select as BaseSelect } from '@base-ui/react/select'

import type { TextFieldSize } from '@components/forms/text-field/types/TextField.types.ts'
import type { TypographySize } from '@components/foundation/typography/types/Typography.types.ts'

/** Props for the styled trigger subcomponent. */
export type SelectTriggerProps = BaseSelect.Trigger.Props & {
    /** Placeholder shown when no option is selected. */
    placeholder?: string
    /** Iconify icon name rendered on the left side of the trigger. */
    startIcon?: IconComponent
    /** Visual size of the trigger. Defaults to `md`. */
    size?: TextFieldSize
    /** Font size applied to the trigger text. @default 'md' */
    fontSize?: TypographySize
    /** Whether the trigger should be styled in its error state. */
    hasError?: boolean
    /** CSS width of the trigger. */
    width?: React.CSSProperties['width']
}
import type { IconComponent } from '@components/foundation/icon'
