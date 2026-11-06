import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { SPACE_VARIANTS } from '@constants/styles/spaceVariants.const.ts'
import { truncateTextStyles } from '@components/foundation/typography/utils/truncateTextStyles.utils.ts'

const MARGIN_VALUES = {
    auto: 'auto',
    ...SPACE_VARIANTS,
} as const

const marginVariants = {
    'auto': {
        margin: MARGIN_VALUES['auto'],
    },
    0: {
        margin: MARGIN_VALUES[0],
    },
    1: {
        margin: MARGIN_VALUES[1],
    },
    2: {
        margin: MARGIN_VALUES[2],
    },
    4: {
        margin: MARGIN_VALUES[4],
    },
    6: {
        margin: MARGIN_VALUES[6],
    },
    8: {
        margin: MARGIN_VALUES[8],
    },
    10: {
        margin: MARGIN_VALUES[10],
    },
    12: {
        margin: MARGIN_VALUES[12],
    },
    14: {
        margin: MARGIN_VALUES[14],
    },
    16: {
        margin: MARGIN_VALUES[16],
    },
    18: {
        margin: MARGIN_VALUES[18],
    },
    20: {
        margin: MARGIN_VALUES[20],
    },
    24: {
        margin: MARGIN_VALUES[24],
    },
    28: {
        margin: MARGIN_VALUES[28],
    },
    32: {
        margin: MARGIN_VALUES[32],
    },
    48: {
        margin: MARGIN_VALUES[48],
    },
    64: {
        margin: MARGIN_VALUES[64],
    },
    80: {
        margin: MARGIN_VALUES[80],
    },
    96: {
        margin: MARGIN_VALUES[96],
    },
    112: {
        margin: MARGIN_VALUES[112],
    },
    128: {
        margin: MARGIN_VALUES[128],
    },
} as const

const headingStyles = {
    scrollMarginTop: vars.space[48],
    lineHeight: '1.25',
    textWrap: 'balance' as const,
}

const localTypographyRecipe = recipe({
    base: {
        margin: 0,
        transition: `opacity ${vars.duration.normal} ${vars.easing.standard}`,
        fontFamily: vars.fontFamily.sans,
        lineHeight: '1.5',
    },

    variants: {
        variant: {
            h1: {
                ...headingStyles,
                fontSize: vars.fontSize[30],
                fontWeight: vars.fontWeight.semibold,
                letterSpacing: '-0.025em',
            },
            h2: {
                ...headingStyles,
                fontSize: vars.fontSize[24],
                fontWeight: vars.fontWeight.semibold,
                letterSpacing: '-0.025em',
            },
            h3: {
                ...headingStyles,
                fontSize: vars.fontSize[20],
                fontWeight: vars.fontWeight.semibold,
                letterSpacing: '-0.025em',
            },
            h4: {
                ...headingStyles,
                fontSize: vars.fontSize[18],
                fontWeight: vars.fontWeight.semibold,
                letterSpacing: '-0.025em',
            },
            h5: {
                ...headingStyles,
                fontSize: vars.fontSize[16],
                fontWeight: vars.fontWeight.semibold,
                letterSpacing: '-0.025em',
            },
            h6: {
                ...headingStyles,
                fontSize: vars.fontSize[16],
                fontWeight: vars.fontWeight.semibold,
                letterSpacing: '-0.025em',
            },
            p: {
                fontSize: vars.fontSize[16],
                lineHeight: '1.75',
            },
            span: {},
            label: {
                fontSize: vars.fontSize[16],
                fontWeight: vars.fontWeight.medium,
                lineHeight: '1.5',
                color: vars.color.text.primary,
                selectors: {
                    '&[data-disabled]': {
                        cursor: 'not-allowed',
                        opacity: 0.45,
                    },
                },
            },
            small: {
                fontSize: vars.fontSize[14],
                lineHeight: '1',
            },
            strong: {
                fontWeight: vars.fontWeight.bold,
            },
            em: {
                fontStyle: 'italic',
            },
            blockquote: {
                borderLeft: `2px solid ${vars.color.border.main}`,
                paddingLeft: vars.space[24],
                fontStyle: 'italic',
                color: vars.color.surface.mutedForeground,
            },
            pre: {
                borderRadius: vars.radius[8],
                backgroundColor: vars.color.surface.muted,
                padding: vars.space[16],
                fontFamily: vars.fontFamily.mono,
                fontSize: vars.fontSize[14],
                overflowX: 'auto',
            },
            code: {
                borderRadius: vars.radius[6],
                backgroundColor: vars.color.surface.muted,
                paddingInline: '0.3rem',
                paddingBlock: '0.2rem',
                fontFamily: vars.fontFamily.mono,
                fontSize: vars.fontSize[14],
                fontWeight: vars.fontWeight.semibold,
            },
            kbd: {
                borderRadius: vars.radius[6],
                border: `1px solid ${vars.color.border.main}`,
                backgroundColor: vars.color.surface.muted,
                paddingInline: vars.space[8],
                paddingBlock: vars.space[4],
                fontFamily: vars.fontFamily.mono,
                fontSize: vars.fontSize[12],
                fontWeight: vars.fontWeight.semibold,
                boxShadow: vars.shadow.sm,
            },
            samp: {
                fontFamily: vars.fontFamily.mono,
                fontSize: vars.fontSize[14],
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
                borderRadius: vars.radius[6],
                backgroundColor: vars.color.highlight.main,
                color: vars.color.highlight.foreground,
                paddingInline: vars.space[4],
            },
            del: {
                textDecoration: 'line-through',
                opacity: 0.7,
            },
            ins: {
                textDecoration: 'underline',
            },
            sub: {
                fontSize: vars.fontSize[12],
                verticalAlign: 'sub',
            },
            sup: {
                fontSize: vars.fontSize[12],
                verticalAlign: 'super',
            },
        },

        fontSize: {
            10: {
                fontSize: vars.fontSize[10],
            },
            12: {
                fontSize: vars.fontSize[12],
            },
            14: {
                fontSize: vars.fontSize[14],
            },
            16: {
                fontSize: vars.fontSize[16],
            },
            18: {
                fontSize: vars.fontSize[18],
            },
            20: {
                fontSize: vars.fontSize[20],
            },
            24: {
                fontSize: vars.fontSize[24],
            },
            30: {
                fontSize: vars.fontSize[30],
            },
            36: {
                fontSize: vars.fontSize[36],
            },
            48: {
                fontSize: vars.fontSize[48],
            },
            60: {
                fontSize: vars.fontSize[60],
            },
            72: {
                fontSize: vars.fontSize[72],
            },
        },

        fontWeight: {
            thin: {
                fontWeight: vars.fontWeight.thin,
            },
            extralight: {
                fontWeight: vars.fontWeight.extralight,
            },
            light: {
                fontWeight: vars.fontWeight.light,
            },
            normal: {
                fontWeight: vars.fontWeight.normal,
            },
            medium: {
                fontWeight: vars.fontWeight.medium,
            },
            semibold: {
                fontWeight: vars.fontWeight.semibold,
            },
            bold: {
                fontWeight: vars.fontWeight.bold,
            },
            extrabold: {
                fontWeight: vars.fontWeight.extrabold,
            },
            black: {
                fontWeight: vars.fontWeight.black,
            },
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
})

export const TYPOGRAPHY_STYLES = {
    recipe: localTypographyRecipe,
}
