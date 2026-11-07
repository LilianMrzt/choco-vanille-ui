import type { ComponentProps } from 'react'
import type { Breadcrumbs } from '@components/navigation/breadcrumbs'

/** @internal Storybook-only args; not part of the public package API. */
export type BreadcrumbsStoryArgs = Readonly<ComponentProps<typeof Breadcrumbs> & { currentLabel: string }>
