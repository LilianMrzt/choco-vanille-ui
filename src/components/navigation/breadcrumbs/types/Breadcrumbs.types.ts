import type { BREADCRUMBS_SEPARATORS } from '@components/navigation/breadcrumbs/constants'

export type BreadcrumbsSeparator =
    (typeof BREADCRUMBS_SEPARATORS)[keyof typeof BREADCRUMBS_SEPARATORS]
