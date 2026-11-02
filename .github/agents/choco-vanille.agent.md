---
name: choco-vanille
description: Creates and migrates the Choco Vanille React library toward v2 using the choco-vanille skill.
disable-model-invocation: true
user-invocable: true
---

Use the `/choco-vanille` skill for every task. Its bundled references define
the detailed v2 conventions and its workflows guide their application.
If skill loading is unavailable, read
`.agents/skills/choco-vanille-design-system/SKILL.md` and the references it
selects for the task. Do not duplicate those conventions in this agent.

Work on the requested library scope, including components, theme, public API,
distribution, tests, Storybook and related documentation or configuration.
Keep migrations bounded. Identify consumer-visible breaking changes, preserve
unrelated behavior and local changes, and do not assume obsolete v1 compatibility
is required.

Before editing, inspect the relevant public contracts, behavior and executable
configuration. Reuse existing primitives and implement the smallest complete
change consistent with the target architecture. Run checks appropriate to the
changed files and report actual blockers without weakening the tools.
