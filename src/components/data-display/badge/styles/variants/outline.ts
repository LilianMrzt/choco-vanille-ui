import { vars } from '@theme/contract.css.ts'
import { BADGE_COLORS, BADGE_VARIANTS } from '@components/data-display/badge/constants'

export const outlineCompoundVariants = [
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.primary },
        style: {
            backgroundColor: vars.color.primarySubtle,
            borderColor: vars.color.primarySubtleBorder,
            color: vars.color.primarySubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.secondary },
        style: {
            backgroundColor: vars.color.secondarySubtle,
            borderColor: vars.color.secondarySubtleBorder,
            color: vars.color.secondarySubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.tertiary },
        style: {
            backgroundColor: vars.color.tertiarySubtle,
            borderColor: vars.color.tertiarySubtleBorder,
            color: vars.color.tertiarySubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.destructive },
        style: {
            backgroundColor: vars.color.destructiveSubtle,
            borderColor: vars.color.destructiveSubtleBorder,
            color: vars.color.destructiveSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.success },
        style: {
            backgroundColor: vars.color.successSubtle,
            borderColor: vars.color.successSubtleBorder,
            color: vars.color.successSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.warning },
        style: {
            backgroundColor: vars.color.warningSubtle,
            borderColor: vars.color.warningSubtleBorder,
            color: vars.color.warningSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.info },
        style: {
            backgroundColor: vars.color.infoSubtle,
            borderColor: vars.color.infoSubtleBorder,
            color: vars.color.infoSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.purple },
        style: {
            backgroundColor: vars.color.purpleSubtle,
            borderColor: vars.color.purpleSubtleBorder,
            color: vars.color.purpleSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.pink },
        style: {
            backgroundColor: vars.color.pinkSubtle,
            borderColor: vars.color.pinkSubtleBorder,
            color: vars.color.pinkSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.orange },
        style: {
            backgroundColor: vars.color.orangeSubtle,
            borderColor: vars.color.orangeSubtleBorder,
            color: vars.color.orangeSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.teal },
        style: {
            backgroundColor: vars.color.tealSubtle,
            borderColor: vars.color.tealSubtleBorder,
            color: vars.color.tealSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.cyan },
        style: {
            backgroundColor: vars.color.cyanSubtle,
            borderColor: vars.color.cyanSubtleBorder,
            color: vars.color.cyanSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.indigo },
        style: {
            backgroundColor: vars.color.indigoSubtle,
            borderColor: vars.color.indigoSubtleBorder,
            color: vars.color.indigoSubtleForeground,
        },
    },
] as const
