import type * as React from 'react'

import type { TypographyRecipeVariants } from '@components/foundation/typography/styles/Typography.css.ts'
import type { TypographyLetterSpacing } from '@components/foundation/typography/types/Typography.types.ts'
import type { CSSProperties, RefAttributes } from 'react'
import type { ThemeColor } from '@theme'

export type TypographyProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  RefAttributes<HTMLElement> &
  TypographyRecipeVariants & {
    /** Override the rendered HTML element. */
    as?: React.ElementType;
    /** Optional theme color token applied to the text's `color` CSS property. */
    color?: ThemeColor;
    /** CSS `text-transform` value applied to the text. */
    textTransform?: CSSProperties['textTransform'];
    /** CSS `display` value applied to the text. */
    display?: CSSProperties['display'];
    /** CSS `width` value applied to the text. */
    width?: CSSProperties['width'];
    /** CSS `min-width` value applied to the text. */
    minWidth?: CSSProperties['minWidth'];
    /** CSS `max-width` value applied to the text. */
    maxWidth?: CSSProperties['maxWidth'];
    /** CSS `opacity` value applied to the text. */
    opacity?: CSSProperties['opacity'];
    /** CSS `flex` value applied to the text. */
    flex?: CSSProperties['flex'];
    /** CSS `flex-grow` value applied to the text. */
    flexGrow?: CSSProperties['flexGrow'];
    /** CSS `flex-shrink` value applied to the text. */
    flexShrink?: CSSProperties['flexShrink'];
    /** Letter-spacing token applied to the text. */
    letterSpacing?: TypographyLetterSpacing;
    /** Maximum number of lines before truncating with an ellipsis. Supports 1–6. */
    maxLines?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Associates the element with a form control — forwarded as the native `for` attribute (use with `as="label"`). */
    htmlFor?: string;
    /** Additional data attributes forwarded to the rendered element. */
    [key: `data-${string}`]: string | undefined;
  };
