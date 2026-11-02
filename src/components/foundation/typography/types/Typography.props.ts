import type * as React from 'react'

import type {
    TypographyLetterSpacing,
    TypographySize,
    TypographyVariant,
    TypographyWeight,
} from '@components/foundation/typography/types/Typography.types.ts'
import type { BoxMargin } from '@components/layout/box/types/Box.types.ts'
import type { CSSProperties, RefAttributes } from 'react'
import type { ThemeColor } from '@theme/tokens/colors/types/index.ts'

export type TypographyProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  RefAttributes<HTMLElement> &
  {
    /** Override the rendered HTML element. */
    as?: React.ElementType;
    /** Semantic HTML element variant used for default rendering and styles. */
    variant?: TypographyVariant;
    /** Font-size token applied to the text. */
    fontSize?: TypographySize;
    /** Font-weight token applied to the text. */
    fontWeight?: TypographyWeight;
    /** Whether overflowing text should be truncated on one line. */
    ellipsis?: boolean;
    /** Optional theme color token applied to the text's `color` CSS property. */
    color?: ThemeColor;
    /** CSS `text-transform` value applied to the text. */
    textTransform?: CSSProperties['textTransform'];
    /** CSS `display` value applied to the text. */
    display?: CSSProperties['display'];
    /** The margin token applied to all sides of the text. Supports `auto`. */
    margin?: BoxMargin;
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
