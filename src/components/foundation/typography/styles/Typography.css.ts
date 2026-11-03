import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { SPACE_VARIANTS } from '@constants/styles/spaceVariants.const.ts'
import { truncateTextStyles } from '@components/foundation/typography/utils/truncateTextStyles.utils.ts'

const marginVariants = {
    auto: { margin: 'auto' },
    none: { margin: SPACE_VARIANTS.none },
    px: { margin: SPACE_VARIANTS.px },
    xxs: { margin: SPACE_VARIANTS.xxs },
    xs: { margin: SPACE_VARIANTS.xs },
    xs2: { margin: SPACE_VARIANTS.xs2 },
    sm: { margin: SPACE_VARIANTS.sm },
    sm2: { margin: SPACE_VARIANTS.sm2 },
    md: { margin: SPACE_VARIANTS.md },
    md2: { margin: SPACE_VARIANTS.md2 },
    lg: { margin: SPACE_VARIANTS.lg },
    lg2: { margin: SPACE_VARIANTS.lg2 },
    xl: { margin: SPACE_VARIANTS.xl },
    '2xl': { margin: SPACE_VARIANTS['2xl'] },
    '3xl': { margin: SPACE_VARIANTS['3xl'] },
    '4xl': { margin: SPACE_VARIANTS['4xl'] },
    '5xl': { margin: SPACE_VARIANTS['5xl'] },
} as const

const headingStyles = {
    scrollMarginTop: vars.space['3xl'],
    lineHeight: vars.lineHeight.tight,
    textWrap: 'balance' as const,
}

export const TYPOGRAPHY_STYLES = {
    recipe: recipe({
        base: {
            margin: 0,
            transition: `opacity ${vars.duration.normal} ${vars.easing.standard}`,
            fontFamily: vars.fontFamily.sans,
            lineHeight: vars.lineHeight.normal,
        },

        variants: {
            variant: {
                h1: {
                    ...headingStyles,
                    fontSize: vars.fontSize['3xl'],
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                h2: {
                    ...headingStyles,
                    fontSize: vars.fontSize['2xl'],
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                h3: {
                    ...headingStyles,
                    fontSize: vars.fontSize.xl,
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                h4: {
                    ...headingStyles,
                    fontSize: vars.fontSize.lg,
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                h5: {
                    ...headingStyles,
                    fontSize: vars.fontSize.md,
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                h6: {
                    ...headingStyles,
                    fontSize: vars.fontSize.md,
                    fontWeight: vars.fontWeight.semibold,
                    letterSpacing: vars.letterSpacing.tight,
                },
                p: {
                    fontSize: vars.fontSize.md,
                    lineHeight: vars.lineHeight.loose,
                },
                span: {},
                label: {
                    fontSize: vars.fontSize.md,
                    fontWeight: vars.fontWeight.medium,
                    lineHeight: vars.lineHeight.normal,
                    color: vars.color.text.primary,
                    selectors: {
                        '&[data-disabled]': {
                            cursor: 'not-allowed',
                            opacity: 0.45,
                        },
                    },
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
                    borderLeft: `2px solid ${vars.color.border.main}`,
                    paddingLeft: vars.space.xl,
                    fontStyle: 'italic',
                    color: vars.color.surface.mutedForeground,
                },
                pre: {
                    borderRadius: vars.radius.md,
                    backgroundColor: vars.color.surface.muted,
                    padding: vars.space.lg,
                    fontFamily: vars.fontFamily.mono,
                    fontSize: vars.fontSize.sm,
                    overflowX: 'auto',
                },
                code: {
                    borderRadius: vars.radius.sm,
                    backgroundColor: vars.color.surface.muted,
                    paddingInline: '0.3rem',
                    paddingBlock: '0.2rem',
                    fontFamily: vars.fontFamily.mono,
                    fontSize: vars.fontSize.sm,
                    fontWeight: vars.fontWeight.semibold,
                },
                kbd: {
                    borderRadius: vars.radius.sm,
                    border: `1px solid ${vars.color.border.main}`,
                    backgroundColor: vars.color.surface.muted,
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
                    color: vars.color.surface.mutedForeground,
                },
                mark: {
                    borderRadius: vars.radius.sm,
                    backgroundColor: vars.color.highlight.main,
                    color: vars.color.highlight.foreground,
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
                md: { fontSize: vars.fontSize.md },
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

            margin: marginVariants,

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
        },

        defaultVariants: {
            variant: 'span',
        },
    }),
}
