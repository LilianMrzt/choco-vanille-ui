import type * as React from 'react'

/** Props for the NotificationCard.Title sub-component. */
export type NotificationCardTitleProps = Readonly<Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'color'
> &
  React.RefAttributes<HTMLSpanElement> & {
    /** Title content. */
    children: React.ReactNode;
  }>
