import { md } from '@stories/_shared/utils/markdown'

export const DOCUMENTATION = md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`role\` | No | \`status \\| alert \\| none\` | Defaults to \`status\`; use \`alert\` for urgent messages. |
| \`closeLabel\` | No | \`string\` | Names the convenience close button. |
| \`NotificationCard.Close aria-label\` | Yes | \`string\` | Names the compound close button. |
| \`onClose\` | No | \`() => void\` | Header supplies a close button unless an explicit Close slot is present. |

Compose Header (Icon, Title, Close), Body (Description or custom content), and
Footer (Actions). Compose Icon explicitly: Header never injects an icon.
Header supplies the root's onClose button unless an explicit Close slot replaces
it. Sections can be omitted; convenience props still include the variant icon.
The icon defaults to sm with compact padding and a 1px border matching the
outlinedSubtle Badge treatment. Override its borderColor to customize the tint.
The close button uses the sm preset.
The card does not dismiss itself;
attach a handler to its close button. Toaster handles dismissal and announcements
when using the notification hooks.

## Sub-components

| Component | Description |
| --- | --- |
| \`NotificationCard.Header\` | Groups the icon, title and close action. |
| \`NotificationCard.Body\` | Holds the description or custom content. |
| \`NotificationCard.Footer\` | Holds secondary content and actions. |
| \`NotificationCard.Icon\` | Intent icon or consumer-owned SVG. |
| \`NotificationCard.Title\` | Short notification heading. |
| \`NotificationCard.Description\` | Supporting message content. |
| \`NotificationCard.Actions\` | Wraps action buttons. |
| \`NotificationCard.Close\` | Named dismissal button. |
        `
