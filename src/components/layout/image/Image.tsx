import { IMAGE_STYLES } from '@components/layout/image/styles/Image.css.ts'
import type { ImageProps } from '@components/layout/image/types/Image.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Image: FC<ImageProps> = ({
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
    return (
        <img
            ref={ref}
            alt={alt}
            className={cn(
                IMAGE_STYLES.recipe({
                    objectFit,
                    objectPosition,
                    borderRadius,
                    padding,
                    margin,
                    backgroundColor,
                }),
                className,
            )}
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
}

Image.displayName = 'Image'

export default Image
