import { createVar } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import {
    INSET_CLIPS,
    INSET_SIDES,
} from '@components/layout/inset/constants'

const insetSpace = createVar()
const insetSpaceProperty = insetSpace.slice(4, -1)
const negativeInsetSpace = `calc(-1 * ${insetSpace})`

const localInsetRecipe = recipe({
    base: {
        boxSizing: 'border-box',
        overflow: 'hidden',
        vars: {
            [insetSpace]: '0px',
        },
    },
    variants: {
        clip: {
            [INSET_CLIPS.borderBox]: {
                backgroundClip: 'border-box',
                clipPath: 'inset(0)',
            },
            [INSET_CLIPS.paddingBox]: {
                backgroundClip: 'padding-box',
            },
        },
        side: {
            [INSET_SIDES.all]: {
                margin: negativeInsetSpace,
            },
            [INSET_SIDES.block]: {
                marginBlock: negativeInsetSpace,
            },
            [INSET_SIDES.inline]: {
                marginInline: negativeInsetSpace,
            },
            [INSET_SIDES.top]: {
                marginBlockStart: negativeInsetSpace,
                marginInline: negativeInsetSpace,
            },
            [INSET_SIDES.right]: {
                marginBlock: negativeInsetSpace,
                marginInlineEnd: negativeInsetSpace,
            },
            [INSET_SIDES.bottom]: {
                marginInline: negativeInsetSpace,
                marginBlockEnd: negativeInsetSpace,
            },
            [INSET_SIDES.left]: {
                marginBlock: negativeInsetSpace,
                marginInlineStart: negativeInsetSpace,
            },
        },
    },
    defaultVariants: {
        clip: INSET_CLIPS.borderBox,
        side: INSET_SIDES.all,
    },
})

export const INSET_STYLES = {
    insetSpace,
    insetSpaceProperty,
    recipe: localInsetRecipe,
}
