import type * as React from 'react'

/** Props for the Form component. Inherits all native `<form>` attributes and a forwarded ref. */
export type FormProps = Readonly<React.FormHTMLAttributes<HTMLFormElement> &
      React.RefAttributes<HTMLFormElement>>;
