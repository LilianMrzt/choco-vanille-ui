import type * as React from 'react'
import type { HTMLAttributes, RefAttributes } from 'react'

import type { BoxRecipeVariants } from '@components/layout/box/Box.css.ts'
import type { BoxVariant } from '@components/layout/box/types/Box.types.ts'

export type BoxProps = HTMLAttributes<HTMLElement> &
  RefAttributes<HTMLElement> &
  BoxRecipeVariants & {
    /** The HTML element to render. Defaults to `div`. */
    as?: BoxVariant | React.ElementType
  }
