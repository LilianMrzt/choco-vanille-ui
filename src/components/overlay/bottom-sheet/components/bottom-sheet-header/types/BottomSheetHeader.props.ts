import type { FlexProps } from '@components/layout/flex'

/** Props for `BottomSheet.Header`. */
export type BottomSheetHeaderProps = Omit<FlexProps, 'as' | 'title'> & {
    /** Title of the sheet, also used as its accessible name. */
    title: string
    /** Heading level for the title element. @default 'h2' */
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    /** Muted description rendered below the title and announced with the sheet. */
    description?: string
}
