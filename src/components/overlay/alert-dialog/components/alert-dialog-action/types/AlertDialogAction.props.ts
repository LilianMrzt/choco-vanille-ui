import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'

type DistributiveOmit<T, Keys extends PropertyKey> =
    T extends unknown ? Omit<T, Keys> : never

/** A destructive action that closes the alert dialog after activation. */
export type AlertDialogActionProps = DistributiveOmit<ButtonProps, 'color' | 'variant'> & {
    color?: ButtonProps['color']
    variant?: ButtonProps['variant']
}
