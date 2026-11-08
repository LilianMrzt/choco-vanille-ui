import type {
    TypographyProps,
    TypographyVariant,
} from '@components/foundation/typography'

/** @internal Editable native text example; not part of the public package API. */
export type TypographyStoryArgs = Readonly<
    Omit<TypographyProps, 'as' | 'ref'> & {
        as?: TypographyVariant
        htmlFor?: string
    }
>
