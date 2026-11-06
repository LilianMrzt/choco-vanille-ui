import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Typography } from '@components/foundation/typography'
import { Dialog } from '@components/overlay/dialog'
import type { DialogStoryArgs } from '@stories/overlay/dialog/types'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Renders a dialog with demonstration controls assigned to their slots.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Dialog root props and demonstration controls.
 * @param props.size - Content size.
 * @param props.title - Header title.
 * @param props.description - Header description.
 * @param props.showDescription - Whether to show the description.
 * @param props.showFooter - Whether to show the footer.
 * @param props.confirmLabel - Confirm button text.
 * @param props.cancelLabel - Cancel button text.
 * @returns The composed example.
 * @example
 * <DialogExample title="Settings" />
 */
const DialogExample = ({
    size,
    title,
    description,
    showDescription,
    showFooter,
    confirmLabel,
    cancelLabel,
    ...rootProps
}: DialogStoryArgs): ReactElement => (
    <Dialog {...rootProps}>
        <Dialog.Trigger>
            <Button
                color={'primary'}
                label={'Open dialog'}
                variant={'contained'}
            />
        </Dialog.Trigger>
        <Dialog.Content size={size}>
            <Dialog.Header
                title={title}
                description={showDescription ? description : undefined}
            />
            <Dialog.Body>
                <Typography
                    color={vars.color.text.primary}
                    fontSize={14}
                    variant={'p'}
                >
                    Your content goes here. This dialog demonstrates the compound component layout with Header, Body and Footer.
                </Typography>
            </Dialog.Body>
            {showFooter && (
                <Dialog.Footer>
                    <Dialog.Close>
                        <Button
                            color={'primary'}
                            label={cancelLabel ?? 'Cancel'}
                            size={'sm'}
                            variant={'outlined'}
                        />
                    </Dialog.Close>
                    <Button
                        color={'primary'}
                        label={confirmLabel ?? 'Save changes'}
                        size={'sm'}
                        variant={'contained'}
                    />
                </Dialog.Footer>
            )}
        </Dialog.Content>
    </Dialog>
)

export default DialogExample
