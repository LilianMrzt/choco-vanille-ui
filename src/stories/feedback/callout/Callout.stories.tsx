import type { Meta, StoryObj } from '@storybook/react-vite'

import { Callout } from '@components/feedback/callout'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import CalloutDocsPage from '@stories/feedback/callout/components/callout-docs-page/CalloutDocsPage'
import CalloutVariants from '@stories/feedback/callout/components/callout-variants/CalloutVariants'
import { ARG_TYPES, DEFAULT_ARGS, type CalloutStoryArgs } from '@stories/feedback/callout/constants'
import variantsSource from '@stories/feedback/callout/sources/CalloutVariants.source.tsx.txt?raw'
import { createCalloutSource } from '@stories/feedback/callout/utils/create-callout-source/createCalloutSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Feedback/Callout',
    component: Callout,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A contextual message with a default icon, convenience props and compound slots. Supply your own icon components when using custom icons or actions.',
            },
            page: CalloutDocsPage,
            source: { type: 'dynamic', transform: createCalloutSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<CalloutStoryArgs>

export default meta

type Story = StoryObj<CalloutStoryArgs>

export const Playground: Story = {
    render: ({ variant, role, title, description, showCustomIcon, showTitle, showDescription, showAction, actionLabel, onActionClick }) => (
        <Callout
            variant={variant}
            role={role}
        >
            {showCustomIcon && <Callout.Icon icon={InfoIcon} />}
            {showTitle && <Callout.Title>{title}</Callout.Title>}
            {showDescription && <Callout.Description>{description}</Callout.Description>}
            {showAction && (
                <Callout.Action
                    icon={CloseIcon}
                    aria-label={actionLabel}
                    onClick={onActionClick}
                />
            )}
        </Callout>
    ),
}

export const Variants: Story = {
    parameters: { docs: { ...storySource(variantsSource) } },
    render: CalloutVariants,
}
