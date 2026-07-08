import type { TypographyProps } from '@components/foundation/typography'

/** Props for the Legend component. Inherits all Typography props except `as`. */
export type LegendProps = Omit<TypographyProps, 'as'>;
