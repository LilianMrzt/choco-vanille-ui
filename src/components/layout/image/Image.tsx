import { IMAGE_STYLES } from '@components/layout/image/styles/Image.css.ts'
import type { ImageProps } from '@components/layout/image/types/Image.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, useMemo, type FC } from 'react'

/**
 * `<img>` wrapper with design-token props for `objectFit`, `objectPosition`,
 * `borderRadius` and spacing, plus a free CSS `backgroundColor`. Dimensional props
 * (`width`, `height`, `aspectRatio`) are applied as inline styles.
 * Always provide a meaningful `alt` text.
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
