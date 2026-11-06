import { Button } from '@components/actions/button'
import { BottomSheet } from '@components/overlay/bottom-sheet'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import LinkIcon from '@resources/asset/LinkIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomSheetStates />
 */
const BottomSheetStates = () => (
    <BottomSheet>
        <BottomSheet.Trigger>
            <Button
                label={'Open states'}
                variant={'outlined'}
                color={'primary'}
            />
        </BottomSheet.Trigger>
        <BottomSheet.Content aria-label={'States'}>
            <BottomSheet.Item
                label={'Default'}
                startIcon={LinkIcon}
            />
            <BottomSheet.Item
                label={'Destructive'}
                startIcon={TrashIcon}
                destructive
            />
            <BottomSheet.Item
                label={'Disabled'}
                startIcon={CloseIcon}
                disabled
            />
            <BottomSheet.Separator />
            <BottomSheet.RadioGroup
                aria-label={'Selection'}
                defaultValue={'selected'}
            >
                <BottomSheet.RadioItem
                    label={'Selected'}
                    value={'selected'}
                />
                <BottomSheet.RadioItem
                    label={'Not selected'}
                    value={'other'}
                />
                <BottomSheet.RadioItem
                    label={'Disabled option'}
                    value={'disabled'}
                    disabled
                />
            </BottomSheet.RadioGroup>
        </BottomSheet.Content>
    </BottomSheet>
)

export default BottomSheetStates
