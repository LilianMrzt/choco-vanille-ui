import type * as React from 'react'

/** Props for the Toast.Actions sub-component. */
export type ToastActionsProps = Readonly<Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> &
  React.RefAttributes<HTMLDivElement> & {
    /** Action elements, typically buttons or links. */
    children: React.ReactNode;
  }>
