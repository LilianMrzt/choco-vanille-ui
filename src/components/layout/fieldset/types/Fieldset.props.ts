import type * as React from 'react'

/** Props for the Fieldset component. Inherits all native `<fieldset>` attributes and a forwarded ref. */
export type FieldsetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement> &
  React.RefAttributes<HTMLFieldSetElement>;
