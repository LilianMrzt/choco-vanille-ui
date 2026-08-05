import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'

/** A secondary action that cancels and closes the alert dialog. */
export type AlertDialogCancelProps = Omit<ButtonProps, 'color' | 'variant' | 'label'> & {
    color?: ButtonProps['color']
    variant?: ButtonProps['variant']
    label?: string
}
