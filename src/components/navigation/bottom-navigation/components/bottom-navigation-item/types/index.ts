import type * as React from 'react'

import type { IconifyIcon } from '@components/foundation/icon'

type BottomNavigationItemLabelProps =
    | {
          /** Visible label. Omit it when using an accessible name instead. */
          label: string
          'aria-label'?: string
          'aria-labelledby'?: string
      }
    | {
          /** Icon-only items must provide an accessible name. */
          label?: never
          'aria-label': string
          'aria-labelledby'?: never
      }
    | {
          /** Icon-only items may use an existing labelled element. */
          label?: never
          'aria-label'?: never
          'aria-labelledby': string
      }

type BottomNavigationItemSharedProps = {
    /** Stable value used for selection and controlled state. */
    value: string
    /** Icon displayed above the optional label. */
    icon: IconifyIcon
    /** Overrides the default item height. */
    height?: React.CSSProperties['height']
    /** Prevents selection and interaction. */
    disabled?: boolean
} & BottomNavigationItemLabelProps

type BottomNavigationButtonItemProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | 'children'
  | 'disabled'
  | 'type'
  | 'value'
  | 'aria-current'
  | 'aria-disabled'
  | 'aria-label'
  | 'aria-labelledby'
> &
  React.RefAttributes<HTMLButtonElement> &
  BottomNavigationItemSharedProps & {
    href?: never
  }

type BottomNavigationLinkItemProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  | 'children'
  | 'href'
  | 'aria-current'
  | 'aria-disabled'
  | 'aria-label'
  | 'aria-labelledby'
> &
  React.RefAttributes<HTMLAnchorElement> &
  BottomNavigationItemSharedProps & {
    href: string
  }

export type BottomNavigationItemProps =
  | BottomNavigationButtonItemProps
  | BottomNavigationLinkItemProps
