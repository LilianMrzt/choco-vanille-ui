import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'

export const BADGE_STYLES = {
    recipe: recipe({
        base: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            borderRadius: vars.radius.full,
            border: `1px solid transparent`,
            fontFamily: vars.fontFamily.sans,
            lineHeight: vars.lineHeight.none,
        },

        variants: {
            size: {
                sm: {
                    minHeight: '1.25rem',
                    paddingInline: vars.space.xs,
                    paddingBlock: vars.space.xxs,
                    gap: vars.space.xxs,
                },
                md: {
                    minHeight: '1.5rem',
                    paddingInline: vars.space.sm,
                    paddingBlock: vars.space.xxs,
                    gap: vars.space.xs,
                },
                lg: {
                    minHeight: '1.75rem',
                    paddingInline: vars.space.md,
                    paddingBlock: vars.space.xs,
                    gap: vars.space.xs,
                },
            },

            variant: {
                solid: {},
                subtle: {},
                outline: {
                    backgroundColor: 'transparent',
                },
            },

            color: {
                primary: {},
                secondary: {},
                destructive: {},
                success: {},
                warning: {},
                info: {},
                purple: {},
                pink: {},
                orange: {},
                teal: {},
                cyan: {},
                indigo: {},
            },
        },

        compoundVariants: [
            // Solid
            {
                variants: { variant: 'solid', color: 'primary' },
                style: {
                    backgroundColor: vars.color.primary,
                    color: vars.color.primaryForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'secondary' },
                style: {
                    backgroundColor: vars.color.secondary,
                    color: vars.color.secondaryForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'destructive' },
                style: {
                    backgroundColor: vars.color.destructive,
                    color: vars.color.destructiveForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'success' },
                style: {
                    backgroundColor: vars.color.success,
                    color: vars.color.successForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'warning' },
                style: {
                    backgroundColor: vars.color.warning,
                    color: vars.color.warningForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'info' },
                style: {
                    backgroundColor: vars.color.info,
                    color: vars.color.infoForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'purple' },
                style: {
                    backgroundColor: vars.color.purple,
                    color: vars.color.purpleForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'pink' },
                style: {
                    backgroundColor: vars.color.pink,
                    color: vars.color.pinkForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'orange' },
                style: {
                    backgroundColor: vars.color.orange,
                    color: vars.color.orangeForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'teal' },
                style: {
                    backgroundColor: vars.color.teal,
                    color: vars.color.tealForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'cyan' },
                style: {
                    backgroundColor: vars.color.cyan,
                    color: vars.color.cyanForeground,
                },
            },
            {
                variants: { variant: 'solid', color: 'indigo' },
                style: {
                    backgroundColor: vars.color.indigo,
                    color: vars.color.indigoForeground,
                },
            },

            // Subtle
            {
                variants: { variant: 'subtle', color: 'primary' },
                style: {
                    backgroundColor: vars.color.primarySubtle,
                    color: vars.color.primarySubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'secondary' },
                style: {
                    backgroundColor: vars.color.secondarySubtle,
                    color: vars.color.secondarySubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'destructive' },
                style: {
                    backgroundColor: vars.color.destructiveSubtle,
                    color: vars.color.destructiveSubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'success' },
                style: {
                    backgroundColor: vars.color.successSubtle,
                    color: vars.color.successSubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'warning' },
                style: {
                    backgroundColor: vars.color.warningSubtle,
                    color: vars.color.warningSubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'info' },
                style: {
                    backgroundColor: vars.color.infoSubtle,
                    color: vars.color.infoSubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'purple' },
                style: {
                    backgroundColor: vars.color.purpleSubtle,
                    color: vars.color.purpleSubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'pink' },
                style: {
                    backgroundColor: vars.color.pinkSubtle,
                    color: vars.color.pinkSubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'orange' },
                style: {
                    backgroundColor: vars.color.orangeSubtle,
                    color: vars.color.orangeSubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'teal' },
                style: {
                    backgroundColor: vars.color.tealSubtle,
                    color: vars.color.tealSubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'cyan' },
                style: {
                    backgroundColor: vars.color.cyanSubtle,
                    color: vars.color.cyanSubtleForeground,
                },
            },
            {
                variants: { variant: 'subtle', color: 'indigo' },
                style: {
                    backgroundColor: vars.color.indigoSubtle,
                    color: vars.color.indigoSubtleForeground,
                },
            },

            // Outline
            {
                variants: { variant: 'outline', color: 'primary' },
                style: {
                    borderColor: vars.color.primarySubtleBorder,
                    color: vars.color.primarySubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'secondary' },
                style: {
                    borderColor: vars.color.secondarySubtleBorder,
                    color: vars.color.secondarySubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'destructive' },
                style: {
                    borderColor: vars.color.destructiveSubtleBorder,
                    color: vars.color.destructiveSubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'success' },
                style: {
                    borderColor: vars.color.successSubtleBorder,
                    color: vars.color.successSubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'warning' },
                style: {
                    borderColor: vars.color.warningSubtleBorder,
                    color: vars.color.warningSubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'info' },
                style: {
                    borderColor: vars.color.infoSubtleBorder,
                    color: vars.color.infoSubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'purple' },
                style: {
                    borderColor: vars.color.purpleSubtleBorder,
                    color: vars.color.purpleSubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'pink' },
                style: {
                    borderColor: vars.color.pinkSubtleBorder,
                    color: vars.color.pinkSubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'orange' },
                style: {
                    borderColor: vars.color.orangeSubtleBorder,
                    color: vars.color.orangeSubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'teal' },
                style: {
                    borderColor: vars.color.tealSubtleBorder,
                    color: vars.color.tealSubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'cyan' },
                style: {
                    borderColor: vars.color.cyanSubtleBorder,
                    color: vars.color.cyanSubtleForeground,
                },
            },
            {
                variants: { variant: 'outline', color: 'indigo' },
                style: {
                    borderColor: vars.color.indigoSubtleBorder,
                    color: vars.color.indigoSubtleForeground,
                },
            },
        ],

        defaultVariants: {
            variant: 'subtle',
            color: 'primary',
            size: 'md',
        },
    }),
}

export type BadgeRecipeVariants = NonNullable<RecipeVariants<typeof BADGE_STYLES.recipe>>
