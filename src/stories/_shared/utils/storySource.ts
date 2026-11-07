/**
 * Pins a raw consumer example and replaces inherited dynamic transforms.
 * @param code - Consumer text imported from an owned source file.
 * @returns Parameters to spread inside `parameters.docs`.
 * @example storySource(appearanceSource)
 */
export const storySource = (code: string) => ({
    source: {
        code: code.trim(),
        language: 'tsx' as const,
        type: 'code' as const,
        transform: (source: string): string => source,
    },
})
