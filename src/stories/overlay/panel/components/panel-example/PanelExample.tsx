import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Typography } from '@components/foundation/typography'
import { Panel } from '@components/overlay/panel'
import type { PanelStoryArgs } from '@stories/overlay/panel/types'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Renders panel root and slot controls.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Panel root props and demonstration controls.
 * @param props.position - Content side.
 * @param props.width - Content width.
 * @param props.title - Header title.
 * @param props.description - Header description.
 * @param props.showDescription - Whether to show the description.
 * @returns The composed panel.
 * @example
 * <PanelExample title="Settings" />
 */
const PanelExample = ({ position, width, title, description, showDescription, ...rootProps }: PanelStoryArgs): ReactElement => (
    <Panel {...rootProps}>
        <Panel.Trigger>
            <Button
                color={'primary'}
                label={'Open panel'}
                variant={'contained'}
            />
        </Panel.Trigger>
        <Panel.Content
            position={position}
            width={width}
        >
            <Panel.Header
                description={showDescription ? description : undefined}
                title={title}
            />
            <Panel.Body>
                <Typography
                    color={vars.color.text.primary}
                    fontSize={14}
                    variant={'p'}
                >
                    Your content goes here. This panel demonstrates the dialog-like compound component with side placement.
                </Typography>
            </Panel.Body>
        </Panel.Content>
    </Panel>
)

export default PanelExample
