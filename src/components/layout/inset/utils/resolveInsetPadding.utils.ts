import type {
    InsetPadding,
    InsetSpace,
} from '@components/layout/inset/types'

/**
 * Resolves the `current` inset padding against its spacing token.
 * @param padding - Explicit token, `current`, or no override.
 * @param space - Current inset spacing token.
 * @returns The resolved padding token or `undefined`.
 * @example
 * resolveInsetPadding('current', 16)
 */
export const resolveInsetPadding = (
    padding: InsetPadding | undefined,
    space: InsetSpace,
): InsetSpace | undefined => padding === 'current' ? space : padding
