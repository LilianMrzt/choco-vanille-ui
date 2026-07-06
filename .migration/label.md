# Label

2026-07-06 — transformation engine (manual) — replaced `@radix-ui/react-label` with native `<label>`.

## Changed

- `src/components/forms/text-field/components/text-field-label/TextFieldLabel.tsx`
  - Replaced `import * as RadixLabel from '@radix-ui/react-label'` and `<RadixLabel.Root>` with a native `<label>` element.
  - Kept `htmlFor`, `className`, and `data-disabled` behavior unchanged.

- `src/components/forms/text-area/components/text-area-label/TextAreaLabel.tsx`
  - Same replacement as TextFieldLabel: native `<label>` instead of Radix Label.

- `src/components/forms/text-field/TextField.tsx`
  - Updated JSDoc to remove the `@radix-ui/react-label` reference.

- `src/components/forms/text-area/TextArea.tsx`
  - Updated JSDoc to remove the `@radix-ui/react-label` reference.

- `src/stories/forms/text-field/TextField.stories.tsx`
  - Updated description to reference native `<label>`.

- `src/stories/forms/text-area/TextArea.stories.tsx`
  - Updated description to reference native `<label>`.

Leftover scan:
```
grep -rn "@radix-ui/react-label" src
```
→ clean (only `package.json`, `yarn.lock`, and docs remain).

## Left alone

- `package.json` / `yarn.lock`: `@radix-ui/react-label` is kept until the final dependency sweep after all components are migrated.
- `src/docs/migration/baseui-vs-radix.md`: documentation, not runtime code.
- `Fieldset`, `Legend`, `HelperText`: these are custom wrappers, not Radix Label consumers, so they were not touched.

## Behavior changes

None expected. The Radix Label primitive rendered a plain `<label>` with no extra behavior; the native element preserves the same accessibility and styling contract.

## Verify by hand

1. Render a TextField and a TextArea with `label` props; inspect the DOM and confirm a `<label>` element is present with the correct `for` attribute.
2. Click the label and confirm focus moves to the associated input/textarea.
3. Pass `disabled` and confirm `data-disabled=""` is set on the label and the disabled styles apply.
