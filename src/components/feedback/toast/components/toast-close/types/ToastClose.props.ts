import type * as React from 'react'

/** Props for the Toast.Close sub-component. */
export type ToastCloseProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label'
> &
  React.RefAttributes<HTMLButtonElement> & {
    /** Accessible label for the close button. */
    'aria-label': string;
  };
