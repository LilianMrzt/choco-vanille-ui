import { IMAGE_STYLES } from '@components/layout/image/styles/Image.css.ts'
import type { ImageProps } from '@components/layout/image/types/Image.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, useMemo, type FC } from 'react'

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
                backgroundColor,
            }),
        [
            objectFit,
            objectPosition,
            borderRadius,
            padding,
            margin,
            backgroundColor,
        ],
    )

    return (
        <img
            ref={ref}
            alt={alt}
            className={cn(recipeClassName, className)}
            style={{
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
