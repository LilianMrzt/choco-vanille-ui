import { Form } from '@/components/forms/primitives/form'
import type { ComponentProps } from 'react'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/forms/primitives/form/sources/FormInteractive.source.txt?raw'

/**
 * Generates source matching the current Form controls.
 * @internal Not part of the public package API.
 */
export const createFormSource = createPrimitiveSource<ComponentProps<typeof Form>>(interactiveSource, { omit: ['onSubmit'] })
