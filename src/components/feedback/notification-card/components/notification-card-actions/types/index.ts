import type * as React from 'react'

/** Props for the NotificationCard.Actions sub-component. */
export type NotificationCardActionsProps = Readonly<Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> &
  React.RefAttributes<HTMLDivElement> & {
    /** Action elements, typically buttons or links. */
    children: React.ReactNode;
  }>
