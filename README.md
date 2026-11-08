# @choco-vanille/ui

> **⚠️ Personal project notice:** This library is primarily built for personal use. It is published publicly as a convenience, but comes with no guarantees of stability, long-term maintenance, or backward compatibility. Use it at your own risk.

A React 19 UI kit built with **Vite** (library mode), **Vanilla Extract**
(zero-runtime, typed CSS-in-TS) and **Base UI** primitives. Components are
previewed with **Storybook**.

## Features

- ⚛️ React 19 + TypeScript, ships ESM + CJS + type declarations
- 🎨 Vanilla Extract design system — a fully typed token theme
  (colors, spacing, radius, font sizes/weights, shadows, z-index)
- 🧩 Base UI components styled with Vanilla Extract `recipe()` (the typed
  replacement for `cva`), composed with `clsx`
- 📚 Storybook for interactive component docs
- ✅ ESLint flat config (typescript-eslint, react-hooks, jsx-a11y, storybook) + Prettier

## Installation

```bash
# npm
npm install @choco-vanille/ui @iconify/react@^5.2.1 react react-dom

# yarn
yarn add @choco-vanille/ui @iconify/react@^5.2.1 react react-dom

# pnpm
pnpm add @choco-vanille/ui @iconify/react@^5.2.1 react react-dom
```

The package entry automatically loads its stylesheet. Then use components:

```tsx
import { Typography } from '@choco-vanille/ui';

export function Example() {
  return (
    <>
      <Typography variant="h1">Hello world</Typography>
      <Typography variant="p">A typographic primitive.</Typography>
      <Typography variant="code">@choco-vanille/ui</Typography>
    </>
  );
}
```

For integrations that require explicit CSS loading, the stylesheet remains
available at `@choco-vanille/ui/styles.css`.

## Components

### Icons

All icon props accept trusted local `IconifyIcon` SVG data and render through
`@iconify/react/offline`, without network requests or global registration.
Install a data package for your chosen collection:

```bash
pnpm add @iconify-icons/lucide
```

```tsx
// src/icons/index.ts
import type { IconifyIcon } from '@iconify/react/offline';
import searchIcon from '@iconify-icons/lucide/search';

export const IconRegistry = {
  searchIcon,
} as const satisfies Readonly<Record<string, IconifyIcon>>;
```

Consumer projects should define one `IconRegistry` that exports all icons used
by the project. Import individual Iconify data modules only in that registry,
and use its entries in components. Keys use camelCase with the `Icon` suffix,
such as `searchIcon` or `warningIcon`; do not import entire collections.

```tsx
import { Button, Icon, IconButton } from '@choco-vanille/ui';
import { IconRegistry } from './icons';

const Example = () => (
  <>
    <Icon icon={IconRegistry.searchIcon} size="md" aria-label="Search" />
    <Button label="Search" startIcon={IconRegistry.searchIcon} />
    <IconButton icon={IconRegistry.searchIcon} aria-label="Search" />
  </>
);
```

Icons are decorative by default. Provide `aria-label` or `aria-labelledby` for
informative icons; icon-only controls own their accessible name. Sizes (`xs`
through `2xl`, default `md`), `spin`, wrapper styling and CSS colors are unchanged.
Refs point to the SVG. Monochrome icons inherit `currentColor`; multicolor icons
can keep their fixed colors. The library's registry is internal; each consumer
owns its registry. This convention requires no runtime provider or Iconify
global registration. No SVG-to-React build plugin is required for icons.
Only use trusted data, because SVG bodies are inserted as markup.
Internal SVG identifiers are instance-scoped for SSR and hydration. Supplied
SVG IDs must be nonempty and unique after replacing hyphens with underscores.

**Breaking change:** replace SVG React components and the former `IconComponent`
type with `IconifyIcon` data, including leading/trailing and custom variant
icons. String icon names are not accepted. `SvgImage` retains its separate SVG
React component contract.

### Box and Typography

`Box` defaults to a `div`; `Typography` defaults to a `span`. Both infer native
attributes, events and refs from `as`, including custom React components.
For Typography, `variant` also chooses the element when `as` is absent; `as`
takes precedence, while `variant` keeps its visual preset.

```tsx
import { Box, Typography, vars, type BoxProps } from '@choco-vanille/ui';

const linkProps = {
  as: 'a',
  href: '/account',
  padding: 16,
} satisfies BoxProps<'a'>;

export function AccountSummary() {
  return (
    <Box display="grid" gridTemplateColumns="1fr auto" gap={16} padding={24}>
      <Typography variant="h2" fontSize={20} lineHeight={1.4}>
        Account
      </Typography>
      <Box {...linkProps}>Open account</Box>
      <Typography
        variant="p"
        maxLines={8}
        overflowWrap="anywhere"
        color={vars.color.text.secondary}
      >
        Account details and preferences.
      </Typography>
    </Box>
  );
}
```

Box supports positioning (`inset`, directional offsets, `zIndex`), flex and grid
placement, individual borders, `background`, `boxSizing`, `aspectRatio` and
`opacity`. Typography inherits Box's layout props and adds theme font families
(`sans`, `serif`, `mono`), `fontStyle`, `lineHeight`, `letterSpacing`,
`verticalAlign`, wrapping and decoration. Token-based spacing, font sizes,
radii and shadows use the published finite scales; other CSS props accept CSS
values. `style` takes precedence over styling props and accepts custom properties.

Constrain the width for `ellipsis`. `maxLines` accepts any positive integer and
takes precedence over `ellipsis`; explicit `style` can override truncation.
Provide another way to read essential clipped content.

**Breaking contract changes:** refs and native attributes must match the
rendered element; an explicit non-default generic requires `as` or a matching
Typography `variant` at the call site. Use `satisfies` when composing props to
retain those literal selectors, or provide the selector explicitly after the
spread. Invalid tokens, non-finite CSS numbers and invalid line limits throw
`TypeError`. The public Typography recipe uses `clamp: true` for multiline
structure instead of numbered `maxLines` variants; line counts are dynamic.
Margin styling is now owned by Box rather than duplicated in the Typography
recipe. Component names remain `Box` and `Typography`.

| Category | Components |
|---|---|
| **Foundation** | `Icon`, `Typography` |
| **Layout** | `Box`, `Flex`, `Grid`, `Inset`, `Image`, `Separator`, `Form`, `Fieldset` |
| **Actions** | `Button`, `IconButton`, `Toggle`, `ToggleGroup` |
| **Forms** | `Autocomplete`, `Calendar`, `Checkbox`, `CheckboxGroup`, `DatePicker`, `Legend`, `RadioGroup`, `RichTextEditor`, `Select`, `Slider`, `Switch`, `TextArea`, `TextField`, `NumberField` |
| **Data Display** | `Avatar`, `AvatarGroup`, `Badge`, `RichTextRenderer`, `Table` |
| **Surfaces** | `Accordion`, `Card`, `Collapsible` |
| **Navigation** | `Tabs`, `Link`, `Pagination`, `Breadcrumbs`, `Stepper`, `StepIndicator` |
| **Overlay** | `Tooltip`, `DropdownMenu`, `ContextMenu`, `Popover`, `HoverCard`, `Dialog`, `AlertDialog`, `Drawer`, `Panel`, `Command` |
| **Feedback** | `Skeleton`, `Callout`, `NotificationCard`, `ToasterProvider`, `Toaster`, `Progress`, `EmptyState`, `Spinner` |
| **Theme** | `ThemeProvider`, `useTheme` |

## Notifications

`NotificationCard` is the standalone visual compound: `Header` contains `Icon`,
`Title` and `Close`, `Body` contains `Description` or custom content, and `Footer`
contains `Actions`. Sections are optional; compose `NotificationCard.Icon`
explicitly when using compound content. `Header` supplies the root's `onClose`
button unless a `Close` slot is present. Convenience props still include the
variant icon. `ToasterProvider` mounts both channels using the same card
for transient toasts and persistent notifications. Wrap the application once
inside the desired theme scope, outside transformed or clipping containers:

```tsx
import { Button, ThemeProvider, ToasterProvider, useNotification, useToast } from '@choco-vanille/ui';

const Actions = () => {
  const { showSuccess } = useToast();
  const { show } = useNotification();

  return (
    <>
      <Button label="Save" onClick={() => showSuccess({ title: 'Changes saved' })} />
      <Button label="Notify" onClick={() => show({ title: 'Update available' })} />
    </>
  );
};

const Example = () => (
  <ThemeProvider>
    <ToasterProvider>
      <Actions />
    </ToasterProvider>
  </ThemeProvider>
);
```

`ToasterProviderProps` accepts `children` and the viewport configuration:
`toastPosition`, `notificationPosition`, `toastLabel`, `notificationLabel`,
`className`, and `style`. It adds no DOM wrapper and keeps the viewports in the
local theme scope. `Toaster` remains available for manual mounting instead;
do not mount both for the same application. The hooks do not require a React
context, but messages need a mounted provider or manual Toaster to be displayed.

Toasts appear at bottom-right, default to 5000ms and support swipe dismissal
without a close button. Notifications appear at top-right, default to persistent
(`duration: 0`) and have a close button. Each channel shows up to three stacked
messages, with additional messages kept in Sonner's queue. Actions align to
flex-end. Both hooks accept `actions`; only notifications accept `closeLabel`.
Notification `children` accept
custom `NotificationCard` sections; include `Header` to retain the default close
button, or supply its own `Close` slot. Previously flat compound content should
be grouped into `Header`, `Body`, and `Footer`.

**Breaking API change:** replace `Toast` and `Toast.*` with `NotificationCard`
and `NotificationCard.*`, including their corresponding prop types and style
maps. Replace `<ToastProvider>{children}</ToastProvider>` with
`<ToasterProvider>{children}</ToasterProvider>`; the hook names are unchanged.

## Theming

The design system is the single source of truth for tokens. The palette,
semantic colors and other token categories live under `src/theme/tokens/`.
Complete light and dark themes are assembled under
`src/theme/themes/`, and their CSS variables are registered by
`src/theme/styles/contract/contract.css.ts`.

Built-in color ramps use sRGB hex values, with blue primary and violet secondary
colors. Semantic paths include `surface.main`, `surface.elevated`, `surface.muted`,
`text.primary`, `text.secondary`, `text.tertiary`, `neutral.main`, `danger.main`, `accent*`, and
`focusRing`. These replace the previous color token and CSS variable names;
update consumer theme objects and overrides accordingly. Component color intents
use `neutral` and `danger`; feedback variants also use `danger`. The `purple`
and other accent intents use their corresponding `accent*` tokens.
`ThemeColors`, `ThemeEditorColors`, and `Theme` accept customizable string
values; `ThemeColorOverrides` types the provider's partial semantic color
overrides. All are exported from `@choco-vanille/ui`.

The kit ships with complete **light and dark** themes. Dark mode follows the
OS by default (`prefers-color-scheme`) and can be forced per-subtree:

```html
<html data-theme="dark"> ...   <!-- force dark -->
<html data-theme="light"> ...  <!-- force light -->
<html> ...                     <!-- auto: follow the OS -->
```

Global theme identifiers use the `choco-vanille` namespace:
`.choco-vanille-theme-light`, `.choco-vanille-theme-dark`, the
`choco-vanille.theme` and `choco-vanille.reset` cascade layers, and
`--choco-vanille-theme-transition-duration`. This prefix change is breaking:
update custom selectors, layer ordering and transition overrides to these
names. No aliases for the previous prefix are emitted. The `data-theme`
attributes and token variables such as `--color-primary-main` are unchanged.

Tokens are available two ways:

**1. Typed `vars` (inside `*.css.ts`, fully autocompleted):**

```ts
import { style } from '@vanilla-extract/css';
import { vars } from '@choco-vanille/ui';

export const card = style({
  backgroundColor: vars.color.surface.main,
  color: vars.color.surface.foreground,
  padding: vars.space[16],
  borderRadius: vars.radius[8],
  boxShadow: vars.shadow.sm,
});
```

**2. Plain CSS variables** — every token is emitted on `:root` with a stable,
human-readable name derived from its path (`--color-primary-main`, `--space-12`,
`--radius-6`, …). Use them in any stylesheet, or override them to retheme:

```css
:root {
  --color-primary-main: oklch(0.55 0.2 250); /* override this token */
  --radius-8: 0.25rem;
}
```

Both stay in sync automatically — overriding a CSS variable also updates every
component that references it through `vars`.

Spacing, font-size and radius use numeric keys referencing pixels at a
16px root. Values remain in rem except spacing `0` and fixed `1px`.
Use `padding={16}`, `fontSize={14}` and `borderRadius={8}`; there are no named
aliases or implicit multipliers. Props accept only numbers in the supported
scale, not arbitrary values. `radius.full` remains available, and Typography
supports the complete font-size scale through `72`.

The theme no longer exposes `lineHeight` or `letterSpacing`: components retain
their CSS typography, and Typography's `letterSpacing` accepts a CSS value.
Both `shadow` and `dropShadow` expose `none`, `xs`, `sm`, `md`, `lg`, `xl`.
Font families, weights, durations, easing and stacking remain unchanged.
Independent component size axes such as Button's `size="md"` are unaffected.
These token names and CSS variables are breaking changes without legacy aliases.

Overrides accept any valid CSS color. Rebranding an intent also requires its
hover, pressed, foreground, and subtle tokens; these are not generated from the
fill. Check contrast in every affected state of both themes.

Box, Typography and Icon accept CSS colors directly, including external custom
properties. Pass references rather than token names:

```tsx
import { Box, Typography, vars } from '@choco-vanille/ui';

<Box backgroundColor={vars.color.surface.main} borderColor="var(--app-border)">
  <Typography color={vars.color.primary.main}>Brand text</Typography>
</Box>;
```

Provider overrides follow the nested shape, for example
`tokens={{ primary: { main: '#0f766e' } }}`. Only supplied leaves change.
This is a breaking change to color objects, token-based prop paths, overrides
and renamed CSS variables; no legacy aliases are emitted.

## License

[MIT](./LICENSE)
