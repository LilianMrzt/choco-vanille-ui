import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'

/** A destructive action that closes the alert dialog after activation. */
export type AlertDialogActionProps = Omit<ButtonProps, 'color' | 'variant'> & {
    color?: ButtonProps['color']
    variant?: ButtonProps['variant']
}
