# Code quality conventions

- Keep function nesting at four levels or fewer, including render callbacks, array callbacks and event handlers. Extract a cohesive rendering helper or component when another callback would exceed the limit.
- Do not nest template literals inside template interpolations. Compute the interpolated fragment in a named local variable first.
- Prefer positive conditions in ternaries and explicit `if / else` branches. Invert negated conditions and swap their branches without changing behavior. Keep useful negative guard clauses and conditional rendering without an alternative branch; do not introduce empty branches to avoid a negation.
- Preserve exact `null`, `undefined`, `false`, `zero` and empty string semantics when rewriting conditions. Do not replace an explicit absence check with a truthiness check.
- Use native semantic elements when they match the content. Use `<output>` for a calculation or user-action result, not merely to obtain its implicit status role. For loading announcements, use an appropriate status region and preserve accessible names and announcements.
- Name catch parameters `error_` and narrow their type before accessing error properties. Preserve existing error reporting and retry behavior.
- Apply these rules to executable code and consumer-facing Storybook snippets. Keep snippets aligned with the implementation.
- Fix quality findings without suppressing rules, weakening tool configuration or changing public APIs. Verify affected behavior with focused existing checks.
