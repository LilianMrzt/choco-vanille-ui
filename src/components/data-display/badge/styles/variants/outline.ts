import { vars } from '@theme/contract.css.ts'
import { BADGE_COLORS, BADGE_VARIANTS } from '@components/data-display/badge/constants'

export const outlineCompoundVariants = [
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.primary },
        style: {
            borderColor: vars.color.primarySubtleBorder,
            color: vars.color.primarySubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.secondary },
        style: {
            borderColor: vars.color.secondarySubtleBorder,
            color: vars.color.secondarySubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.tertiary },
        style: {
            borderColor: vars.color.tertiarySubtleBorder,
            color: vars.color.tertiarySubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.destructive },
        style: {
            borderColor: vars.color.destructiveSubtleBorder,
            color: vars.color.destructiveSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.success },
        style: {
            borderColor: vars.color.successSubtleBorder,
            color: vars.color.successSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.warning },
        style: {
            borderColor: vars.color.warningSubtleBorder,
            color: vars.color.warningSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.info },
        style: {
            borderColor: vars.color.infoSubtleBorder,
            color: vars.color.infoSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.purple },
        style: {
            borderColor: vars.color.purpleSubtleBorder,
            color: vars.color.purpleSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.pink },
        style: {
            borderColor: vars.color.pinkSubtleBorder,
            color: vars.color.pinkSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.orange },
        style: {
            borderColor: vars.color.orangeSubtleBorder,
            color: vars.color.orangeSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.teal },
        style: {
            borderColor: vars.color.tealSubtleBorder,
            color: vars.color.tealSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.cyan },
        style: {
            borderColor: vars.color.cyanSubtleBorder,
            color: vars.color.cyanSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.outline, color: BADGE_COLORS.indigo },
        style: {
            borderColor: vars.color.indigoSubtleBorder,
            color: vars.color.indigoSubtleForeground,
        },
    },
] as const
