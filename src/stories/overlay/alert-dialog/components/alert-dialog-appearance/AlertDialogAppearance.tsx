import type { ReactElement } from 'react'
import { Button } from '@components/actions/button'
import { AlertDialog } from '@components/overlay/alert-dialog'
import { APPEARANCE_COLORS, APPEARANCE_VARIANTS } from '@stories/overlay/alert-dialog/constants'

/**
 * Compares all action and cancel variants and colors at one content size.
 * @internal Storybook-only component; not part of the public package API.
 * @returns A dialog containing the complete compound-action comparison.
 * @example <AlertDialogAppearance />
 */
const AlertDialogAppearance = (): ReactElement => (
    <AlertDialog>
        <AlertDialog.Trigger>
            <Button label={'Compare action appearance'} />
        </AlertDialog.Trigger>
        <AlertDialog.Content size={'xl'}>
            <AlertDialog.Header
                description={'Every variant and color at the same button size. Selecting a button closes the comparison.'}
                title={'Action and cancel appearance'}
            />
            <AlertDialog.Body>
                <h3>Action variants and colors</h3>
                {APPEARANCE_VARIANTS.map((variant) => (
                    <section key={variant}>
                        <h4>{variant}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {APPEARANCE_COLORS.map((color) => (
                                <AlertDialog.Action
                                    key={color}
                                    color={color}
                                    label={`Confirm ${variant} ${color}`}
                                    variant={variant}
                                />
                            ))}
                        </div>
                    </section>
                ))}
                <h3>Cancel variants and colors</h3>
                {APPEARANCE_VARIANTS.map((variant) => (
                    <section key={variant}>
                        <h4>{variant}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {APPEARANCE_COLORS.map((color) => (
                                <AlertDialog.Cancel
                                    key={color}
                                    color={color}
                                    label={`Cancel ${variant} ${color}`}
                                    variant={variant}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </AlertDialog.Body>
        </AlertDialog.Content>
    </AlertDialog>
)

export default AlertDialogAppearance
