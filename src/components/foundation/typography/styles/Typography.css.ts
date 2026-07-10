import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

import { vars } from '@theme/contract.css.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'
import { truncateTextStyles } from '@components/foundation/typography/utils/truncateTextStyles.utils.ts'

const colorVariants = createColorVariants('color')

export const TYPOGRAPHY_STYLES = {
    recipe: recipe({
        base: {
            margin: 0,
            transition: `opacity ${vars.duration.normal} ${vars.easing.standard}`,
        },

        variants: {
            variant: {
                h1: {
                    scrollMarginTop: vars.space['3xl'],
                    fontSize: vars.fontSize['5xl'],
                    fontWeight: vars.fontWeight.extrabold,
                    letterSpacing: vars.letterSpacing.tight,
                    textWrap: 'balance',
                },
                h2: {
                    scrollMarginTop: vars.space['3xl'],
                    fontSize: vars.fontSize['4xl'],
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                h3: {
                    scrollMarginTop: vars.space['3xl'],
                    fontSize: vars.fontSize['3xl'],
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                h4: {
                    scrollMarginTop: vars.space['3xl'],
                    fontSize: vars.fontSize['2xl'],
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                h5: {
                    scrollMarginTop: vars.space['3xl'],
                    fontSize: vars.fontSize.xl,
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                h6: {
                    scrollMarginTop: vars.space['3xl'],
                    fontSize: vars.fontSize.base,
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                p: {
                    fontSize: vars.fontSize.base,
                    lineHeight: vars.lineHeight.loose,
                },
                span: {},
                label: {
                    fontSize: vars.fontSize.sm,
                    fontWeight: vars.fontWeight.medium,
                    lineHeight: vars.lineHeight.none,
                },
                small: {
                    fontSize: vars.fontSize.sm,
                    lineHeight: vars.lineHeight.none,
                },
                strong: {
                    fontWeight: vars.fontWeight.bold,
                },
                em: {
                    fontStyle: 'italic',
                },
                blockquote: {
                    borderLeft: `2px solid ${vars.color.border}`,
                    paddingLeft: vars.space.xl,
                    fontStyle: 'italic',
                    color: vars.color.mutedForeground,
                },
                pre: {
                    borderRadius: vars.radius.md,
                    backgroundColor: vars.color.muted,
                    padding: vars.space.lg,
                    fontFamily: vars.fontFamily.mono,
                    fontSize: vars.fontSize.sm,
                    overflowX: 'auto',
                },
                code: {
                    borderRadius: vars.radius.sm,
                    backgroundColor: vars.color.muted,
                    paddingInline: '0.3rem',
                    paddingBlock: '0.2rem',
                    fontFamily: vars.fontFamily.mono,
                    fontSize: vars.fontSize.sm,
                    fontWeight: vars.fontWeight.semibold,
                },
                kbd: {
                    borderRadius: vars.radius.sm,
                    border: `1px solid ${vars.color.border}`,
                    backgroundColor: vars.color.muted,
                    paddingInline: vars.space.sm,
                    paddingBlock: vars.space.xs,
                    fontFamily: vars.fontFamily.mono,
                    fontSize: vars.fontSize.xs,
                    fontWeight: vars.fontWeight.semibold,
                    boxShadow: vars.shadow.sm,
                },
                samp: {
                    fontFamily: vars.fontFamily.mono,
                    fontSize: vars.fontSize.sm,
                },
                abbr: {
                    textDecoration: 'underline dotted',
                    cursor: 'help',
                },
                cite: {
                    fontStyle: 'italic',
                    color: vars.color.mutedForeground,
                },
                mark: {
                    borderRadius: vars.radius.sm,
                    backgroundColor: vars.color.highlight,
                    color: vars.color.highlightForeground,
                    paddingInline: vars.space.xs,
                },
                del: {
                    textDecoration: 'line-through',
                    opacity: 0.7,
                },
                ins: {
                    textDecoration: 'underline',
                },
                sub: {
                    fontSize: vars.fontSize.xs,
                    verticalAlign: 'sub',
                },
                sup: {
                    fontSize: vars.fontSize.xs,
                    verticalAlign: 'super',
                },
            },

            fontSize: {
                '2xs': { fontSize: vars.fontSize['2xs'] },
                xs: { fontSize: vars.fontSize.xs },
                sm: { fontSize: vars.fontSize.sm },
                md: { fontSize: vars.fontSize.base },
                lg: { fontSize: vars.fontSize.lg },
                xl: { fontSize: vars.fontSize.xl },
                '2xl': { fontSize: vars.fontSize['2xl'] },
                '3xl': { fontSize: vars.fontSize['3xl'] },
                '4xl': { fontSize: vars.fontSize['4xl'] },
                '5xl': { fontSize: vars.fontSize['5xl'] },
                '6xl': { fontSize: vars.fontSize['6xl'] },
            },

            fontWeight: {
                thin: { fontWeight: vars.fontWeight.thin },
                extralight: { fontWeight: vars.fontWeight.extralight },
                light: { fontWeight: vars.fontWeight.light },
                normal: { fontWeight: vars.fontWeight.normal },
                medium: { fontWeight: vars.fontWeight.medium },
                semibold: { fontWeight: vars.fontWeight.semibold },
                bold: { fontWeight: vars.fontWeight.bold },
                extrabold: { fontWeight: vars.fontWeight.extrabold },
                black: { fontWeight: vars.fontWeight.black },
            },

            ellipsis: {
                true: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                },
            },

            maxLines: {
                1: truncateTextStyles(1),
                2: truncateTextStyles(2),
                3: truncateTextStyles(3),
                4: truncateTextStyles(4),
                5: truncateTextStyles(5),
                6: truncateTextStyles(6),
            },

            color: colorVariants,
        },

        defaultVariants: {
            variant: 'p',
        },
    }),
}

export type TypographyRecipeVariants = NonNullable<RecipeVariants<typeof TYPOGRAPHY_STYLES.recipe>>
