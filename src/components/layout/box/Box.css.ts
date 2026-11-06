import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'
import { SPACE_VARIANTS } from '@constants/styles/spaceVariants.const.ts'

const MARGIN_VARIANTS = {
    auto: 'auto',
    ...SPACE_VARIANTS,
} as const

const localBoxRecipe = recipe({
    base: {},

    variants: {
        // Border Radius
        borderRadius: {
            0: {
                borderRadius: vars.radius[0],
            },
            4: {
                borderRadius: vars.radius[4],
            },
            6: {
                borderRadius: vars.radius[6],
            },
            8: {
                borderRadius: vars.radius[8],
            },
            10: {
                borderRadius: vars.radius[10],
            },
            14: {
                borderRadius: vars.radius[14],
            },
            20: {
                borderRadius: vars.radius[20],
            },
            'full': {
                borderRadius: vars.radius['full'],
            },
        },

        // Padding
        padding: {
            0: {
                padding: SPACE_VARIANTS[0],
            },
            1: {
                padding: SPACE_VARIANTS[1],
            },
            2: {
                padding: SPACE_VARIANTS[2],
            },
            4: {
                padding: SPACE_VARIANTS[4],
            },
            6: {
                padding: SPACE_VARIANTS[6],
            },
            8: {
                padding: SPACE_VARIANTS[8],
            },
            10: {
                padding: SPACE_VARIANTS[10],
            },
            12: {
                padding: SPACE_VARIANTS[12],
            },
            14: {
                padding: SPACE_VARIANTS[14],
            },
            16: {
                padding: SPACE_VARIANTS[16],
            },
            18: {
                padding: SPACE_VARIANTS[18],
            },
            20: {
                padding: SPACE_VARIANTS[20],
            },
            24: {
                padding: SPACE_VARIANTS[24],
            },
            28: {
                padding: SPACE_VARIANTS[28],
            },
            32: {
                padding: SPACE_VARIANTS[32],
            },
            48: {
                padding: SPACE_VARIANTS[48],
            },
            64: {
                padding: SPACE_VARIANTS[64],
            },
            80: {
                padding: SPACE_VARIANTS[80],
            },
            96: {
                padding: SPACE_VARIANTS[96],
            },
            112: {
                padding: SPACE_VARIANTS[112],
            },
            128: {
                padding: SPACE_VARIANTS[128],
            },
        },

        paddingX: {
            0: {
                paddingInline: SPACE_VARIANTS[0],
            },
            1: {
                paddingInline: SPACE_VARIANTS[1],
            },
            2: {
                paddingInline: SPACE_VARIANTS[2],
            },
            4: {
                paddingInline: SPACE_VARIANTS[4],
            },
            6: {
                paddingInline: SPACE_VARIANTS[6],
            },
            8: {
                paddingInline: SPACE_VARIANTS[8],
            },
            10: {
                paddingInline: SPACE_VARIANTS[10],
            },
            12: {
                paddingInline: SPACE_VARIANTS[12],
            },
            14: {
                paddingInline: SPACE_VARIANTS[14],
            },
            16: {
                paddingInline: SPACE_VARIANTS[16],
            },
            18: {
                paddingInline: SPACE_VARIANTS[18],
            },
            20: {
                paddingInline: SPACE_VARIANTS[20],
            },
            24: {
                paddingInline: SPACE_VARIANTS[24],
            },
            28: {
                paddingInline: SPACE_VARIANTS[28],
            },
            32: {
                paddingInline: SPACE_VARIANTS[32],
            },
            48: {
                paddingInline: SPACE_VARIANTS[48],
            },
            64: {
                paddingInline: SPACE_VARIANTS[64],
            },
            80: {
                paddingInline: SPACE_VARIANTS[80],
            },
            96: {
                paddingInline: SPACE_VARIANTS[96],
            },
            112: {
                paddingInline: SPACE_VARIANTS[112],
            },
            128: {
                paddingInline: SPACE_VARIANTS[128],
            },
        },

        paddingY: {
            0: {
                paddingBlock: SPACE_VARIANTS[0],
            },
            1: {
                paddingBlock: SPACE_VARIANTS[1],
            },
            2: {
                paddingBlock: SPACE_VARIANTS[2],
            },
            4: {
                paddingBlock: SPACE_VARIANTS[4],
            },
            6: {
                paddingBlock: SPACE_VARIANTS[6],
            },
            8: {
                paddingBlock: SPACE_VARIANTS[8],
            },
            10: {
                paddingBlock: SPACE_VARIANTS[10],
            },
            12: {
                paddingBlock: SPACE_VARIANTS[12],
            },
            14: {
                paddingBlock: SPACE_VARIANTS[14],
            },
            16: {
                paddingBlock: SPACE_VARIANTS[16],
            },
            18: {
                paddingBlock: SPACE_VARIANTS[18],
            },
            20: {
                paddingBlock: SPACE_VARIANTS[20],
            },
            24: {
                paddingBlock: SPACE_VARIANTS[24],
            },
            28: {
                paddingBlock: SPACE_VARIANTS[28],
            },
            32: {
                paddingBlock: SPACE_VARIANTS[32],
            },
            48: {
                paddingBlock: SPACE_VARIANTS[48],
            },
            64: {
                paddingBlock: SPACE_VARIANTS[64],
            },
            80: {
                paddingBlock: SPACE_VARIANTS[80],
            },
            96: {
                paddingBlock: SPACE_VARIANTS[96],
            },
            112: {
                paddingBlock: SPACE_VARIANTS[112],
            },
            128: {
                paddingBlock: SPACE_VARIANTS[128],
            },
        },

        paddingTop: {
            0: {
                paddingTop: SPACE_VARIANTS[0],
            },
            1: {
                paddingTop: SPACE_VARIANTS[1],
            },
            2: {
                paddingTop: SPACE_VARIANTS[2],
            },
            4: {
                paddingTop: SPACE_VARIANTS[4],
            },
            6: {
                paddingTop: SPACE_VARIANTS[6],
            },
            8: {
                paddingTop: SPACE_VARIANTS[8],
            },
            10: {
                paddingTop: SPACE_VARIANTS[10],
            },
            12: {
                paddingTop: SPACE_VARIANTS[12],
            },
            14: {
                paddingTop: SPACE_VARIANTS[14],
            },
            16: {
                paddingTop: SPACE_VARIANTS[16],
            },
            18: {
                paddingTop: SPACE_VARIANTS[18],
            },
            20: {
                paddingTop: SPACE_VARIANTS[20],
            },
            24: {
                paddingTop: SPACE_VARIANTS[24],
            },
            28: {
                paddingTop: SPACE_VARIANTS[28],
            },
            32: {
                paddingTop: SPACE_VARIANTS[32],
            },
            48: {
                paddingTop: SPACE_VARIANTS[48],
            },
            64: {
                paddingTop: SPACE_VARIANTS[64],
            },
            80: {
                paddingTop: SPACE_VARIANTS[80],
            },
            96: {
                paddingTop: SPACE_VARIANTS[96],
            },
            112: {
                paddingTop: SPACE_VARIANTS[112],
            },
            128: {
                paddingTop: SPACE_VARIANTS[128],
            },
        },

        paddingRight: {
            0: {
                paddingRight: SPACE_VARIANTS[0],
            },
            1: {
                paddingRight: SPACE_VARIANTS[1],
            },
            2: {
                paddingRight: SPACE_VARIANTS[2],
            },
            4: {
                paddingRight: SPACE_VARIANTS[4],
            },
            6: {
                paddingRight: SPACE_VARIANTS[6],
            },
            8: {
                paddingRight: SPACE_VARIANTS[8],
            },
            10: {
                paddingRight: SPACE_VARIANTS[10],
            },
            12: {
                paddingRight: SPACE_VARIANTS[12],
            },
            14: {
                paddingRight: SPACE_VARIANTS[14],
            },
            16: {
                paddingRight: SPACE_VARIANTS[16],
            },
            18: {
                paddingRight: SPACE_VARIANTS[18],
            },
            20: {
                paddingRight: SPACE_VARIANTS[20],
            },
            24: {
                paddingRight: SPACE_VARIANTS[24],
            },
            28: {
                paddingRight: SPACE_VARIANTS[28],
            },
            32: {
                paddingRight: SPACE_VARIANTS[32],
            },
            48: {
                paddingRight: SPACE_VARIANTS[48],
            },
            64: {
                paddingRight: SPACE_VARIANTS[64],
            },
            80: {
                paddingRight: SPACE_VARIANTS[80],
            },
            96: {
                paddingRight: SPACE_VARIANTS[96],
            },
            112: {
                paddingRight: SPACE_VARIANTS[112],
            },
            128: {
                paddingRight: SPACE_VARIANTS[128],
            },
        },

        paddingBottom: {
            0: {
                paddingBottom: SPACE_VARIANTS[0],
            },
            1: {
                paddingBottom: SPACE_VARIANTS[1],
            },
            2: {
                paddingBottom: SPACE_VARIANTS[2],
            },
            4: {
                paddingBottom: SPACE_VARIANTS[4],
            },
            6: {
                paddingBottom: SPACE_VARIANTS[6],
            },
            8: {
                paddingBottom: SPACE_VARIANTS[8],
            },
            10: {
                paddingBottom: SPACE_VARIANTS[10],
            },
            12: {
                paddingBottom: SPACE_VARIANTS[12],
            },
            14: {
                paddingBottom: SPACE_VARIANTS[14],
            },
            16: {
                paddingBottom: SPACE_VARIANTS[16],
            },
            18: {
                paddingBottom: SPACE_VARIANTS[18],
            },
            20: {
                paddingBottom: SPACE_VARIANTS[20],
            },
            24: {
                paddingBottom: SPACE_VARIANTS[24],
            },
            28: {
                paddingBottom: SPACE_VARIANTS[28],
            },
            32: {
                paddingBottom: SPACE_VARIANTS[32],
            },
            48: {
                paddingBottom: SPACE_VARIANTS[48],
            },
            64: {
                paddingBottom: SPACE_VARIANTS[64],
            },
            80: {
                paddingBottom: SPACE_VARIANTS[80],
            },
            96: {
                paddingBottom: SPACE_VARIANTS[96],
            },
            112: {
                paddingBottom: SPACE_VARIANTS[112],
            },
            128: {
                paddingBottom: SPACE_VARIANTS[128],
            },
        },

        paddingLeft: {
            0: {
                paddingLeft: SPACE_VARIANTS[0],
            },
            1: {
                paddingLeft: SPACE_VARIANTS[1],
            },
            2: {
                paddingLeft: SPACE_VARIANTS[2],
            },
            4: {
                paddingLeft: SPACE_VARIANTS[4],
            },
            6: {
                paddingLeft: SPACE_VARIANTS[6],
            },
            8: {
                paddingLeft: SPACE_VARIANTS[8],
            },
            10: {
                paddingLeft: SPACE_VARIANTS[10],
            },
            12: {
                paddingLeft: SPACE_VARIANTS[12],
            },
            14: {
                paddingLeft: SPACE_VARIANTS[14],
            },
            16: {
                paddingLeft: SPACE_VARIANTS[16],
            },
            18: {
                paddingLeft: SPACE_VARIANTS[18],
            },
            20: {
                paddingLeft: SPACE_VARIANTS[20],
            },
            24: {
                paddingLeft: SPACE_VARIANTS[24],
            },
            28: {
                paddingLeft: SPACE_VARIANTS[28],
            },
            32: {
                paddingLeft: SPACE_VARIANTS[32],
            },
            48: {
                paddingLeft: SPACE_VARIANTS[48],
            },
            64: {
                paddingLeft: SPACE_VARIANTS[64],
            },
            80: {
                paddingLeft: SPACE_VARIANTS[80],
            },
            96: {
                paddingLeft: SPACE_VARIANTS[96],
            },
            112: {
                paddingLeft: SPACE_VARIANTS[112],
            },
            128: {
                paddingLeft: SPACE_VARIANTS[128],
            },
        },

        // Margin
        margin: {
            'auto': {
                margin: MARGIN_VARIANTS['auto'],
            },
            0: {
                margin: MARGIN_VARIANTS[0],
            },
            1: {
                margin: MARGIN_VARIANTS[1],
            },
            2: {
                margin: MARGIN_VARIANTS[2],
            },
            4: {
                margin: MARGIN_VARIANTS[4],
            },
            6: {
                margin: MARGIN_VARIANTS[6],
            },
            8: {
                margin: MARGIN_VARIANTS[8],
            },
            10: {
                margin: MARGIN_VARIANTS[10],
            },
            12: {
                margin: MARGIN_VARIANTS[12],
            },
            14: {
                margin: MARGIN_VARIANTS[14],
            },
            16: {
                margin: MARGIN_VARIANTS[16],
            },
            18: {
                margin: MARGIN_VARIANTS[18],
            },
            20: {
                margin: MARGIN_VARIANTS[20],
            },
            24: {
                margin: MARGIN_VARIANTS[24],
            },
            28: {
                margin: MARGIN_VARIANTS[28],
            },
            32: {
                margin: MARGIN_VARIANTS[32],
            },
            48: {
                margin: MARGIN_VARIANTS[48],
            },
            64: {
                margin: MARGIN_VARIANTS[64],
            },
            80: {
                margin: MARGIN_VARIANTS[80],
            },
            96: {
                margin: MARGIN_VARIANTS[96],
            },
            112: {
                margin: MARGIN_VARIANTS[112],
            },
            128: {
                margin: MARGIN_VARIANTS[128],
            },
        },

        marginX: {
            'auto': {
                marginInline: MARGIN_VARIANTS['auto'],
            },
            0: {
                marginInline: MARGIN_VARIANTS[0],
            },
            1: {
                marginInline: MARGIN_VARIANTS[1],
            },
            2: {
                marginInline: MARGIN_VARIANTS[2],
            },
            4: {
                marginInline: MARGIN_VARIANTS[4],
            },
            6: {
                marginInline: MARGIN_VARIANTS[6],
            },
            8: {
                marginInline: MARGIN_VARIANTS[8],
            },
            10: {
                marginInline: MARGIN_VARIANTS[10],
            },
            12: {
                marginInline: MARGIN_VARIANTS[12],
            },
            14: {
                marginInline: MARGIN_VARIANTS[14],
            },
            16: {
                marginInline: MARGIN_VARIANTS[16],
            },
            18: {
                marginInline: MARGIN_VARIANTS[18],
            },
            20: {
                marginInline: MARGIN_VARIANTS[20],
            },
            24: {
                marginInline: MARGIN_VARIANTS[24],
            },
            28: {
                marginInline: MARGIN_VARIANTS[28],
            },
            32: {
                marginInline: MARGIN_VARIANTS[32],
            },
            48: {
                marginInline: MARGIN_VARIANTS[48],
            },
            64: {
                marginInline: MARGIN_VARIANTS[64],
            },
            80: {
                marginInline: MARGIN_VARIANTS[80],
            },
            96: {
                marginInline: MARGIN_VARIANTS[96],
            },
            112: {
                marginInline: MARGIN_VARIANTS[112],
            },
            128: {
                marginInline: MARGIN_VARIANTS[128],
            },
        },

        marginY: {
            'auto': {
                marginBlock: MARGIN_VARIANTS['auto'],
            },
            0: {
                marginBlock: MARGIN_VARIANTS[0],
            },
            1: {
                marginBlock: MARGIN_VARIANTS[1],
            },
            2: {
                marginBlock: MARGIN_VARIANTS[2],
            },
            4: {
                marginBlock: MARGIN_VARIANTS[4],
            },
            6: {
                marginBlock: MARGIN_VARIANTS[6],
            },
            8: {
                marginBlock: MARGIN_VARIANTS[8],
            },
            10: {
                marginBlock: MARGIN_VARIANTS[10],
            },
            12: {
                marginBlock: MARGIN_VARIANTS[12],
            },
            14: {
                marginBlock: MARGIN_VARIANTS[14],
            },
            16: {
                marginBlock: MARGIN_VARIANTS[16],
            },
            18: {
                marginBlock: MARGIN_VARIANTS[18],
            },
            20: {
                marginBlock: MARGIN_VARIANTS[20],
            },
            24: {
                marginBlock: MARGIN_VARIANTS[24],
            },
            28: {
                marginBlock: MARGIN_VARIANTS[28],
            },
            32: {
                marginBlock: MARGIN_VARIANTS[32],
            },
            48: {
                marginBlock: MARGIN_VARIANTS[48],
            },
            64: {
                marginBlock: MARGIN_VARIANTS[64],
            },
            80: {
                marginBlock: MARGIN_VARIANTS[80],
            },
            96: {
                marginBlock: MARGIN_VARIANTS[96],
            },
            112: {
                marginBlock: MARGIN_VARIANTS[112],
            },
            128: {
                marginBlock: MARGIN_VARIANTS[128],
            },
        },

        marginTop: {
            'auto': {
                marginTop: MARGIN_VARIANTS['auto'],
            },
            0: {
                marginTop: MARGIN_VARIANTS[0],
            },
            1: {
                marginTop: MARGIN_VARIANTS[1],
            },
            2: {
                marginTop: MARGIN_VARIANTS[2],
            },
            4: {
                marginTop: MARGIN_VARIANTS[4],
            },
            6: {
                marginTop: MARGIN_VARIANTS[6],
            },
            8: {
                marginTop: MARGIN_VARIANTS[8],
            },
            10: {
                marginTop: MARGIN_VARIANTS[10],
            },
            12: {
                marginTop: MARGIN_VARIANTS[12],
            },
            14: {
                marginTop: MARGIN_VARIANTS[14],
            },
            16: {
                marginTop: MARGIN_VARIANTS[16],
            },
            18: {
                marginTop: MARGIN_VARIANTS[18],
            },
            20: {
                marginTop: MARGIN_VARIANTS[20],
            },
            24: {
                marginTop: MARGIN_VARIANTS[24],
            },
            28: {
                marginTop: MARGIN_VARIANTS[28],
            },
            32: {
                marginTop: MARGIN_VARIANTS[32],
            },
            48: {
                marginTop: MARGIN_VARIANTS[48],
            },
            64: {
                marginTop: MARGIN_VARIANTS[64],
            },
            80: {
                marginTop: MARGIN_VARIANTS[80],
            },
            96: {
                marginTop: MARGIN_VARIANTS[96],
            },
            112: {
                marginTop: MARGIN_VARIANTS[112],
            },
            128: {
                marginTop: MARGIN_VARIANTS[128],
            },
        },

        marginRight: {
            'auto': {
                marginRight: MARGIN_VARIANTS['auto'],
            },
            0: {
                marginRight: MARGIN_VARIANTS[0],
            },
            1: {
                marginRight: MARGIN_VARIANTS[1],
            },
            2: {
                marginRight: MARGIN_VARIANTS[2],
            },
            4: {
                marginRight: MARGIN_VARIANTS[4],
            },
            6: {
                marginRight: MARGIN_VARIANTS[6],
            },
            8: {
                marginRight: MARGIN_VARIANTS[8],
            },
            10: {
                marginRight: MARGIN_VARIANTS[10],
            },
            12: {
                marginRight: MARGIN_VARIANTS[12],
            },
            14: {
                marginRight: MARGIN_VARIANTS[14],
            },
            16: {
                marginRight: MARGIN_VARIANTS[16],
            },
            18: {
                marginRight: MARGIN_VARIANTS[18],
            },
            20: {
                marginRight: MARGIN_VARIANTS[20],
            },
            24: {
                marginRight: MARGIN_VARIANTS[24],
            },
            28: {
                marginRight: MARGIN_VARIANTS[28],
            },
            32: {
                marginRight: MARGIN_VARIANTS[32],
            },
            48: {
                marginRight: MARGIN_VARIANTS[48],
            },
            64: {
                marginRight: MARGIN_VARIANTS[64],
            },
            80: {
                marginRight: MARGIN_VARIANTS[80],
            },
            96: {
                marginRight: MARGIN_VARIANTS[96],
            },
            112: {
                marginRight: MARGIN_VARIANTS[112],
            },
            128: {
                marginRight: MARGIN_VARIANTS[128],
            },
        },

        marginBottom: {
            'auto': {
                marginBottom: MARGIN_VARIANTS['auto'],
            },
            0: {
                marginBottom: MARGIN_VARIANTS[0],
            },
            1: {
                marginBottom: MARGIN_VARIANTS[1],
            },
            2: {
                marginBottom: MARGIN_VARIANTS[2],
            },
            4: {
                marginBottom: MARGIN_VARIANTS[4],
            },
            6: {
                marginBottom: MARGIN_VARIANTS[6],
            },
            8: {
                marginBottom: MARGIN_VARIANTS[8],
            },
            10: {
                marginBottom: MARGIN_VARIANTS[10],
            },
            12: {
                marginBottom: MARGIN_VARIANTS[12],
            },
            14: {
                marginBottom: MARGIN_VARIANTS[14],
            },
            16: {
                marginBottom: MARGIN_VARIANTS[16],
            },
            18: {
                marginBottom: MARGIN_VARIANTS[18],
            },
            20: {
                marginBottom: MARGIN_VARIANTS[20],
            },
            24: {
                marginBottom: MARGIN_VARIANTS[24],
            },
            28: {
                marginBottom: MARGIN_VARIANTS[28],
            },
            32: {
                marginBottom: MARGIN_VARIANTS[32],
            },
            48: {
                marginBottom: MARGIN_VARIANTS[48],
            },
            64: {
                marginBottom: MARGIN_VARIANTS[64],
            },
            80: {
                marginBottom: MARGIN_VARIANTS[80],
            },
            96: {
                marginBottom: MARGIN_VARIANTS[96],
            },
            112: {
                marginBottom: MARGIN_VARIANTS[112],
            },
            128: {
                marginBottom: MARGIN_VARIANTS[128],
            },
        },

        marginLeft: {
            'auto': {
                marginLeft: MARGIN_VARIANTS['auto'],
            },
            0: {
                marginLeft: MARGIN_VARIANTS[0],
            },
            1: {
                marginLeft: MARGIN_VARIANTS[1],
            },
            2: {
                marginLeft: MARGIN_VARIANTS[2],
            },
            4: {
                marginLeft: MARGIN_VARIANTS[4],
            },
            6: {
                marginLeft: MARGIN_VARIANTS[6],
            },
            8: {
                marginLeft: MARGIN_VARIANTS[8],
            },
            10: {
                marginLeft: MARGIN_VARIANTS[10],
            },
            12: {
                marginLeft: MARGIN_VARIANTS[12],
            },
            14: {
                marginLeft: MARGIN_VARIANTS[14],
            },
            16: {
                marginLeft: MARGIN_VARIANTS[16],
            },
            18: {
                marginLeft: MARGIN_VARIANTS[18],
            },
            20: {
                marginLeft: MARGIN_VARIANTS[20],
            },
            24: {
                marginLeft: MARGIN_VARIANTS[24],
            },
            28: {
                marginLeft: MARGIN_VARIANTS[28],
            },
            32: {
                marginLeft: MARGIN_VARIANTS[32],
            },
            48: {
                marginLeft: MARGIN_VARIANTS[48],
            },
            64: {
                marginLeft: MARGIN_VARIANTS[64],
            },
            80: {
                marginLeft: MARGIN_VARIANTS[80],
            },
            96: {
                marginLeft: MARGIN_VARIANTS[96],
            },
            112: {
                marginLeft: MARGIN_VARIANTS[112],
            },
            128: {
                marginLeft: MARGIN_VARIANTS[128],
            },
        },

        // Gap (for flex / grid children)
        gap: {
            0: {
                gap: SPACE_VARIANTS[0],
            },
            1: {
                gap: SPACE_VARIANTS[1],
            },
            2: {
                gap: SPACE_VARIANTS[2],
            },
            4: {
                gap: SPACE_VARIANTS[4],
            },
            6: {
                gap: SPACE_VARIANTS[6],
            },
            8: {
                gap: SPACE_VARIANTS[8],
            },
            10: {
                gap: SPACE_VARIANTS[10],
            },
            12: {
                gap: SPACE_VARIANTS[12],
            },
            14: {
                gap: SPACE_VARIANTS[14],
            },
            16: {
                gap: SPACE_VARIANTS[16],
            },
            18: {
                gap: SPACE_VARIANTS[18],
            },
            20: {
                gap: SPACE_VARIANTS[20],
            },
            24: {
                gap: SPACE_VARIANTS[24],
            },
            28: {
                gap: SPACE_VARIANTS[28],
            },
            32: {
                gap: SPACE_VARIANTS[32],
            },
            48: {
                gap: SPACE_VARIANTS[48],
            },
            64: {
                gap: SPACE_VARIANTS[64],
            },
            80: {
                gap: SPACE_VARIANTS[80],
            },
            96: {
                gap: SPACE_VARIANTS[96],
            },
            112: {
                gap: SPACE_VARIANTS[112],
            },
            128: {
                gap: SPACE_VARIANTS[128],
            },
        },

        columnGap: {
            0: {
                columnGap: SPACE_VARIANTS[0],
            },
            1: {
                columnGap: SPACE_VARIANTS[1],
            },
            2: {
                columnGap: SPACE_VARIANTS[2],
            },
            4: {
                columnGap: SPACE_VARIANTS[4],
            },
            6: {
                columnGap: SPACE_VARIANTS[6],
            },
            8: {
                columnGap: SPACE_VARIANTS[8],
            },
            10: {
                columnGap: SPACE_VARIANTS[10],
            },
            12: {
                columnGap: SPACE_VARIANTS[12],
            },
            14: {
                columnGap: SPACE_VARIANTS[14],
            },
            16: {
                columnGap: SPACE_VARIANTS[16],
            },
            18: {
                columnGap: SPACE_VARIANTS[18],
            },
            20: {
                columnGap: SPACE_VARIANTS[20],
            },
            24: {
                columnGap: SPACE_VARIANTS[24],
            },
            28: {
                columnGap: SPACE_VARIANTS[28],
            },
            32: {
                columnGap: SPACE_VARIANTS[32],
            },
            48: {
                columnGap: SPACE_VARIANTS[48],
            },
            64: {
                columnGap: SPACE_VARIANTS[64],
            },
            80: {
                columnGap: SPACE_VARIANTS[80],
            },
            96: {
                columnGap: SPACE_VARIANTS[96],
            },
            112: {
                columnGap: SPACE_VARIANTS[112],
            },
            128: {
                columnGap: SPACE_VARIANTS[128],
            },
        },

        rowGap: {
            0: {
                rowGap: SPACE_VARIANTS[0],
            },
            1: {
                rowGap: SPACE_VARIANTS[1],
            },
            2: {
                rowGap: SPACE_VARIANTS[2],
            },
            4: {
                rowGap: SPACE_VARIANTS[4],
            },
            6: {
                rowGap: SPACE_VARIANTS[6],
            },
            8: {
                rowGap: SPACE_VARIANTS[8],
            },
            10: {
                rowGap: SPACE_VARIANTS[10],
            },
            12: {
                rowGap: SPACE_VARIANTS[12],
            },
            14: {
                rowGap: SPACE_VARIANTS[14],
            },
            16: {
                rowGap: SPACE_VARIANTS[16],
            },
            18: {
                rowGap: SPACE_VARIANTS[18],
            },
            20: {
                rowGap: SPACE_VARIANTS[20],
            },
            24: {
                rowGap: SPACE_VARIANTS[24],
            },
            28: {
                rowGap: SPACE_VARIANTS[28],
            },
            32: {
                rowGap: SPACE_VARIANTS[32],
            },
            48: {
                rowGap: SPACE_VARIANTS[48],
            },
            64: {
                rowGap: SPACE_VARIANTS[64],
            },
            80: {
                rowGap: SPACE_VARIANTS[80],
            },
            96: {
                rowGap: SPACE_VARIANTS[96],
            },
            112: {
                rowGap: SPACE_VARIANTS[112],
            },
            128: {
                rowGap: SPACE_VARIANTS[128],
            },
        },

        // Shadow
        boxShadow: {
            'none': {
                boxShadow: vars.shadow['none'],
            },
            'xs': {
                boxShadow: vars.shadow.xs,
            },
            'sm': {
                boxShadow: vars.shadow['sm'],
            },
            'md': {
                boxShadow: vars.shadow['md'],
            },
            'lg': {
                boxShadow: vars.shadow['lg'],
            },
            'xl': {
                boxShadow: vars.shadow['xl'],
            },
        },
    },
})

export const BOX_STYLES = {
    recipe: localBoxRecipe,
}
