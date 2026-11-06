import { SVG_IMAGE_STYLES } from '@components/layout/svg-image/SvgImage.css.ts'
import type { SvgImageProps } from '@components/layout/svg-image/types'
import { cn } from '@utils/cn.ts'
import { memo, useMemo, type FC } from 'react'

/**
 * Image-layout wrapper for a locally bundled SVG component. SVGs are
 * decorative by default; pass `alt` or `aria-label` for informative images.
 * SVG attributes, events and ref are passed to the supplied component.
 * Consumer `style` overrides individual inline style props.
 *
 * @param props - SVG component, accessibility and appearance.
 * @param props.image - Locally bundled SVG component.
 * @param props.alt - Alternative text; an empty string marks decoration.
 * @param props["aria-label"] - Accessible name, taking precedence over `alt`.
 * @param props.color - Theme color token for the SVG.
 * @param props.objectFit - Image fit preset.
 * @param props.objectPosition - Image position preset.
 * @param props.borderRadius - Radius token.
 * @param props.padding - Padding token.
 * @param props.margin - Margin token or `auto`.
 * @param props.backgroundColor - CSS background color.
 * @param props.width - CSS width.
 * @param props.minWidth - CSS minimum width.
 * @param props.maxWidth - CSS maximum width.
 * @param props.height - CSS height.
 * @param props.minHeight - CSS minimum height.
 * @param props.maxHeight - CSS maximum height.
 * @param props.aspectRatio - CSS aspect ratio.
 * @param props.className - Additional SVG class.
 * @param props.style - Inline style overrides.
 * @param props.ref - Ref passed to the SVG component.
 * @returns A decorative or accessible SVG.
 * @example
 * <SvgImage image={Illustration} alt="Mountain landscape" />
 */
const SvgImage: FC<SvgImageProps> = memo(
    ({
        image: ImageComponent,
        alt,
        'aria-label': ariaLabel,
        color,
        objectFit,
        objectPosition,
        borderRadius,
        padding,
        margin,
        backgroundColor,
        width,
        minWidth,
        maxWidth,
        height,
        minHeight,
        maxHeight,
        aspectRatio,
        className,
        style,
        ref,
        ...props
    }) => {
        const accessibleLabel = ariaLabel ?? (alt === '' ? undefined : alt)

        const recipeClassName = useMemo(
            () =>
                SVG_IMAGE_STYLES.recipe({
                    objectFit,
                    objectPosition,
                    borderRadius,
                    padding,
                    margin,
                }),
            [
                objectFit,
                objectPosition,
                borderRadius,
                padding,
                margin,
            ],
        )
        const colorClassName = SVG_IMAGE_STYLES.color({ color })

        return (
            <ImageComponent
                ref={ref}
                aria-hidden={accessibleLabel === undefined}
                aria-label={accessibleLabel}
                role={accessibleLabel === undefined ? undefined : 'img'}
                className={cn(recipeClassName, colorClassName, className)}
                style={{
                    backgroundColor,
                    width,
                    minWidth,
                    maxWidth,
                    height,
                    minHeight,
                    maxHeight,
                    aspectRatio,
                    ...style,
                }}
                {...props}
            />
        )
    },
)

SvgImage.displayName = 'SvgImage'

export default SvgImage
