import { md } from '@stories/_shared/utils/markdown'

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`value\` | Yes | \`RichTextValue\` | The structured document rendered as semantic HTML. |
| \`aria-label\` / \`aria-labelledby\` | No | \`string\` | Names the renderer when its surrounding context does not. |
| \`className\` | No | \`string\` | Applied to the renderer container. |
`
