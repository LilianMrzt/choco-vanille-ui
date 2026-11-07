import type { ReactElement } from 'react'
import AccordionExample from '../accordion-example/AccordionExample'
import type { AccordionStoryArgs } from '../../types'

/**
 * Remounts to demonstrate initial-only expanded values.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Initial state and composition controls.
 * @returns The uncontrolled example.
 * @example <AccordionUncontrolled defaultValue={['item-1']} />
 */
const AccordionUncontrolled = (props: AccordionStoryArgs): ReactElement => (
    <AccordionExample
        {...props}
        key={JSON.stringify(props.defaultValue)}
        value={undefined}
    />
)

export default AccordionUncontrolled
