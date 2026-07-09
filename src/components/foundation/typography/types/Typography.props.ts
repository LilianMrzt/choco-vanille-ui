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
    /** Letter-spacing token applied to the text. */
    letterSpacing?: TypographyLetterSpacing;
    /** Associates the element with a form control — forwarded as the native `for` attribute (use with `as="label"`). */
    htmlFor?: string;
    /** Additional data attributes forwarded to the rendered element. */
    [key: `data-${string}`]: string | undefined;
  };
