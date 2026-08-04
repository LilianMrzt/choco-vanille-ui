import type { FC } from 'react'

import type Checkbox from '@components/forms/checkbox/Checkbox.tsx'
import type CheckboxGroupHeader from '@components/forms/checkbox-group/components/header/CheckboxGroupHeader.tsx'
import type { CheckboxGroupProps } from '@components/forms/checkbox-group/types/CheckboxGroup.props.ts'

export type CheckboxGroupCompound = FC<CheckboxGroupProps> & {
    Item: typeof Checkbox
    Header: typeof CheckboxGroupHeader
}
