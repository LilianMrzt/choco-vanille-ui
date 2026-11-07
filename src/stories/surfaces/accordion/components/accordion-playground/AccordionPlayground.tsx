import type { ReactElement } from 'react'
import { useArgs } from 'storybook/preview-api'
import AccordionExample from '../accordion-example/AccordionExample'
import type { AccordionStoryArgs } from '../../types'

/**
 * Synchronizes expanded values in both directions with Controls.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The controlled example.
 * @example <AccordionPlayground />
 */
const AccordionPlayground = (): ReactElement => {
    const [args, updateArgs] = useArgs<AccordionStoryArgs>()
    /**
     * Forwards details and synchronizes only uncanceled changes.
     * @internal Storybook-only handler; not part of the public package API.
     * @param value - Requested expanded item values.
     * @param details - Cancellable event details.
     * @returns Nothing.
     * @example handleValueChange(['item-1'], details)
     */
    const handleValueChange: NonNullable<AccordionStoryArgs['onValueChange']> = (value, details) => {
        args.onValueChange?.(value, details)

        if (!details.isCanceled) {
            updateArgs({ value })
        }
    }

    return (
        <AccordionExample
            {...args}
            onValueChange={handleValueChange}
        />
    )
}

export default AccordionPlayground
