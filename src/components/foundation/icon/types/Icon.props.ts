import type { IconProps as IconifyProps } from '@iconify/react'

import type { IconRecipeVariants } from '@components/foundation/icon/Icon.css.ts'

export type IconProps = Omit<IconifyProps, 'aria-hidden' | 'role'> &
  IconRecipeVariants
