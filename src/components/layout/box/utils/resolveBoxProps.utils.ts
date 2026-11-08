import { BOX_STYLES } from '@components/layout/box/Box.css.ts'
import {
    BOX_INLINE_PROPERTIES,
    BOX_TOKEN_PROPERTIES,
} from '@components/layout/box/constants'
import { cn } from '@utils/cn.ts'

const tokenProperties: ReadonlySet<string> = new Set(BOX_TOKEN_PROPERTIES)

const inlineProperties: ReadonlySet<string> = new Set(BOX_INLINE_PROPERTIES)

/**
 * Separates styling from native or custom attributes. Explicit style wins;
 * absent styling creates no inline declarations. Shorthand declaration order
 * follows the order of the provided CSS props.
 * @param props - Native, composition and styling props.
 * @returns Attributes ready for the selected element.
 * @throws When a styling value is neither a CSS string nor a finite number.
 * @example
 * resolveBoxProps({ padding: 16, width: '100%' })
 */
export const resolveBoxProps = (
    props: Readonly<Record<string, unknown>>,
): Record<string, unknown> => {
    const nativeProps: Record<string, unknown> = {}
    const tokens: Record<string, string | number> = {}
    const inline: Record<string, string | number> = {}

    for (const [key, value] of Object.entries(props)) {
        if (key === 'as' || key === 'className' || key === 'style') {
            continue
        }
        if (!tokenProperties.has(key) && !inlineProperties.has(key)) {
            nativeProps[key] = value
            continue
        }
        if (value === undefined) {
            continue
        }
        if (
            typeof value !== 'string' &&
            !(typeof value === 'number' && Number.isFinite(value))
        ) {
            throw new TypeError(
                `Box: "${key}" must be a CSS string or finite number.`,
            )
        }
        if (tokenProperties.has(key)) {
            const acceptsString =
                key === 'boxShadow' ||
                (key === 'borderRadius' && value === 'full') ||
                (key.startsWith('margin') && value === 'auto')
            if (typeof value === 'string' && !acceptsString) {
                throw new TypeError(`Box: "${key}" requires a numeric token.`)
            }
            const variants = BOX_STYLES.recipe.classNames.variants
            if (
                !(key in variants) ||
                !Object.hasOwn(variants[key as keyof typeof variants], value)
            ) {
                throw new TypeError(`Box: unsupported ${key} token "${value}".`)
            }
            tokens[key] = value
        } else {
            inline[key] = value
        }
    }

    const { className, style } = props
    if (className !== undefined && typeof className !== 'string') {
        throw new TypeError('Box: "className" must be a string.')
    }
    if (
        style !== undefined &&
        (style === null || typeof style !== 'object' || Array.isArray(style))
    ) {
        throw new TypeError('Box: "style" must be an object.')
    }
    nativeProps.className = cn(BOX_STYLES.recipe(tokens), className)
    if (Object.keys(inline).length > 0 || style !== undefined) {
        nativeProps.style = { ...inline, ...style }
    }
    return nativeProps
}
