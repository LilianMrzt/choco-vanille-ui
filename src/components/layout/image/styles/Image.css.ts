import { recipe } from '@vanilla-extract/recipes'

import { vars } from '@theme/styles/contract/contract.css.ts'

export const IMAGE_STYLES = {
    recipe: recipe({
        base: {
            maxWidth: '100%',
            height: 'auto',
            flexShrink: 0
        },

        variants: {
            // Object Fit
            objectFit: {
                contain: { objectFit: 'contain' },
                cover: { objectFit: 'cover' },
                fill: { objectFit: 'fill' },
                none: { objectFit: 'none' },
                'scale-down': { objectFit: 'scale-down' },
            },

            // Object Position
            objectPosition: {
                center: { objectPosition: 'center' },
                top: { objectPosition: 'top' },
                bottom: { objectPosition: 'bottom' },
                left: { objectPosition: 'left' },
                right: { objectPosition: 'right' },
                'top-left': { objectPosition: 'left top' },
                'top-right': { objectPosition: 'right top' },
                'bottom-left': { objectPosition: 'left bottom' },
                'bottom-right': { objectPosition: 'right bottom' },
            },

            // Border Radius
            borderRadius: {
                none: { borderRadius: vars.radius.none },
                xs: { borderRadius: vars.radius.xs },
                sm: { borderRadius: vars.radius.sm },
                md: { borderRadius: vars.radius.md },
                lg: { borderRadius: vars.radius.lg },
                xl: { borderRadius: vars.radius.xl },
                '2xl': { borderRadius: vars.radius['2xl'] },
                full: { borderRadius: vars.radius.full },
            },

            // Padding
            padding: {
                none: { padding: vars.space.none },
                px: { padding: vars.space.px },
                xxs: { padding: vars.space.xxs },
                xs: { padding: vars.space.xs },
                xs2: { padding: vars.space.xs2 },
                sm: { padding: vars.space.sm },
                md: { padding: vars.space.md },
                lg: { padding: vars.space.lg },
                xl: { padding: vars.space.xl },
                '2xl': { padding: vars.space['2xl'] },
                '3xl': { padding: vars.space['3xl'] },
                '4xl': { padding: vars.space['4xl'] },
                '5xl': { padding: vars.space['5xl'] },
            },

            // Margin
            margin: {
                auto: { margin: 'auto' },
                none: { margin: vars.space.none },
                px: { margin: vars.space.px },
                xxs: { margin: vars.space.xxs },
                xs: { margin: vars.space.xs },
                xs2: { margin: vars.space.xs2 },
                sm: { margin: vars.space.sm },
                md: { margin: vars.space.md },
                lg: { margin: vars.space.lg },
                xl: { margin: vars.space.xl },
                '2xl': { margin: vars.space['2xl'] },
                '3xl': { margin: vars.space['3xl'] },
                '4xl': { margin: vars.space['4xl'] },
                '5xl': { margin: vars.space['5xl'] },
            },

        },
    }),
}
