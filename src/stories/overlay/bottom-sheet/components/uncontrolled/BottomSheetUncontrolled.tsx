import { Button } from '@components/actions/button'
import { BottomSheet } from '@components/overlay/bottom-sheet'

/**
 * Demonstrates an uncontrolled sheet.
 * @internal Storybook-only component; not part of the public package API.
 * @returns A sheet and trigger.
 * @example
 * <BottomSheetUncontrolled />
 */
const BottomSheetUncontrolled = () => (
    <BottomSheet defaultOpen={false}>
        <BottomSheet.Trigger><Button label={'Open sheet'} /></BottomSheet.Trigger>
        <BottomSheet.Content>
            <BottomSheet.Header title={'Actions'} />
            <BottomSheet.Item label={'Continue'} />
            <BottomSheet.Close><Button label={'Cancel'} /></BottomSheet.Close>
        </BottomSheet.Content>
    </BottomSheet>
)

export default BottomSheetUncontrolled
