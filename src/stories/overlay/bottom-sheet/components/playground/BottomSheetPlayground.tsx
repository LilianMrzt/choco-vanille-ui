import { LINK_ICON as LinkIcon, TRASH_ICON as TrashIcon, UPLOAD_ICON as UploadIcon } from '@constants/icon-registry'
import { useArgs } from 'storybook/preview-api'
import { Button } from '@components/actions/button'
import { BottomSheet } from '@components/overlay/bottom-sheet'
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
        titleAs,
        contentLabel,
        description,
        itemLabel,
        itemDestructive,
        itemDisabled,
        itemCloseOnClick,
        showRadioGroup,
        radioItemLabel,
        radioValue,
        radioDisabled,
        onRadioValueChange,
        showSeparator,
        closeLabel,
    } = args
    /**
     * Forwards details and synchronizes uncanceled radio selections.
     * @internal Storybook-only handler; not part of the public package API.
     * @param value - Requested option value.
     * @param details - Cancellable event details.
     * @returns Nothing.
     * @example handleRadioValueChange('compressed', details)
     */
    const handleRadioValueChange: NonNullable<BottomSheetPlaygroundArgs['onRadioValueChange']> = (value, details) => {
        onRadioValueChange?.(value, details)

        if (!details.isCanceled && (value === 'original' || value === 'compressed')) {
            updateArgs({ radioValue: value })
        }
    }

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
            <BottomSheet.Content
                defaultAriaLabel={contentLabel}
                showHandle={showHandle}
            >
                {showHeader && (
                    <BottomSheet.Header
                        title={title ?? 'Photo'}
                        titleAs={titleAs}
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
                            value={radioValue}
                            disabled={radioDisabled}
                            onValueChange={handleRadioValueChange}
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
                    closeOnClick={itemCloseOnClick}
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
