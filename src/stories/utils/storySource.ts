/**
 * Returns Storybook `docs.source` parameters so the "Show code" panel
 * displays intended consumer usage rather than the auto-generated render code.
 *
 * Spread the return value inside `parameters.docs`:
 *
 * ```ts
 * parameters: {
 *   docs: {
 *     description: { story: 'Description text.' },
 *     ...storySource(`<Button label="Save" />`),
 *   },
 * }
 * ```
 *
 * Setting `type: 'code'` pins Storybook to the provided literal string,
 * bypassing dynamic render-function serialisation so consumers always see
 * clean, copy-paste-ready usage rather than internal story scaffolding.
 *
 * **Template for other component stories**
 *
 * ```ts
 * import { storySource } from '@stories/utils/storySource'
 *
 * export const Variants: Story = {
 *   parameters: {
 *     docs: {
 *       description: { story: 'The three visual variants.' },
 *       ...storySource(`
 * <Component variant="contained" />
 * <Component variant="outlined" />
 * <Component variant="ghost" />`),
 *     },
 *   },
 *   render: () => <...>,
 * }
 * ```
 */
export const storySource = (code: string) => ({
    source: {
        code: code.trim(),
        language: 'tsx' as const,
        type: 'code' as const,
    },
})
