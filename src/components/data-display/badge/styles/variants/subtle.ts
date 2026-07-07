import { vars } from '@theme/contract.css.ts'
import { BADGE_COLORS, BADGE_VARIANTS } from '@components/data-display/badge/constants'

export const subtleCompoundVariants = [
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.primary },
        style: {
            backgroundColor: vars.color.primarySubtle,
            color: vars.color.primarySubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.secondary },
        style: {
            backgroundColor: vars.color.secondarySubtle,
            color: vars.color.secondarySubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.destructive },
        style: {
            backgroundColor: vars.color.destructiveSubtle,
            color: vars.color.destructiveSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.success },
        style: {
            backgroundColor: vars.color.successSubtle,
            color: vars.color.successSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.warning },
        style: {
            backgroundColor: vars.color.warningSubtle,
            color: vars.color.warningSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.info },
        style: {
            backgroundColor: vars.color.infoSubtle,
            color: vars.color.infoSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.purple },
        style: {
            backgroundColor: vars.color.purpleSubtle,
            color: vars.color.purpleSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.pink },
        style: {
            backgroundColor: vars.color.pinkSubtle,
            color: vars.color.pinkSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.orange },
        style: {
            backgroundColor: vars.color.orangeSubtle,
            color: vars.color.orangeSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.teal },
        style: {
            backgroundColor: vars.color.tealSubtle,
            color: vars.color.tealSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.cyan },
        style: {
            backgroundColor: vars.color.cyanSubtle,
            color: vars.color.cyanSubtleForeground,
        },
    },
    {
        variants: { variant: BADGE_VARIANTS.subtle, color: BADGE_COLORS.indigo },
        style: {
            backgroundColor: vars.color.indigoSubtle,
            color: vars.color.indigoSubtleForeground,
        },
    },
] as const
