import type { TypographyProps } from '@components/foundation/typography'

/** Props for the Legend component. Typography controls the presentation except for `as` and `fontSize`. */
export type LegendProps = Readonly<Omit<TypographyProps, 'as' | 'fontSize'>>;
