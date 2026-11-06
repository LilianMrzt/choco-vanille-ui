import type * as React from 'react'

import type { IconComponent } from '@components/foundation/icon'
import type { ButtonColorShared, ButtonLayoutProps, ButtonSizeShared, ButtonVariantShared } from '@components/actions/_shared/buttons/types'

/** Visual treatments for Button. */
export type ButtonVariant = ButtonVariantShared
/** Semantic color intents for Button. */
export type ButtonColor = ButtonColorShared
/** Size presets for Button. */
export type ButtonSize = ButtonSizeShared

/** Props for a native button or an anchor styled as a button. */
export type ButtonProps = Readonly<(
  | (Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color'> &
      React.RefAttributes<HTMLButtonElement> & {
        /** Buttons without an href render as native `<button>` elements. */
        href?: never;
      })
  | (Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      'children' | 'color' | 'href'
    > &
      React.RefAttributes<HTMLAnchorElement> & {
        /** Buttons with an href render as native `<a>` elements. */
        href: string;
      })
) & {
  /** Visual style variant of the button. */
  variant?: ButtonVariant;
  /** Theme color of the button. */
  color?: ButtonColor;
  /** Button size. Defaults to `md`. */
  size?: ButtonSize;
  /** The text content rendered inside the button via the Typography component. */
  label: string;
  /** SVG component rendered before the label. */
  startIcon?: IconComponent;
  /** SVG component rendered after the label. */
  endIcon?: IconComponent;
  /** Whether the button is in an active/pressed state, e.g. when it triggers an open menu. */
  active?: boolean;
} & ButtonLayoutProps>
