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
  };
