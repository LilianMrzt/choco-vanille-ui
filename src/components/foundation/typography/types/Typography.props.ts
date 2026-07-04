import type * as React from 'react'

import type { TypographyRecipeVariants } from '@components/foundation/typography/Typography.css.ts'
import type { RefAttributes } from 'react'
import type { ThemeColor } from '@theme'

export type TypographyProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  RefAttributes<HTMLElement> &
  TypographyRecipeVariants & {
    /** Override the rendered HTML element. */
    as?: React.ElementType;
    /** Optional theme color token applied to the text's `color` CSS property. */
    color?: ThemeColor;
    /** Associates the element with a form control — forwarded as the native `for` attribute (use with `as="label"`). */
    htmlFor?: string;
    /** Additional data attributes forwarded to the rendered element. */
    [key: `data-${string}`]: string | undefined;
  };
