import type { ReactElement } from 'react'
import { Breadcrumbs } from '@components/navigation/breadcrumbs'
import type { BreadcrumbsStoryArgs } from '../../types'

/**
 * Renders the hierarchy with an editable current-item label.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root and current-item controls.
 * @returns The breadcrumb composition.
 * @example <BreadcrumbsPlayground {...args} />
 */
const BreadcrumbsPlayground = (props: BreadcrumbsStoryArgs): ReactElement => {
    const { children: _children, currentLabel, ...rootProps } = props

    return (
        <Breadcrumbs {...rootProps}>
            <Breadcrumbs.Item
                href={'/'}
                label={'Home'}
            />
            <Breadcrumbs.Item
                href={'/products'}
                label={'Products'}
            />
            <Breadcrumbs.Item label={currentLabel} />
        </Breadcrumbs>
    )
}

export default BreadcrumbsPlayground
