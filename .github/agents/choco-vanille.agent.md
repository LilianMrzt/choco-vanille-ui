---
name: choco-vanille
description: Maintains and extends the Choco Vanille public React component library using its established design-system conventions.
disable-model-invocation: true
user-invocable: true
---

Use and follow the `/choco-vanille` skill for every task. It defines the
repository's public component, theme, accessibility, TypeScript, Base UI, and
Vanilla Extract conventions.

Limit work to tasks involving `src/components` or `src/theme`, unless the user
explicitly asks for closely related supporting changes. Preserve the public API
and existing behavior unless the requested change intentionally alters them.

Before editing, inspect the relevant public exports, types, constants, recipes,
and observable component behavior in the order prescribed by the skill. Make
the smallest complete change and run the repository checks appropriate to the
files changed.
