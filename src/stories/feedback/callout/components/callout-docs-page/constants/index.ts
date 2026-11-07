import { md } from '@stories/_shared/utils/markdown'

export const DOCUMENTATION = md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`role\` | No | \`status \\| alert\` | Defaults to \`status\`; use \`alert\` for urgent messages. Explicit \`undefined\` removes the role. |
| \`Callout.Action aria-label\` | Yes | \`string\` | Names the icon-only action. |
| \`Callout.Icon aria-label\` | No | \`string\` | Name an icon that conveys meaning on its own. |

## Sub-components

| Component | Description |
| --- | --- |
| \`Callout.Icon\` | Overrides the default intent icon. |
| \`Callout.Title\` | Short message heading. |
| \`Callout.Description\` | Supporting message content. |
| \`Callout.Action\` | Named icon-only action. |
        `
