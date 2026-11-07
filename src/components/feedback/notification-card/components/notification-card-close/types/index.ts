import type * as React from 'react'

/** Props for the NotificationCard.Close sub-component. */
export type NotificationCardCloseProps = Readonly<Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label' | 'color'
> &
  React.RefAttributes<HTMLButtonElement> & {
    /** Accessible label for the close button. */
    'aria-label': string;
  }>
