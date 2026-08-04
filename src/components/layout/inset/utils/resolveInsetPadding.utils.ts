import type {
    InsetPadding,
    InsetSpace,
} from '@components/layout/inset/types/Inset.types.ts'

export const resolveInsetPadding = (
    padding: InsetPadding | undefined,
    space: InsetSpace,
) => padding === 'current' ? space : padding
