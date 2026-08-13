import { SVG_IMAGE_STYLES } from '@components/layout/svg-image/styles/SvgImage.css.ts'
import type { SvgImageProps } from '@components/layout/svg-image/types/SvgImage.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, useMemo, type FC } from 'react'

/**
 * Image-layout wrapper for a locally bundled SVG component. SVGs are
 * decorative by default; pass `alt` or `aria-label` for informative images.
 */
const SvgImage: FC<SvgImageProps> = memo(
    ({
        image: ImageComponent,
        alt,
        'aria-label': ariaLabel,
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
            <ImageComponent
                ref={ref}
                aria-hidden={accessibleLabel === undefined}
                aria-label={accessibleLabel}
                role={accessibleLabel === undefined ? undefined : 'img'}
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
    },
)

SvgImage.displayName = 'SvgImage'

export default SvgImage
