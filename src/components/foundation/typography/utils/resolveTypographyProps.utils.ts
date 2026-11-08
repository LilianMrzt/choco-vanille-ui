import { TYPOGRAPHY_STYLES } from '@components/foundation/typography/Typography.css.ts'
import {
    TYPOGRAPHY_ELEMENT_MAP,
    TYPOGRAPHY_INLINE_PROPERTIES,
} from '@components/foundation/typography/constants'
import type { TypographyVariant } from '@components/foundation/typography/types'
import { resolveBoxProps } from '@components/layout/box/utils/resolveBoxProps.utils'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { cn } from '@utils/cn.ts'

/**
 * Resolves semantic presets, typography and shared layout attributes.
 * CSS overrides are applied after preset classes; explicit style wins.
 * @param props - Typography, layout and element attributes.
 * @returns The resolved variant and element attributes.
 * @throws When a variant, typography token or positive integer line limit is invalid.
 * @example
 * resolveTypographyProps({ variant: 'p', lineHeight: 1.6 })
 */
export const resolveTypographyProps = (
    props: Readonly<Record<string, unknown>>,
): Readonly<{
    variant: TypographyVariant
    props: Record<string, unknown>
}> => {
    const {
        as,
        variant,
        fontSize,
        fontWeight,
        fontFamily,
        ellipsis,
        maxLines,
        className,
        style,
        ...remainingProps
    } = props
    const layoutProps: Record<string, unknown> = { ...remainingProps }
    const inferred =
        typeof as === 'string' && Object.hasOwn(TYPOGRAPHY_ELEMENT_MAP, as)
            ? as
            : 'span'
    const resolved = variant ?? inferred
    if (
        typeof resolved !== 'string' ||
        !Object.hasOwn(TYPOGRAPHY_ELEMENT_MAP, resolved)
    ) {
        throw new TypeError(
            `Typography: unsupported variant "${String(resolved)}".`,
        )
    }
    if (
        fontSize !== undefined &&
        (typeof fontSize !== 'number' ||
            !Object.hasOwn(vars.fontSize, fontSize))
    ) {
        throw new TypeError(
            `Typography: unsupported fontSize token "${String(fontSize)}".`,
        )
    }
    if (
        fontWeight !== undefined &&
        (typeof fontWeight !== 'string' ||
            !Object.hasOwn(vars.fontWeight, fontWeight))
    ) {
        throw new TypeError(
            `Typography: unsupported fontWeight token "${String(fontWeight)}".`,
        )
    }
    if (
        fontFamily !== undefined &&
        (typeof fontFamily !== 'string' ||
            !Object.hasOwn(vars.fontFamily, fontFamily))
    ) {
        throw new TypeError(
            `Typography: unsupported fontFamily token "${String(fontFamily)}".`,
        )
    }
    if (
        maxLines !== undefined &&
        (typeof maxLines !== 'number' ||
            !Number.isInteger(maxLines) ||
            maxLines < 1)
    ) {
        throw new TypeError('Typography: maxLines must be a positive integer.')
    }
    if (ellipsis !== undefined && typeof ellipsis !== 'boolean') {
        throw new TypeError('Typography: ellipsis must be a boolean.')
    }
    if (className !== undefined && typeof className !== 'string') {
        throw new TypeError('Typography: className must be a string.')
    }
    if (
        style !== undefined &&
        (style === null || typeof style !== 'object' || Array.isArray(style))
    ) {
        throw new TypeError('Typography: style must be an object.')
    }
    const typographyStyle: Record<string, string | number> = {}
    for (const key of TYPOGRAPHY_INLINE_PROPERTIES) {
        const value = layoutProps[key]
        delete layoutProps[key]
        if (value === undefined) {
            continue
        }
        if (
            typeof value !== 'string' &&
            !(typeof value === 'number' && Number.isFinite(value))
        ) {
            throw new TypeError(
                `Typography: "${key}" must be a CSS string or finite number.`,
            )
        }
        typographyStyle[key] = value
    }
    if (
        typeof fontFamily === 'string' &&
        Object.hasOwn(vars.fontFamily, fontFamily)
    ) {
        typographyStyle.fontFamily =
            vars.fontFamily[fontFamily as keyof typeof vars.fontFamily]
    }
    if (typeof maxLines === 'number') {
        typographyStyle.WebkitLineClamp = maxLines
    }
    const selectedVariant = resolved as TypographyVariant
    const recipeProps = {
        variant: selectedVariant,
        fontSize: fontSize as keyof typeof vars.fontSize | undefined,
        fontWeight: fontWeight as keyof typeof vars.fontWeight | undefined,
        ellipsis: maxLines === undefined && ellipsis === true,
        clamp: maxLines !== undefined,
    }
    return {
        variant: selectedVariant,
        props: resolveBoxProps({
            ...layoutProps,
            className: cn(TYPOGRAPHY_STYLES.recipe(recipeProps), className),
            style:
                Object.keys(typographyStyle).length > 0 || style !== undefined
                    ? { ...typographyStyle, ...style }
                    : undefined,
        }),
    }
}
