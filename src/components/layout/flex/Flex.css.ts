import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

export const FLEX_STYLES = {
    recipe: recipe({
        base: {
            display: 'flex',
        },

        variants: {
            inline: {
                true: { display: 'inline-flex' },
            },

            direction: {
                row: { flexDirection: 'row' },
                column: { flexDirection: 'column' },
                'row-reverse': { flexDirection: 'row-reverse' },
                'column-reverse': { flexDirection: 'column-reverse' },
            },

            wrap: {
                nowrap: { flexWrap: 'nowrap' },
                wrap: { flexWrap: 'wrap' },
                'wrap-reverse': { flexWrap: 'wrap-reverse' },
            },

            align: {
                start: { alignItems: 'flex-start' },
                end: { alignItems: 'flex-end' },
                center: { alignItems: 'center' },
                stretch: { alignItems: 'stretch' },
                baseline: { alignItems: 'baseline' },
            },

            justify: {
                start: { justifyContent: 'flex-start' },
                end: { justifyContent: 'flex-end' },
                center: { justifyContent: 'center' },
                between: { justifyContent: 'space-between' },
                around: { justifyContent: 'space-around' },
                evenly: { justifyContent: 'space-evenly' },
                stretch: { justifyContent: 'stretch' },
            },
        },

        defaultVariants: {
            direction: 'row',
            align: 'center',
        },
    }),
}

export type FlexRecipeVariants = NonNullable<RecipeVariants<typeof FLEX_STYLES.recipe>>
