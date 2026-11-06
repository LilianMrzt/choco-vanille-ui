import { Box } from '@components/layout/box'
import { ICON_STYLES } from '@components/foundation/icon/Icon.css.ts'
import type { IconProps } from '@components/foundation/icon/types'
import { cn } from '@utils/cn.ts'
import { memo, type CSSProperties, type FC } from 'react'

/**
 * SVG icon wrapper. Decorative by default (`aria-hidden`). Pass
 * `aria-label` to emit `role="img"` for informative icons. An icon inside
 * a named control should remain decorative — the control owns the name.
 * Color accepts CSS values without token lookup and inherits when omitted.
 * Consumer `style` overrides SVG color props. Omit `color` when stylesheet
 * interaction states own it; no inline default overrides those states.
 * SVG attributes, events and refs are forwarded to the SVG component.
 *
 * @param props - Icon component, SVG attributes and wrapper appearance.
 * @param props.icon - SVG component to render.
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
 * @param props.className - Additional SVG class.
 * @param props.style - SVG style overrides.
 * @returns A decorative or accessible SVG inside a styled wrapper.
 * @example
 * <Icon icon={SearchIcon} aria-label="Search" />
 */
const Icon: FC<IconProps> = memo(({
    icon: IconComponent,
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
    className,
    style,
    ...props
}) => {
    const isDecorative = ariaLabel === undefined

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
            <IconComponent
                width={undefined}
                height={undefined}
                aria-hidden={isDecorative}
                aria-label={ariaLabel}
                role={isDecorative ? undefined : 'img'}
                className={cn(recipeClassName, className)}
                style={computedStyle}
                {...props}
            />
        </Box>
    )
})

Icon.displayName = 'Icon'

export default Icon
