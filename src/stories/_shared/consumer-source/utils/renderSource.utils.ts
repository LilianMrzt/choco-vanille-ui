/**
 * Substitutes named placeholders in a plain-text consumer source template.
 * Values are already serialized code, not data to evaluate or escape.
 * @param template - Raw source containing placeholders such as {{size}}.
 * @param values - Code fragments keyed by placeholder name.
 * @returns Consumer source with each placeholder replaced in a single pass.
 * @throws When a placeholder has no supplied value.
 * @example
 * renderSource('<Box width={{{width}}} />', { width: '"100%"' })
 */
export const renderSource = (template: string, values: Readonly<Record<string, string>>): string =>
    template.trim().replace(/\{\{(\w+)}}/g, (_match: string, name: string) => {
        if (!Object.hasOwn(values, name)) {
            throw new Error(`Missing consumer source value: ${name}`)
        }

        return values[name]
    })
