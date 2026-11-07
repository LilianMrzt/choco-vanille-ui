import { md } from '@stories/_shared/utils/markdown'

export const ACCESSIBILITY_DESCRIPTION = md`## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-label\` / \`aria-labelledby\` | For identifying fallback content | \`string\` | Names the root because initials and icons are decorative. |
| \`alt\` | For informative images | \`string\` | Omit only for decorative images. |
| \`statusLabel\` | For localized presence | \`string\` | Defaults to the status value. |

For interaction, wrap the avatar in a named native button rather than assigning a button role to a span. Name an \`AvatarGroup\` with \`role="group"\` and an accessible label when the group needs identification; use \`overflowLabel\` to localize its hidden-item count.

## Sub-components

| Sub-component | Description |
| --- | --- |
| \`Avatar.Root\` | Coordinates the image, fallback and presence indicator. |
| \`Avatar.Image\` | Profile image with loading callbacks. |
| \`Avatar.Fallback\` | Initials or icon shown while the image is unavailable. |
| \`Avatar.Status\` | Named presence indicator. |
| \`AvatarGroup\` | Groups avatars with overlap and an overflow limit. |
| \`AvatarGroup.Item\` | Convenience avatar inside a group. |
`
