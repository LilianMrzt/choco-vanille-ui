import { IMAGE_STYLES } from '@components/data-display/image/Image.css.ts'
import type { ImageProps } from '@components/data-display/image/types'
import { cn } from '@utils/cn.ts'
import { memo, useMemo, type FC } from 'react'

/**
 * `<img>` wrapper with design-token props for `objectFit`, `objectPosition`,
 * `borderRadius` and spacing, plus a free CSS `backgroundColor`. Dimensional props
 * (`width`, `height`, `aspectRatio`) are applied as inline styles.
 * Provide meaningful `alt` text for informative images or an empty string for
 * decorative images. Native attributes, events and ref target the image.
 * Consumer `style` overrides individual inline style props.
 *
 * @param props - Native image attributes and presentation.
 * @param props.alt - Alternative text, or an empty string for decoration.
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
 * @param props.className - Additional image class.
 * @param props.style - Inline style overrides.
 * @param props.ref - Ref forwarded to the image.
 * @returns A native image.
 * @example
 * <Image src="/landscape.jpg" alt="Mountain landscape" />
 */
const Image: FC<ImageProps> = memo(({
    alt,
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
    const recipeClassName = useMemo(
        () =>
            IMAGE_STYLES.recipe({
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

    return (
        <img
            ref={ref}
            alt={alt}
            className={cn(recipeClassName, className)}
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
})

Image.displayName = 'Image'

export default Image
