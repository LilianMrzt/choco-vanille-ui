import { md } from '@stories/utils/markdown'

export const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type           | Notes                                                                                       |
| ---------------- | -------- | -------------- | ------------------------------------------------------------------------------------------- |
| \`children\`       | Yes      | \`ReactElement\` | The component displayed beneath the indicator.                                              |
| \`number\`         | No       | \`number\`       | Renders a size-matched number inside the indicator. |
| \`label\`          | No       | \`string\`       | Gives the indicator a custom accessible name. Without it, a numbered indicator uses its number as its name. |
| \`aria-*\`         | No       | —              | Native attributes are forwarded to the wrapper.                                             |
`
