import { FormLabel } from '@components/forms/primitives/form-label'
import source from '@stories/forms/primitives/form-label/sources/FormLabel.source.txt?raw'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import type { ComponentProps } from 'react'

/**
 * Generates source matching the current FormLabel controls.
 * @internal Not part of the public package API.
 */
export const createFormLabelSource = createPrimitiveSource<ComponentProps<typeof FormLabel>>(source, { hasChildren: true })
