import type {
    BadgeColor,
    BadgeVariant,
} from '@components/data-display/badge/types'
import type { StyleRule } from '@vanilla-extract/css'

export type BadgeCompoundVariant = {
  variants: { variant: BadgeVariant; color: BadgeColor };
  style: StyleRule;
};
