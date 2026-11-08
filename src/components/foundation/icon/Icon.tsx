import { Icon as OfflineIcon } from '@iconify/react/offline'
import { Box } from '@components/layout/box'
import { ICON_STYLES } from '@components/foundation/icon/Icon.css.ts'
import type { IconProps } from '@components/foundation/icon/types'
import { cn } from '@utils/cn.ts'
import { memo, useId, type CSSProperties, type FC } from 'react'

/**
 * Renders trusted local Iconify data as an SVG without network requests.
 * Decorative by default (`aria-hidden`). Pass `aria-label` or
 * `aria-labelledby` to emit `role="img"` for informative icons. An icon inside
 * a named control should remain decorative — the control owns the name.
 * Color accepts CSS values without token lookup and inherits when omitted.
 * Consumer `style` overrides SVG color props. Omit `color` when stylesheet
 * interaction states own it; no inline default overrides those states.
 * Supported SVG attributes, events and refs are forwarded to the SVG element.
 * Only pass trusted icon data: the SVG body is inserted as markup.
 * Internal SVG identifiers are namespaced per instance for SSR and hydration.
 * A supplied `id` must be nonempty and unique after hyphens become underscores.
 *
 * @param props - Local Iconify data, SVG attributes and wrapper appearance.
 * @param props.icon - Trusted Iconify data to render offline.
 * @param props.size - Size preset; defaults to `md`.
 * @param props.spin - Whether to rotate continuously.
 * @param props.color - CSS color applied to the SVG.
 * @param props.padding - Padding token for the wrapper.
 * @param props.borderColor - CSS border color for the wrapper.
 * @param props.backgroundColor - CSS background color for the wrapper.
 * @param props.borderWidth - CSS border width for the wrapper.
 * @param props.borderStyle - CSS border style for the wrapper.
 * @param props.borderRadius - Radius token for the wrapper.
 * @param props["aria-label"] - Accessible name for an informative icon.
 * @param props["aria-labelledby"] - ID of an informative icon's accessible label.
 * @param props.id - Optional unique SVG ID; defaults to a stable instance ID.
 * @param props.className - Additional SVG class.
 * @param props.style - SVG style overrides.
 * @returns A decorative or accessible SVG inside a styled wrapper.
 * @throws {TypeError} If local icon data or the supplied ID is invalid.
 * @example
 * <Icon icon={SearchIcon} aria-label="Search" />
 */
const Icon: FC<IconProps> = memo(({
    icon,
    size,
    spin,
    color,
    padding,
    borderColor,
    backgroundColor,
    borderWidth,
    borderStyle,
    borderRadius,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    id,
    className,
    style,
    ...props
}) => {
    const instanceId = useId()
    const generatedId = Array.from(instanceId, (character) =>
        character.charCodeAt(0).toString(16),
    ).join('_')

    if (typeof icon?.body !== 'string' || icon.body.trim() === '') {
        throw new TypeError('Icon requires trusted local Iconify data with a nonempty SVG body.')
    }

    if (id !== undefined && id.trim() === '') {
        throw new TypeError('Icon requires a nonempty id when one is provided.')
    }

    const isDecorative = ariaLabel === undefined && ariaLabelledBy === undefined

    const recipeClassName = ICON_STYLES.recipe({
        size,
        spin,
    })

    const computedStyle: CSSProperties = {
        color,
        ...style,
    }

    return (
        <Box
            as={'span'}
            display={'inline-flex'}
            padding={padding}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            borderWidth={borderWidth}
            borderStyle={borderStyle}
            borderRadius={borderRadius}
        >
            <OfflineIcon
                {...props}
                mode={'svg'}
                icon={icon}
                id={id ?? `icon_${generatedId}`}
                width={props.width ?? 'unset'}
                height={props.height ?? 'unset'}
                aria-hidden={props['aria-hidden'] ?? isDecorative}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                role={props.role ?? (isDecorative ? 'presentation' : 'img')}
                className={cn(recipeClassName, className)}
                style={computedStyle}
            />
        </Box>
    )
})

Icon.displayName = 'Icon'

export default Icon
