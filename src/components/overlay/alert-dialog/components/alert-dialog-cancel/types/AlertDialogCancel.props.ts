import type { ButtonProps } from '@components/actions/button/types'

type DistributiveOmit<T, Keys extends PropertyKey> =
    T extends unknown ? Omit<T, Keys> : never

/** A secondary action that cancels and closes the alert dialog. */
export type AlertDialogCancelProps = DistributiveOmit<ButtonProps, 'color' | 'variant' | 'label'> & {
    color?: ButtonProps['color']
    variant?: ButtonProps['variant']
    label?: string
}
