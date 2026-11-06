import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { memo } from 'react'

import BottomSheetClose from '@components/overlay/bottom-sheet/components/bottom-sheet-close/BottomSheetClose.tsx'
import BottomSheetContent from '@components/overlay/bottom-sheet/components/bottom-sheet-content/BottomSheetContent.tsx'
import BottomSheetHeader from '@components/overlay/bottom-sheet/components/bottom-sheet-header/BottomSheetHeader.tsx'
import BottomSheetItem from '@components/overlay/bottom-sheet/components/bottom-sheet-item/BottomSheetItem.tsx'
import BottomSheetRadioGroup from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-group/BottomSheetRadioGroup.tsx'
import BottomSheetRadioItem from '@components/overlay/bottom-sheet/components/bottom-sheet-radio-item/BottomSheetRadioItem.tsx'
import BottomSheetSeparator from '@components/overlay/bottom-sheet/components/bottom-sheet-separator/BottomSheetSeparator.tsx'
import BottomSheetTrigger from '@components/overlay/bottom-sheet/components/bottom-sheet-trigger/BottomSheetTrigger.tsx'
import type { BottomSheetProps } from '@components/overlay/bottom-sheet/types'

/**
 * A modal sheet that slides up from the bottom of the screen — the mobile
 * counterpart of `DropdownMenu` for actions and single-choice pickers.
 * Built on Base UI Drawer: it supports swipe-to-dismiss, traps focus and
 * closes on `Escape` or a backdrop tap.
 *
 * @example
 * ```tsx
 * <BottomSheet>
 *   <BottomSheet.Trigger>
 *     <Button label="More actions" />
 *   </BottomSheet.Trigger>
 *   <BottomSheet.Content>
 *     <BottomSheet.Item label="Share" startIcon={ShareIcon} onClick={share} />
 *     <BottomSheet.Item label="Download" startIcon={DownloadIcon} onClick={download} />
 *     <BottomSheet.Separator />
 *     <BottomSheet.Item label="Delete" startIcon={TrashIcon} destructive onClick={remove} />
 *   </BottomSheet.Content>
 * </BottomSheet>
 * ```
 */
const BottomSheetRoot = memo<BottomSheetProps>((props) => (
    <BaseDrawer.Root
        {...props}
        swipeDirection={'down'}
    />
))

BottomSheetRoot.displayName = 'BottomSheet'

/** Bottom sheet root with its action, selection and dismissal slots. */
const BottomSheet = Object.assign(BottomSheetRoot, {
    Trigger: BottomSheetTrigger,
    Content: BottomSheetContent,
    Header: BottomSheetHeader,
    Item: BottomSheetItem,
    RadioGroup: BottomSheetRadioGroup,
    RadioItem: BottomSheetRadioItem,
    Separator: BottomSheetSeparator,
    Close: BottomSheetClose,
})

export default BottomSheet
