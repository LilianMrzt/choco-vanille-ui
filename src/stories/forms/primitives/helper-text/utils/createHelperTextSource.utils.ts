import { HelperText } from '@components/forms/primitives/helper-text'
import source from '@stories/forms/primitives/helper-text/sources/HelperText.source.txt?raw'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import type { ComponentProps } from 'react'

/**
 * Generates source matching the current HelperText controls.
 * @internal Not part of the public package API.
 */
export const createHelperTextSource = createPrimitiveSource<ComponentProps<typeof HelperText>>(source, { hasChildren: true })
