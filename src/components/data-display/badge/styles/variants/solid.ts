import { vars } from '@theme/contract.css.ts'
import { BADGE_COLORS, BADGE_VARIANTS } from '@components/data-display/badge/constants'

export const solidCompoundVariants = [
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.primary },
        style: {
            backgroundColor: vars.color.primary,
            color: vars.color.primaryForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.secondary },
        style: {
            backgroundColor: vars.color.secondary,
            color: vars.color.secondaryForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.tertiary },
        style: {
            backgroundColor: vars.color.tertiary,
            color: vars.color.tertiaryForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.destructive },
        style: {
            backgroundColor: vars.color.destructive,
            color: vars.color.destructiveForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.success },
        style: {
            backgroundColor: vars.color.success,
            color: vars.color.successForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.warning },
        style: {
            backgroundColor: vars.color.warning,
            color: vars.color.warningForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.info },
        style: {
            backgroundColor: vars.color.info,
            color: vars.color.infoForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.purple },
        style: {
            backgroundColor: vars.color.purple,
            color: vars.color.purpleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.pink },
        style: {
            backgroundColor: vars.color.pink,
            color: vars.color.pinkForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.orange },
        style: {
            backgroundColor: vars.color.orange,
            color: vars.color.orangeForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.teal },
        style: {
            backgroundColor: vars.color.teal,
            color: vars.color.tealForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.cyan },
        style: {
            backgroundColor: vars.color.cyan,
            color: vars.color.cyanForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.solid, color: BADGE_COLORS.indigo },
        style: {
            backgroundColor: vars.color.indigo,
            color: vars.color.indigoForeground,
        },
    },
] as const
