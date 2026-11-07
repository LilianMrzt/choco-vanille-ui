import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/StepIndicatorUsage.source.txt?raw'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders step indicator documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <StepIndicatorDocsPage />
 */
const StepIndicatorDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Source
            code={usageSource}
            language={'tsx'}
        />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-label\` | Yes | \`string\` | Names the navigation landmark. |
| \`StepIndicator.Item label\` | Yes | \`string\` | Names each dot. |
| \`currentStep\` | Yes | \`number\` | One-based current step. |
| \`aria-current\` | Automatic | \`step\` | Marks the current step. |

Dots are native buttons when \`onStepChange\` is supplied.

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| StepIndicator.Item | Named step dot; becomes interactive when the root has an onStepChange callback. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default StepIndicatorDocsPage
