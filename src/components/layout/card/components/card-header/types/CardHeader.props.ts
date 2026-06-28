import type * as React from 'react'

export type CardHeaderProps = React.HTMLAttributes<HTMLElement> & {
  /** The HTML element to render. @default 'div' */
  as?: 'div' | 'header'
  /** Title text rendered as a heading inside the header. */
  title?: string
  /** Heading level for the title element. @default 'h3' */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** Muted description text rendered below the title. */
  description?: string
  /** Content rendered in the trailing corner — e.g. an `<IconButton>` or `<Button>`. */
  actions?: React.ReactNode
}
