import { useState } from 'react'
import { useArgs } from 'storybook/preview-api'
import { Button } from '@components/actions/button'
import { BottomSheet } from '@components/overlay/bottom-sheet'
import LinkIcon from '@resources/asset/LinkIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'
import type { BottomSheetPlaygroundArgs } from '@stories/overlay/bottom-sheet/types'

/**
 * Renders the example.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The example.
 * @example
 * <BottomSheetPlayground />
 */
const BottomSheetPlayground = () => {
    const [args, updateArgs] = useArgs<BottomSheetPlaygroundArgs>()
    const {
        open,
        onOpenChange,
        modal,
        triggerLabel,
        showHandle,
        showHeader,
        title,
        description,
        itemLabel,
        itemDestructive,
        itemDisabled,
        showRadioGroup,
        radioItemLabel,
        showSeparator,
        closeLabel,
    } = args
    const [size, setSize] = useState<unknown>('original')

    return (
        <BottomSheet
            open={open}
            onOpenChange={(nextOpen, details) => {
                onOpenChange?.(nextOpen, details)
                if (!details.isCanceled) {
                    updateArgs({ open: nextOpen })
                }
            }}
            modal={modal}
        >
            <BottomSheet.Trigger>
                <Button
                    label={triggerLabel ?? 'Open bottom sheet'}
                    variant={'contained'}
                    color={'primary'}
                />
            </BottomSheet.Trigger>
            <BottomSheet.Content showHandle={showHandle}>
                {showHeader && (
                    <BottomSheet.Header
                        title={title ?? 'Photo'}
                        description={description}
                    />
                )}
                <BottomSheet.Item
                    label={'Share link'}
                    startIcon={LinkIcon}
                />
                <BottomSheet.Item
                    label={'Upload'}
                    startIcon={UploadIcon}
                />
                {showRadioGroup && (
                    <>
                        {showSeparator && <BottomSheet.Separator />}
                        <BottomSheet.RadioGroup
                            aria-label={'Size'}
                            value={size}
                            onValueChange={setSize}
                        >
                            <BottomSheet.RadioItem
                                label={radioItemLabel ?? 'Original size'}
                                value={'original'}
                            />
                            <BottomSheet.RadioItem
                                label={'Compressed'}
                                value={'compressed'}
                            />
                        </BottomSheet.RadioGroup>
                    </>
                )}
                {showSeparator && <BottomSheet.Separator />}
                <BottomSheet.Item
                    label={itemLabel ?? 'Delete'}
                    startIcon={TrashIcon}
                    destructive={itemDestructive}
                    disabled={itemDisabled}
                />
                <BottomSheet.Close>
                    <Button
                        label={closeLabel ?? 'Cancel'}
                        variant={'outlined'}
                        color={'primary'}
                        width={'100%'}
                    />
                </BottomSheet.Close>
            </BottomSheet.Content>
        </BottomSheet>
    )
}

export default BottomSheetPlayground
