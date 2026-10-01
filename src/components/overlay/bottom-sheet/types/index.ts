import type { FC } from 'react'

import type BottomSheetClose from '@components/overlay/bottom-sheet/components/bottom-sheet-close/BottomSheetClose.tsx'
import type BottomSheetContent from '@components/overlay/bottom-sheet/components/bottom-sheet-content/BottomSheetContent.tsx'
import type BottomSheetHeader from '@components/overlay/bottom-sheet/components/bottom-sheet-header/BottomSheetHeader.tsx'
import type BottomSheetItem from '@components/overlay/bottom-sheet/components/bottom-sheet-item/BottomSheetItem.tsx'
import type BottomSheetRadioGroup from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-group/BottomSheetRadioGroup.tsx'
import type BottomSheetRadioItem from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-item/BottomSheetRadioItem.tsx'
import type BottomSheetSeparator from '@components/overlay/bottom-sheet/components/bottom-sheet-separator/BottomSheetSeparator.tsx'
import type BottomSheetTrigger from '@components/overlay/bottom-sheet/components/bottom-sheet-trigger/BottomSheetTrigger.tsx'
import type { BottomSheetProps } from '@components/overlay/bottom-sheet/types/BottomSheet.props.ts'

export type BottomSheetCompound = FC<BottomSheetProps> & {
    Trigger: typeof BottomSheetTrigger
    Content: typeof BottomSheetContent
    Header: typeof BottomSheetHeader
    Item: typeof BottomSheetItem
    RadioGroup: typeof BottomSheetRadioGroup
    RadioItem: typeof BottomSheetRadioItem
    Separator: typeof BottomSheetSeparator
    Close: typeof BottomSheetClose
}

export type { BottomSheetProps } from '@components/overlay/bottom-sheet/types/BottomSheet.props.ts'
