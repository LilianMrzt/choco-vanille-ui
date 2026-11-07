import type { ComponentProps } from 'react'
import { Legend } from '@components/forms/primitives/legend'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import playgroundSource from '@stories/forms/primitives/legend/sources/LegendPlayground.source.txt?raw'

/**
 * Generates source matching the current Legend controls.
 * @internal Not part of the public package API.
 */
export const createLegendSource = createPrimitiveSource<ComponentProps<typeof Legend>>(playgroundSource, { hasChildren: true })
