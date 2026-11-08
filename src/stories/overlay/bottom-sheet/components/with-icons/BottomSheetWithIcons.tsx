import { CHEVRON_RIGHT_ICON as ChevronRightIcon, IMAGE_ICON as ImageIcon, LINK_ICON as LinkIcon } from '@constants/icon-registry'
import { Button } from '@components/actions/button'
import { BottomSheet } from '@components/overlay/bottom-sheet'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomSheetWithIcons />
 */
const BottomSheetWithIcons = () => (
    <BottomSheet>
        <BottomSheet.Trigger>
            <Button
                label={'Open with icons'}
                variant={'outlined'}
                color={'primary'}
            />
        </BottomSheet.Trigger>
        <BottomSheet.Content aria-label={'Icons'}>
            <BottomSheet.Item
                label={'Start icon'}
                startIcon={ImageIcon}
            />
            <BottomSheet.Item
                label={'End icon'}
                endIcon={ChevronRightIcon}
            />
            <BottomSheet.Item
                label={'Both icons'}
                startIcon={LinkIcon}
                endIcon={ChevronRightIcon}
            />
        </BottomSheet.Content>
    </BottomSheet>
)

export default BottomSheetWithIcons
