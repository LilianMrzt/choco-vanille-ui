import { type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'
import {
    RichTextEditorField
} from '@components/forms/rich-text-editor'
import { storySource } from '@stories/_shared/utils/storySource'
import type { RichTextEditorPlaygroundArgs } from '@stories/forms/rich-text-editor/types'
import { createRichTextPlaygroundSource } from '@stories/forms/rich-text-editor/utils/create-rich-text-playground-source/createRichTextPlaygroundSource.utils'
import consumerSource5 from '@stories/forms/rich-text-editor/sources/RichTextEditorExample5.source.txt?raw'
import RichTextEditorDocsPage from '@stories/forms/rich-text-editor/components/rich-text-editor-docs-page/RichTextEditorDocsPage'
import RichTextPlayground from '@stories/forms/rich-text-editor/components/rich-text-playground/RichTextPlayground'
import RichTextEditorStatesExample from '@stories/forms/rich-text-editor/components/rich-text-editor-states-example/RichTextEditorStatesExample'
import { INITIAL_VALUE, ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/rich-text-editor/constants'
const meta = {
    title: 'Forms/RichTextEditor',
    tags: ['autodocs'],
    component: RichTextEditorField as ComponentType<RichTextEditorPlaygroundArgs>,
    parameters: {
        layout: 'centered',
        docs: {
            page: RichTextEditorDocsPage,
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
} satisfies Meta<RichTextEditorPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;
export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Edit the document and see the semantic RichTextRenderer output update below it. All compound toolbar controls target the visible compound section; the toolbar is hidden in read-only mode.',
            },
            source: { type: 'dynamic', transform: createRichTextPlaygroundSource(INITIAL_VALUE) },
        },
    },
    render: RichTextPlayground,
}

export const States: Story = {
    parameters: {
        docs: {
            ...storySource(/* language=TEXT */ consumerSource5),
        },
    },
    render: RichTextEditorStatesExample,
}
