import type { ButtonColorShared, ButtonVariantShared } from '@components/actions/_shared/buttons/types'
import type { StyleRule } from '@vanilla-extract/css'

export type ButtonCompoundVariant = {
    variants: { variant: ButtonVariantShared; color: ButtonColorShared }
    style: StyleRule
}
