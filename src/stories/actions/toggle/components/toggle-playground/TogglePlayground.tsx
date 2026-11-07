import type { ReactElement } from 'react'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { Toggle } from '@components/actions'
import ControlledGroup from '@stories/actions/toggle/components/controlled-group/ControlledGroup'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'
import { useToggleStoryArgs } from '@stories/actions/toggle/hooks/use-toggle-story-args/useToggleStoryArgs'

/**
 * Keeps standalone and group controls usable on one primary surface.
 * @internal Not part of the public package API.
 * @returns Labelled standalone and group examples.
 * @example <TogglePlayground label="Bold" />
 * @param _props
 */
const TogglePlayground = (_props: ToggleStoryArgs): ReactElement => {
    const { toggleProps, groupProps } = useToggleStoryArgs()
    return (
        <Flex
            flexDirection={'column'}
            gap={24}
            maxWidth={'100%'}
            width={'min(40rem, calc(100vw - 32px))'}
        >
            <section aria-label={'Standalone'}>
                <Typography as={'h3'}>Standalone</Typography>
                <Toggle
                    key={toggleProps.pressed === undefined ? String(toggleProps.defaultPressed) : 'controlled'}
                    {...toggleProps}
                />
            </section>
            <section aria-label={'Group'}>
                <Typography as={'h3'}>Group</Typography>
                <ControlledGroup {...groupProps} />
            </section>
        </Flex>
    )
}

export default TogglePlayground
