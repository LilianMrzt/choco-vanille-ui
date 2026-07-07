# Story guidelines

This document defines the canonical structure for every Storybook story in the UI kit. The goal is to keep documentation consistent, complete, and immediately useful for consumers: a single source of truth that explains what a component is, how to use it, and how to use it accessibly.

---

## Philosophy

Each public component has **one story file** and **one interactive story**.

- **No gallery stories.** Variants, sizes, colors, and states are explored through the Controls panel, not through additional static stories.
- **No redundant examples.** One well-crafted playground story is enough when every meaningful prop is editable.
- **Compound components are still one story.** If a component exposes sub-components (for example `Card.Header`, `DropdownMenu.Item`), the playground exposes controls for each sub-component, grouped by category.

The result is a Docs page that contains:

1. A clear explanation of the component and its purpose.
2. A copy-pasteable code example.
3. An accessibility reference table.
4. A single interactive **Playground** story with controls for every prop.

---

## File location and naming

```
src/stories/<group>/<component-name>/ComponentName.stories.tsx
```

- `<group>` matches the component category in `src/components/` (`actions`, `data-display`, `forms`, `foundation`, `layout`, `overlay`, `surfaces`).
- The story `title` follows `Group/ComponentName`.

```ts
const meta = {
    title: 'Actions/Button',
    component: Button,
    // ...
} satisfies Meta<typeof Button>
```

---

## Meta description (`parameters.docs.description.component`)

The meta description is the first thing a reader sees on the Docs page. It must answer three questions:

1. **What is this component?**
2. **What is it used for?**
3. **How is it composed?**

Keep it concise but complete. Mention the underlying primitive when applicable (Radix, native element, etc.), the main features, and any composition model.

### Required sub-sections

#### 1. Component definition

A short paragraph that describes the component in plain language.

> A versatile button component that triggers an action when clicked or activated with the keyboard. It supports three visual variants, six semantic color intents, and three sizes, and can display an optional start or end icon.

#### 2. Usage

A fenced TypeScript/React code block showing the most common usage patterns. Include at least one minimal example and, when relevant, one compound-composition example.

````markdown
**Usage**

```tsx
<Button label="Save" variant="contained" color="primary" />
<Button label="Delete" variant="outlined" color="destructive" startIcon="mdi:trash-can-outline" />
```
````

#### 3. Accessibility

A table that lists every accessibility-relevant prop, attribute, or composition rule. The table must have four columns:

| Column | Purpose |
|---|---|
| Prop / Attribute | The prop, HTML attribute, or sub-component being discussed. |
| Required | `Yes` or `No`. |
| Type | The expected type. |
| Notes | Why it matters and how to use it correctly. |

Follow the table with bullet points covering keyboard behavior, ARIA roles, and any known caveats.

```markdown
**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| `label` | Yes | `string` | Becomes the button's accessible name. |
| `disabled` | No | `boolean` | Keeps the button visible and announced by screen readers. |
| `aria-*` | No | — | All native `<button>` ARIA attributes are forwarded. |

- The underlying element is a native `<button>`, so it is keyboard operable with `Space` / `Enter`.
- Avoid using only an icon without a label; use `IconButton` with a mandatory `aria-label` instead.
```

For compound components, include one row per sub-component when the sub-component itself has accessibility requirements (for example `DropdownMenu.Trigger`, `DropdownMenu.Item`).

#### 4. Sub-components (compound components only)

If the component is composed of multiple sub-components, add a second table that lists each sub-component and its responsibility.

```markdown
**Sub-components**

| Sub-component | Description |
|---|---|
| `DropdownMenu` | Root context provider. |
| `DropdownMenu.Trigger` | The element that opens the menu. Use `asChild` to delegate to your own button. |
| `DropdownMenu.Content` | The floating panel containing menu items. |
```

---

## Controls story

Every story file exports exactly one interactive story named `Playground` (or `Default` for very simple components). This story exposes **every public prop** in the Controls panel.

### Simple components

For components with a flat prop surface, rely on Storybook's automatic controls and refine them with `argTypes` only when necessary.

```ts
const meta = {
    title: 'Actions/Button',
    component: Button,
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: ['contained', 'outlined', 'ghost'] },
        color: { control: 'select', options: ['primary', 'secondary', 'destructive', 'success', 'warning', 'info'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        disabled: { control: 'boolean' },
    },
    args: {
        label: 'Button',
    },
} satisfies Meta<typeof Button>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
}
```

### Compound components

For compound components, extend the args type so the playground can control each sub-component. Use `argTypes.table.category` to group controls by sub-component.

```ts
type CardPlaygroundArgs = ComponentProps<typeof Card> & {
    headerAs?: 'div' | 'header'
    title?: string
    titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    bodyAs?: 'div' | 'section'
    showFooter?: boolean
    footerActionLabel?: string
}

const meta: Meta<CardPlaygroundArgs> = {
    title: 'Surfaces/Card',
    component: Card,
    argTypes: {
        as: {
            control: 'select',
            options: ['div', 'section', 'article', 'aside'],
            table: { category: 'Card' },
        },
        title: {
            control: 'text',
            table: { category: 'Card.Header' },
        },
        titleAs: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            table: { category: 'Card.Header' },
        },
        bodyAs: {
            control: 'select',
            options: ['div', 'section'],
            table: { category: 'Card.Body' },
        },
        showFooter: {
            control: 'boolean',
            table: { category: 'Card.Footer' },
        },
    },
} satisfies Meta<CardPlaygroundArgs>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground — every prop for all sub-components is exposed in the Controls panel, grouped by component.',
            },
        },
    },
    render: ({
        as,
        title,
        titleAs,
        bodyAs,
        showFooter,
        footerActionLabel,
    }) => (
        <Card as={as} style={{ width: '22rem' }}>
            <Card.Header title={title} titleAs={titleAs} />
            <Card.Body as={bodyAs}>Your content goes here.</Card.Body>
            {showFooter && (
                <Card.Footer>
                    <Button label={footerActionLabel ?? 'Save changes'} />
                </Card.Footer>
            )}
        </Card>
    ),
}
```

### Controls rules

- Expose every prop that changes the rendered output.
- Hide internal props and ref-forwarding helpers.
- Use `control: 'select'` for finite string unions.
- Use `control: 'boolean'` for boolean props.
- Use `control: 'text'` for strings, including Iconify icon names.
- For React nodes that cannot be controlled meaningfully (for example `endAction`, `actions`), either omit the control or document it in the code example only.

---

## Interaction tests

Add a `play` function to the playground story when it verifies critical accessibility or behavior:

- The component renders with the expected ARIA role.
- The component is keyboard operable.
- State changes (open/close, checked/unchecked) work as expected.

Keep tests focused on the component itself, not on application logic.

```ts
export const Playground: Story = {
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button', { name: args.label as string })).toBeInTheDocument()
    },
}
```

---

## What to avoid

- **Do not create multiple visual stories** such as `AllVariants`, `AllColors`, `AllSizes`, or `WithError`. These are replaced by the Controls panel.
- **Do not duplicate the component description** in the story description. The story description should only explain what the playground demonstrates.
- **Do not leave accessibility undocumented.** Every story must include the accessibility table.
- **Do not expose non-public props** in controls.

---

## Complete example: simple component

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { Button } from '@/components/actions/button'
import type { ButtonColor, ButtonSize, ButtonVariant } from '@/components/actions/button'

const VARIANTS: ButtonVariant[] = ['contained', 'outlined', 'ghost']
const COLORS: ButtonColor[] = ['primary', 'secondary', 'destructive', 'success', 'warning', 'info']
const SIZES: ButtonSize[] = ['sm', 'md', 'lg']

const meta = {
    title: 'Actions/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A versatile button component that triggers an action when clicked or activated with the keyboard.
It supports three visual variants, six semantic color intents, and three sizes, and can display an optional start or end icon.

**Usage**
\`\`\`tsx
<Button label="Save" variant="contained" color="primary" />
<Button label="Delete" variant="outlined" color="destructive" startIcon="mdi:trash-can-outline" />
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`label\` | ✅ Yes | \`string\` | Becomes the button's accessible name — always provide a meaningful value. |
| \`disabled\` | No | \`boolean\` | Keeps the button visible and announced by screen readers. |
| \`aria-*\` | No | — | All native \`<button>\` ARIA attributes are forwarded to the underlying element. |

- The underlying element is a native \`<button>\`, ensuring keyboard operability (Space / Enter) and correct ARIA role out of the box.
- Avoid using only an icon without a label; use \`IconButton\` with a mandatory \`aria-label\` instead.
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        variant: { control: 'select', options: VARIANTS },
        color: { control: 'select', options: COLORS },
        size: { control: 'select', options: SIZES },
        disabled: { control: 'boolean' },
    },
    args: {
        label: 'Button',
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('button', { name: args.label as string })).toBeInTheDocument()
    },
}
```

---

## Complete example: compound component

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Button } from '@/components/actions/button'
import { Card } from '@/components/surfaces/card'

const meta = {
    title: 'Surfaces/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A surface container with consistent background, border, shadow, and rounded corners.
Use it to group related content and actions. Compose with \`Card.Header\`, \`Card.Body\`, and \`Card.Footer\`.

**Usage**
\`\`\`tsx
<Card>
  <Card.Header
    title="Account settings"
    description="Manage your profile."
    titleAs="h3"
  />
  <Card.Body>…</Card.Body>
  <Card.Footer>
    <Button label="Save" variant="contained" color="primary" />
  </Card.Footer>
</Card>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`title\` on \`Card.Header\` | Recommended | \`string\` | Provides an accessible heading for the card content. |
| \`titleAs\` on \`Card.Header\` | No | \`h1\` – \`h6\` | Choose the heading level that fits the page outline. |
| \`as\` on \`Card\` | No | \`div\` \| \`section\` \| \`article\` \| \`aside\` | Use the semantically correct landmark element. |
| \`as\` on \`Card.Footer\` | No | \`div\` \| \`footer\` | Renders a native \`<footer>\` when set. |

- Prefer \`article\` for self-contained content and \`aside\` for tangential content.
- Maintain a logical heading order across cards on the same page.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Card\` | Root surface container. |
| \`Card.Header\` | Title, description, and optional actions. |
| \`Card.Body\` | Main content area. |
| \`Card.Footer\` | Bottom area for actions or metadata. |
                `,
            },
        },
    },
    argTypes: {
        as: { control: 'select', options: ['div', 'section', 'article', 'aside'], table: { category: 'Card' } },
        title: { control: 'text', table: { category: 'Card.Header' } },
        titleAs: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], table: { category: 'Card.Header' } },
        description: { control: 'text', table: { category: 'Card.Header' } },
        showFooter: { control: 'boolean', table: { category: 'Card.Footer' } },
    },
    args: {
        as: 'div',
        title: 'Account settings',
        titleAs: 'h3',
        description: 'Manage your profile and preferences.',
        showFooter: true,
    },
} satisfies Meta<ComponentProps<typeof Card> & { title?: string; titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; description?: string; showFooter?: boolean }>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground — every prop for all sub-components is exposed in the Controls panel, grouped by component.',
            },
        },
    },
    render: ({ as, title, titleAs, description, showFooter }) => (
        <Card as={as} style={{ width: '22rem' }}>
            <Card.Header title={title} titleAs={titleAs} description={description} />
            <Card.Body>Your content goes here.</Card.Body>
            {showFooter && (
                <Card.Footer>
                    <Button label="Save changes" variant="contained" color="primary" size="sm" />
                </Card.Footer>
            )}
        </Card>
    ),
}
```

---

## Checklist

Before considering a story complete, verify:

- [ ] The story file is located at `src/stories/<group>/<component-name>/ComponentName.stories.tsx`.
- [ ] The meta description explains what the component is and what it is used for.
- [ ] A copy-pasteable code example is included.
- [ ] The accessibility table covers every prop, attribute, or composition rule that affects accessibility.
- [ ] There is exactly one interactive story (`Playground` or `Default`).
- [ ] Every public prop is exposed in the Controls panel.
- [ ] Compound-component controls are grouped by sub-component using `table.category`.
- [ ] A `play` interaction test verifies at least one critical behavior or accessibility expectation.
- [ ] No additional static gallery stories exist.
