import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { MarkdownRenderer } from '@components/data-display/markdown-renderer'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const EXAMPLE_MARKDOWN = `# Project notes

This renderer supports **bold text**, *emphasis*, links and lists.

- Safe Markdown output
- GFM tables
`

const PLAYGROUND_SOURCE = `const markdown = \`# Project notes

This renderer supports **bold text**, *emphasis*, links and lists.

- Safe Markdown output
- GFM tables
\`

<MarkdownRenderer markdown={markdown} />`

const SAFE_CONTENT_SOURCE = `const markdown = \`## Release notes

Read the **documentation** and visit [the project](https://example.com).

1. Draft
2. Review
3. Published
\`

<MarkdownRenderer markdown={markdown} />`

const SANITIZED_CONTENT_SOURCE = `const untrustedMarkdown = \`<script>alert('xss')</script>

[Unsafe link](javascript:alert('xss'))

<span>Raw HTML is ignored.</span>
\`

<MarkdownRenderer markdown={untrustedMarkdown} />`

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

Markdown is rendered as semantic HTML. Links remain keyboard accessible, raw
HTML is not rendered, and unsafe URL protocols are removed.

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`markdown\` | Yes | \`string\` | Markdown source to render. |
| \`className\` | No | \`string\` | Applied to the root element. |
`

const MarkdownRendererDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Data Display/MarkdownRenderer',
    component: MarkdownRenderer,
    parameters: {
        docs: {
            page: MarkdownRendererDocsPage,
            description: {
                component: md /* language=markdown */ `
Render sanitized Markdown as semantic HTML.

Raw HTML is ignored and unsafe link protocols are removed.
                `,
            },
        },
    },
    argTypes: {
        markdown: {
            control: 'text',
            description: 'Markdown source to render.',
        },
    },
    args: {
        markdown: EXAMPLE_MARKDOWN,
    },
} satisfies Meta<typeof MarkdownRenderer>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Use the Controls panel to edit the Markdown source.',
            },
            ...storySource(PLAYGROUND_SOURCE),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('heading', { name: 'Project notes' })).toBeInTheDocument()
    },
}

export const SafeContent: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Common Markdown elements rendered with semantic HTML.',
            },
            ...storySource(SAFE_CONTENT_SOURCE),
        },
    },
    args: {
        markdown: `## Release notes

Read the **documentation** and visit [the project](https://example.com).

1. Draft
2. Review
3. Published`,
    },
}

export const Links: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Markdown links are rendered as accessible anchors.',
            },
            ...storySource(`const markdown = \`[Documentation](https://example.com)

[Contact](mailto:hello@example.com)

[Internal page](/getting-started)
\`

<MarkdownRenderer markdown={markdown} />`),
        },
    },
    args: {
        markdown: `[Documentation](https://example.com)

[Contact](mailto:hello@example.com)

[Internal page](/getting-started)`,
    },
}

export const SanitizedContent: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Raw HTML and unsafe protocols are not rendered.',
            },
            ...storySource(SANITIZED_CONTENT_SOURCE),
        },
    },
    args: {
        markdown: `<script>alert('xss')</script>

[Unsafe link](javascript:alert('xss'))

<span>Raw HTML is ignored.</span>`,
    },
}
