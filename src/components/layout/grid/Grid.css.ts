import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

export const GRID_STYLES = {
    recipe: recipe({
        base: {
            display: 'grid',
        },

        variants: {
            // Columns
            columns: {
                none: { gridTemplateColumns: 'none' },
                1: { gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' },
                2: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
                3: { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' },
                4: { gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' },
                5: { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
                6: { gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' },
                7: { gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' },
                8: { gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' },
                9: { gridTemplateColumns: 'repeat(9, minmax(0, 1fr))' },
                10: { gridTemplateColumns: 'repeat(10, minmax(0, 1fr))' },
                11: { gridTemplateColumns: 'repeat(11, minmax(0, 1fr))' },
                12: { gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' },
            },

            // Auto Rows
            autoRows: {
                auto: { gridAutoRows: 'auto' },
                min: { gridAutoRows: 'min-content' },
                max: { gridAutoRows: 'max-content' },
                fr: { gridAutoRows: 'minmax(0, 1fr)' },
            },

            // Auto Flow
            flow: {
                row: { gridAutoFlow: 'row' },
                column: { gridAutoFlow: 'column' },
                dense: { gridAutoFlow: 'dense' },
                'row-dense': { gridAutoFlow: 'row dense' },
                'column-dense': { gridAutoFlow: 'column dense' },
            },

            // Align Items
            align: {
                start: { alignItems: 'start' },
                end: { alignItems: 'end' },
                center: { alignItems: 'center' },
                stretch: { alignItems: 'stretch' },
                baseline: { alignItems: 'baseline' },
            },

            // Justify Items
            justifyItems: {
                start: { justifyItems: 'start' },
                end: { justifyItems: 'end' },
                center: { justifyItems: 'center' },
                stretch: { justifyItems: 'stretch' },
            },

            // Align Content
            alignContent: {
                start: { alignContent: 'start' },
                end: { alignContent: 'end' },
                center: { alignContent: 'center' },
                stretch: { alignContent: 'stretch' },
                between: { alignContent: 'space-between' },
                around: { alignContent: 'space-around' },
                evenly: { alignContent: 'space-evenly' },
            },

            // Justify Content
            justifyContent: {
                start: { justifyContent: 'start' },
                end: { justifyContent: 'end' },
                center: { justifyContent: 'center' },
                stretch: { justifyContent: 'stretch' },
                between: { justifyContent: 'space-between' },
                around: { justifyContent: 'space-around' },
                evenly: { justifyContent: 'space-evenly' },
            },
        },
    }),
}

export type GridRecipeVariants = NonNullable<RecipeVariants<typeof GRID_STYLES.recipe>>
