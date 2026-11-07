# Tests and Storybook conventions

## Tests

- Keep tests under `tests/`, mirroring source areas, with `*.test.ts` or
  `*.test.tsx` names. Do not colocate tests in distributed sources.
- Use Vitest as configured in root `vitest.config.ts`: the default environment
  is `jsdom`, and `tests/setup.ts` cleans up Testing Library renders and
  supplies browser API mocks. It does not currently reset timers.
  Vitest configures the Vanilla Extract plugin directly.
- Use Testing Library with `user-event` for DOM interactions and
  `renderToStaticMarkup` for SSR/markup contracts. Inspect the shared setup
  before selecting a `node` environment: it currently accesses `window`.
  Do not introduce `happy-dom` or rely on an undeclared transitive dependency.
- Use existing tools and declared dependencies. If a behavior change needs a
  missing test tool, explain the need and obtain approval before installing it
  unless installation was explicitly requested. Do not skip a necessary test.
- Import components and public types from their dedicated barrels. Verify the
  root public entry separately. Import internal class maps only for assertions
  that need them. Use configured aliases for other internal imports and local
  test helpers, following the
  [architecture rules](architecture.md#imports-et-api-publique).
- Name suites after the unit and describe behaviors in English. Keep tests
  deterministic and independent of public services; isolate globals, timers
  and subscriptions without arbitrary pauses.
- Cover changed defaults, variants, native attributes/events/refs, custom prop
  filtering, class/style precedence, accessibility and controlled/uncontrolled
  behavior as applicable. Add a regression test for a behavior fix.
- Verify composed consumer handlers, cancellation, compound-part relationships,
  focus movement/restoration and dismissal when wrapping Base UI. Its own
  guarantees do not prove our integration or custom behavior.
- Verify cleanup under StrictMode, SSR and hydration when effects, IDs or DOM
  access change. Check announced React compatibility when version-specific
  APIs are involved and report combinations not verified.
- Use `expectTypeOf` for relevant public prop/generic contracts. Do not cast
  invalid test data merely to make it compile.
- Prefer observable results, roles and accessible names over implementation
  details or broad snapshots. Static markup does not prove CSS extraction,
  visual contrast, accessibility or performance.
- For distribution changes, check public imports, declarations, resources,
  external dependencies and exclusion of private files. For bundling changes,
  verify a real selective consumer build excludes unused components and styles.
- Run affected tests together using the existing `test` script in one-shot
  mode (`--run`). There is no `test:run` script. Do not leave a watcher running
  or default to full coverage or the full suite for a localized change.
- Check types, lint and the relevant build for changed compiled code, styles
  or configuration without weakening rules or thresholds. `build:lib` builds
  the package; `build` and `build-storybook` build Storybook.
- For component changes, run the existing design-system audit check as well.
  Inspect reported rules against the v2 instructions: report a legacy
  contradiction explicitly and update the responsible audit rule only when
  that migration is in scope, never by disabling the audit.
- Documentation-only changes require content, link and `applyTo` review,
  not code tests or a build. Report relevant limits and unexecuted checks.

## Storybook

### Organization and documentation

- Component stories mirror the existing category layout:
  `src/components/<category>/<component>/` corresponds to
  `src/stories/<category>/<component>/<ComponentName>.stories.tsx`.
  Form primitives under `forms/primitives/` use the same subfolder in stories
  and the `Forms/Primitives/<Component>` Storybook titles.
  Theme provider and customization documentation live under the overview.
- Apply the [component organization rules](components.md#structure) to stories
  and their private resources: types in `types/index.ts`, constants in
  `constants/index.ts`, child components in `components/<child-name>/`, and
  hooks/utilities in `hooks/` and `utils/` with the same naming and recursive
  ownership rules. Keep consumer source text in the owner's `sources/`
  subfolder, not beside the `.stories.tsx` entry. Group cross-story resources
  by cohesive responsibility under `_shared/<feature>/`, rather than adding
  unrelated resources to the existing shared utility folder. Create only the
  folders needed by the change.
  Do not add `components/design-system` or `components/custom` branches.
- Keep `.stories.tsx` as a thin CSF entry: metadata, the local `Story` alias,
  named story exports and small render/source adapters. Extract each distinct
  JSX example and Docs page into its own `components/<example-name>/` unit,
  control configuration and demo data into `constants/index.ts`, and custom
  story args into `types/index.ts`. Keep source generation and play interactions
  in owned `utils/` files; utilities with source templates own a `sources/`
  subfolder. Static snippets do not need wrapper functions. Stories that only
  override args reuse the existing renderer instead of duplicating it.
  Preserve static CSF exports so discovery, story IDs and documentation links
  remain stable. Audit the imported resources rather than requiring them inline.
- Keep component API, Playground, variants, states and usage examples beside
  that component's stories. Public compound parts follow their owner; private
  implementation details do not get independent API stories.
- Keep the introduction under `src/stories/overview/` and contributor guidance
  under `src/stories/guidelines/`. Theme, token, and CSS variable references
  live under `src/stories/docs/`, with `Docs` ordered immediately after
  `Guidelines` and before component categories. `Docs/Theme` covers color tokens
  only; keep a single CSS token override guide, including Vanilla Extract
  recommendations, under `Overview/Customization`.
  Reference stories opt out of autodocs and prefer TSX stories over new MDX pages.
  The Icon API belongs in component stories, not an icon catalog.
- Storybook discovers MDX and stories under `src/stories/` directly. Keep helpers
  local to their owner and new cross-story components and utilities under
  `src/stories/_shared/`. Reuse the existing Markdown and static source helpers
  under `src/stories/_shared/utils/`. Do not export story-only code from the package.
- Use `import type` for `Meta` / `StoryObj` from `@storybook/react-vite`,
  a meta object with `satisfies Meta<typeof Component>`, a default meta export,
  and `type Story = StoryObj<typeof meta>`. Preserve generic and composition
  contracts without assertions that hide incompatibilities.
- For component stories, use stable `<Category>/<Component>` titles with
  readable category names and `autodocs`. Docs and accessibility addons are
  already configured; do not add infrastructure to each story.
- Keep story names, descriptions and documentation in English.
  Introductions use two or three concise sentences; exhaustive props and edge
  cases belong in controls and focused examples, not a manual-length introduction.
- Use public component imports in consumer examples. Do not add public exports
  solely for demonstrations or expose Base UI implementation details as our API.
- Keep existing introduction catalog links synchronized when a documented
  component or its stable Storybook title changes. Do not invent the source
  project's absent `storybook/Introduction.mdx` path.

### Controls and examples

- Provide a simple interactive main story and focused examples for relevant
  public variants, states, long content, compositions and control modes.
  Avoid exhaustive Cartesian products and application demonstration pages.
- Cover each component-specific prop and relevant native attribute with a
  functional control or an explicit exclusion and reason. Do not enumerate
  every inherited HTML, ARIA or `data-*` attribute or trust inference alone.
- Define initial `args` and appropriate `argTypes`: description, finite options,
  control type and actual default where applicable. Distinguish demonstration
  values from component defaults; group controls when it improves clarity.
- Use finite selections for token/variant unions, a color control only for
  free CSS colors, and serializable mappings for React compositions where useful.
  Never widen the public API or offer an unusable control to simplify a story.
- Forward `args` without silently replacing them with hardcoded values.
  Separate story-only composition arguments before forwarding real props;
  type them locally with `Meta<StoryArgs>` and identify them as demonstration
  controls, not package props. Never leak them to the DOM.
- Use `fn()` from `storybook/test` for observable callbacks and
  `control: false` for non-editable component props, including refs.
  Keep those props documented. Reserve `table.disable` for entries outside
  the documentation scope, not specific props lacking an editor.
- Controlled examples use `useArgs` from `storybook/preview-api` at the top
  level of a PascalCase render function or decorator. Read the current args,
  call the consumer callback and update args with the new value.
  Do not duplicate controlled state locally or lose the callback spy.
- Show uncontrolled usage separately where supported. Initial-only props
  require a remount to apply changes; document this instead of simulating
  a controlled contract.
- Use public Storybook entry points, never `storybook/internal/*`.
  Keep examples deterministic, clean up resources and preserve accessible
  names, keyboard behavior and focus. Adapt framing to the actual component.
- Customize consumer code through `parameters.docs.source` when generated
  Storybook source exposes story-only details. Reuse the existing
  `storySource` helper from `@stories/_shared/utils/storySource` for static snippets;
  do not refer to an absent `@stories/_shared/utils/consumer-source` helper.
  Dynamic snippets must reflect current args and use explicit expressions
  for nonliteral values. Consumer snippets use package imports, not private aliases.
- Store consumer snippets in their owner's `sources/` subfolder as
  `*.source.txt` files and import them with Vite's `?raw`.
  They are source text, not modules
  sharing the story's imports or scope. Pass static text to `storySource`;
  for dynamic text, use `renderSource` from
  `@stories/_shared/consumer-source/utils/renderSource.utils`
  with named `{{placeholder}}` fragments serialized by the story. JSX expression
  braces surround the placeholder (`width={{{width}}}`). Substitution is
  single-pass and missing values throw. Check the generated source, not the
  unexpanded template. Distribution consumer fixtures likewise live in plain
  text files, copied to a temporary `.tsx` file and compiled against the built
  package so moving the text does not remove its type checks.
- Snippets must match every visible consumer instance, with the same props,
  values and labels. For comparative stories rendered with `.map()`, show the
  corresponding static consumer JSX, not the render scaffolding.
  Do not align props using artificial spaces.
- Represent story-only custom-content placeholders in consumer snippets with
  the JSX comment `{/* Custom content */}`, not their private component or markup.
- Where a custom Docs page is needed, show description, one primary Playground,
  all Controls in a single table without control tabs, accessibility guidance,
  a short subcomponent table when applicable and focused examples in that order.
  When convenience and compound APIs coexist, show both in one consumer code
  block immediately after the description. Render
  `<Stories includePrimary={false} />` when a primary Canvas is already present.
  Keep accessibility guidance in one place rather than duplicate tables.
- Compound Playgrounds expose meaningful controls for public slots. Categorize
  story-only slot controls as `Compound: <SlotName>` and wire them to that slot;
  do not create a separate composition gallery solely to satisfy an old template.
- When both finite variants and semantic colors exist, compare every variant
  for every color in one labelled `Appearance` story. Group by color and keep
  the treatments together so their differences are immediately visible.
  Put sizes in a separate `Sizes` story (`FontSizes` for typography); never
  multiply the variant/color comparison by sizes. Expand every displayed
  instance in its consumer source.
  Keep `States` and interaction scenarios separate when they teach distinct
  behavior. Keep comparable components coherent without
  forcing irrelevant sections or an exhaustive matrix on every component.
- Keep story and example frames bounded on desktop and responsive on mobile.
  Give field comparisons a readable local width: selects and text inputs may
  fill their example container, not the viewport. Do not shrink their labels
  to minimum content size.
- Verify that controls, callbacks, argument resets and both directions of
  controlled updates work. Check touched story types, the Storybook build and
  relevant visual/interactive behavior; report review that could not be performed.
- A story or `play` interaction is a manual/example surface, not a replacement
  for the component's regression tests or a proof of visual accessibility.
