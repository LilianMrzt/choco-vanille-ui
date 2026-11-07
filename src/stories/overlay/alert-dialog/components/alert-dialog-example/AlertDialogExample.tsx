import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Typography } from '@components/foundation/typography'
import { AlertDialog } from '@components/overlay/alert-dialog'
import type { AlertDialogStoryArgs } from '@stories/overlay/alert-dialog/types'

/**
 * Renders the confirmation dialog with controls assigned to their slots.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Dialog root props and demonstration controls.
 * @param props.size - Content size.
 * @param props.title - Header title.
 * @param props.titleAs - Header heading level.
 * @param props.showCloseButton - Whether to show the header close control.
 * @param props.contentLabel - Fallback accessible confirmation name.
 * @param props.description - Header description.
 * @param props.triggerLabel - Trigger text.
 * @param props.actionLabel - Confirmation text.
 * @param props.cancelLabel - Cancel text.
 * @param props.showBody - Whether to show the body.
 * @returns The composed example.
 * @example
 * <AlertDialogExample title="Confirm" />
 */
const AlertDialogExample = ({
    size,
    title,
    titleAs,
    showCloseButton,
    contentLabel,
    description,
    triggerLabel,
    actionLabel,
    cancelLabel,
    showBody,
    ...rootProps
}: AlertDialogStoryArgs): ReactElement => (
    <AlertDialog {...rootProps}>
        <AlertDialog.Trigger>
            <Button
                color={'destructive'}
                label={triggerLabel ?? 'Delete account'}
                variant={'contained'}
            />
        </AlertDialog.Trigger>
        <AlertDialog.Content
            defaultAriaLabel={contentLabel}
            size={size}
        >
            <AlertDialog.Header
                description={description}
                title={title}
                titleAs={titleAs}
                showCloseButton={showCloseButton}
            />
            {showBody && (
                <AlertDialog.Body>
                    <Typography>Your account and its data will be permanently deleted.</Typography>
                </AlertDialog.Body>
            )}
            <AlertDialog.Footer>
                <AlertDialog.Cancel label={cancelLabel} />
                <AlertDialog.Action label={actionLabel ?? 'Delete account'} />
            </AlertDialog.Footer>
        </AlertDialog.Content>
    </AlertDialog>
)

export default AlertDialogExample
