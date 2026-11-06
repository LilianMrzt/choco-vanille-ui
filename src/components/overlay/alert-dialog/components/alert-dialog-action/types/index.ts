import type { ButtonProps } from '@components/actions/button/types'

type DistributiveOmit<T, Keys extends PropertyKey> =
    T extends unknown ? Omit<T, Keys> : never

/** A destructive action that closes the alert dialog after activation. */
export type AlertDialogActionProps = Readonly<DistributiveOmit<ButtonProps, 'color' | 'variant'> & {
    color?: ButtonProps['color']
    variant?: ButtonProps['variant']
}>
