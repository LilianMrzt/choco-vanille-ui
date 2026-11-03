/**
 * Formats a token path as valid JavaScript, including numeric-leading keys.
 * @internal Not part of the public package API.
 * @param path - Dot-separated token path without the vars prefix.
 * @returns A consumer-ready expression referencing the public vars export.
 * @example formatTokenReference('space.32') // vars.space[32]
 */
export const formatTokenReference = (path: string): string =>
    path.split('.').reduce((reference, segment) => {
        if (/^(0|[1-9]\d*)$/.test(segment) && Number.isSafeInteger(Number(segment))) {
            return `${reference}[${segment}]`
        }

        const accessor = /^[a-zA-Z_$][\w$]*$/.test(segment)
            ? `.${segment}`
            : `[${JSON.stringify(segment)}]`

        return reference + accessor
    }, 'vars')
