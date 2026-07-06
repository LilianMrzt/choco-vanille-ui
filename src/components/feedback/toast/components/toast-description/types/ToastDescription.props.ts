import type * as React from 'react'

/** Props for the Toast.Description sub-component. */
export type ToastDescriptionProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'color'
> &
  React.RefAttributes<HTMLSpanElement> & {
    /** Description content. */
    children: React.ReactNode;
  };
