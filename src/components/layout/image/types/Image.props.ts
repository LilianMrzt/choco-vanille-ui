import type { CSSProperties, ImgHTMLAttributes, RefAttributes } from 'react'

import type { ImageRecipeVariants } from '@components/layout/image/styles/Image.css.ts'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> &
  RefAttributes<HTMLImageElement> &
  ImageRecipeVariants & {
    width?: CSSProperties['width']
    minWidth?: CSSProperties['minWidth']
    maxWidth?: CSSProperties['maxWidth']
    height?: CSSProperties['height']
    minHeight?: CSSProperties['minHeight']
    maxHeight?: CSSProperties['maxHeight']
    aspectRatio?: CSSProperties['aspectRatio']
  }
