export const ACCESSIBILITY_DESCRIPTION = `## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| Child \`aria-label\` | For identifying avatars | \`string\` | Names the person represented by fallback content. |
| \`role="group"\` and \`aria-label\` | For a named group | \`string\` | Native attributes are forwarded to the group. |
| \`overflowLabel\` | For localized overflow | \`(count: number) => string\` | Hidden avatars leave the DOM; the overflow image announces their count. |`
