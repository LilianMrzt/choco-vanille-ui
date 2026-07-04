/**
 * Tagged template helper for Storybook docs descriptions.
 *
 * Storybook accepts plain strings for `parameters.docs.description.component`
 * and `parameters.docs.description.story`, but those strings contain Markdown
 * (tables, code blocks, bullet lists). JetBrains/WebStorm sometimes injects
 * TypeScript support into template literals and then misinterprets the Markdown
 * syntax (e.g. `|` as bitwise OR, `- The` as a prefix expression).
 *
 * Using this helper – together with a `// language=markdown` comment on the
 * template literal – tells the IDE to treat the content as Markdown and removes
 * the false-positive errors.
 *
 * The implementation is a plain passthrough so standard template-literal
 * escaping (e.g. `\`` for a backtick) keeps working exactly as before.
 */
export const md = (
    strings: TemplateStringsArray,
    ...values: unknown[]
): string => strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')
