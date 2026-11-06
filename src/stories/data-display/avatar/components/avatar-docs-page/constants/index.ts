export const ACCESSIBILITY_DESCRIPTION = `## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-label\` / \`aria-labelledby\` | For identifying fallback content | \`string\` | Names the root because initials and icons are decorative. |
| \`alt\` | For informative images | \`string\` | Omit only for decorative images. |
| \`statusLabel\` | For localized presence | \`string\` | Defaults to the status value. |

For interaction, wrap the avatar in a named native button rather than assigning a button role to a span. Name an \`AvatarGroup\` with \`role="group"\` and an accessible label when the group needs identification; use \`overflowLabel\` to localize its hidden-item count.`
