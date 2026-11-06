import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders stepper documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <StepperDocsPage />
 */
const StepperDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-label\` | Yes | \`string\` | Names the navigation landmark. |
| \`currentStep\` | Yes | \`number\` | One-based current step. |
| \`aria-current\` | Automatic | \`step\` | Marks the current step. |
| \`onStepChange\` | No | \`(step: number) => void\` | Makes items native buttons. |
| \`Stepper.Item disabled\` | No | \`boolean\` | Disables an interactive step. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default StepperDocsPage
