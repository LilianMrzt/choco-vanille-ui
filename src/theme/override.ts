import { assignVars, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/**
 * Override a subset of color tokens on any CSS selector.
 * @example overrideColors('[data-brand="acme"]', { primary: 'oklch(0.55 0.2 180)' })
 */
export const overrideColors = (
    selector: string,
    colors: Partial<Record<keyof typeof vars.color, string>>,
) => {
    globalStyle(selector, {
        vars: assignVars(
            vars.color,
            { ...vars.color, ...colors } as Record<keyof typeof vars.color, string>,
        ),
    })
}

/**
 * Override a single color token on `:root`.
 * @example setColorToken('primary', 'oklch(0.55 0.2 180)')
 */
export const setColorToken = (
    token: keyof typeof vars.color,
    value: string,
) => {
    globalStyle(':root', {
        vars: { [vars.color[token]]: value },
    })
}
