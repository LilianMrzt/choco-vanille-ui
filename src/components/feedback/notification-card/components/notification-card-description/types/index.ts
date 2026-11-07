import type * as React from 'react'

/** Props for the NotificationCard.Description sub-component. */
export type NotificationCardDescriptionProps = Readonly<Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'color'
> &
  React.RefAttributes<HTMLSpanElement> & {
    /** Description content. */
    children: React.ReactNode;
  }>
