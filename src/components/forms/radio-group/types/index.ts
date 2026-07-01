import type { FC } from 'react'

import type RadioItem from '@components/forms/radio-group/components/radio-item/RadioItem.tsx'
import type { RadioGroupProps } from '@components/forms/radio-group/types/RadioGroup.props.ts'

export type RadioGroupCompound = FC<RadioGroupProps> & {
    Item: typeof RadioItem
}
