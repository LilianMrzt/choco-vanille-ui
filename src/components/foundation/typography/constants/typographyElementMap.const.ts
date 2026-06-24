import type { TypographyVariant } from '../types/Typography.types.ts';

export const TYPOGRAPHY_ELEMENT_MAP = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  label: 'label',
  small: 'small',
  strong: 'strong',
  em: 'em',
  blockquote: 'blockquote',
  pre: 'pre',
  code: 'code',
  kbd: 'kbd',
  samp: 'samp',
  abbr: 'abbr',
  cite: 'cite',
  mark: 'mark',
  del: 'del',
  ins: 'ins',
  sub: 'sub',
  sup: 'sup',
} as const satisfies Record<TypographyVariant, string>;

