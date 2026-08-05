import type { RefAttributes } from 'react'

import type { RichTextValue } from '@components/forms/rich-text-editor/types/RichTextEditor.types.ts'
import type { BoxProps } from '@components/layout/box'

export type RichTextRendererProps = Omit<BoxProps, 'children' | 'ref'> &
    RefAttributes<HTMLDivElement> & {
        /** Versioned document emitted by RichTextEditor. */
        value: RichTextValue
    }
