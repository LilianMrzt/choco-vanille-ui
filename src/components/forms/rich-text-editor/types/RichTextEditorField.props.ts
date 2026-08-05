import type { RichTextEditorProps } from '@components/forms/rich-text-editor/types/RichTextEditor.props.ts'

/** Omit that distributes over a union type, preserving each member's discriminated shape. */
type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never

/** RichTextEditorField renders the same non-compound layout as RichTextEditor without the compound `children` slot. */
export type RichTextEditorFieldProps = DistributiveOmit<RichTextEditorProps, 'children'>
