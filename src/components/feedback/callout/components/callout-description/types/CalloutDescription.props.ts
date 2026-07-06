import type * as React from 'react'

/** Props for the Callout.Description sub-component. */
export type CalloutDescriptionProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'color'
> &
  React.RefAttributes<HTMLSpanElement> & {
    /** Description content. */
    children: React.ReactNode;
  };
