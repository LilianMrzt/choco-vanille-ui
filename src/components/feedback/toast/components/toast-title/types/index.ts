import type * as React from 'react'

/** Props for the Toast.Title sub-component. */
export type ToastTitleProps = Readonly<Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'color'
> &
  React.RefAttributes<HTMLSpanElement> & {
    /** Title content. */
    children: React.ReactNode;
  }>
