import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Typography } from '@/components/foundation/typography';
import type { TypographySize, TypographyVariant, TypographyWeight } from '@/components/foundation/typography';

const VARIANTS: TypographyVariant[] = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'span', 'label', 'small', 'strong', 'em',
  'blockquote', 'pre', 'code', 'kbd', 'samp',
  'abbr', 'cite', 'mark', 'del', 'ins', 'sub', 'sup',
];

const SIZES: TypographySize[] = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];

const WEIGHTS: TypographyWeight[] = [
  'thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black',
];

const meta = {
  title: 'Foundation/Typography',
  component: Typography,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    fontSize: { control: 'select', options: [undefined, ...SIZES] },
    fontWeight: { control: 'select', options: [undefined, ...WEIGHTS] },
    ellipsis: { control: 'boolean' },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

// Accessibility guide
// Referenced by Typography.mdx — hidden from the sidebar in dev mode.

export const AccessibilityBestPractices: Story = {
  name: 'Accessibility — Best Practices',
  tags: ['!dev'],
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6 p-4">

      {/* Heading hierarchy */}
      <section aria-labelledby="section-heading">
        <Typography variant="h2" id="section-heading">Respect heading hierarchy</Typography>
        <Typography variant="p" className="mt-2">
          Use one <Typography variant="code">h1</Typography> per page as the main title.
          Nest headings in order — never skip from{' '}
          <Typography variant="code">h2</Typography> to{' '}
          <Typography variant="code">h4</Typography>.
        </Typography>
      </section>

      {/* Abbreviations */}
      <section aria-labelledby="abbr-heading">
        <Typography variant="h3" id="abbr-heading">Always expand abbreviations</Typography>
        <Typography variant="p" className="mt-2">
          Screen readers can announce the full form via the <Typography variant="code">title</Typography> attribute:{' '}
          <Typography variant="abbr" title="Web Content Accessibility Guidelines">WCAG</Typography>,{' '}
          <Typography variant="abbr" title="Accessible Rich Internet Applications">ARIA</Typography>.
        </Typography>
      </section>

      {/* Form labels */}
      <section aria-labelledby="label-heading">
        <Typography variant="h3" id="label-heading">Pair labels with inputs</Typography>
        <div className="mt-2 flex flex-col gap-1">
          <label htmlFor="email-input">
            <Typography variant="label">Email address</Typography>
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="you@example.com"
            className="rounded border px-3 py-1.5 text-sm"
          />
        </div>
      </section>

      {/* Polymorphic as prop */}
      <section aria-labelledby="poly-heading">
        <Typography variant="h3" id="poly-heading">Separate visual style from semantics</Typography>
        <Typography variant="p" className="mt-2">
          Use the <Typography variant="code">as</Typography> prop when the visual style must differ
          from the semantic element — for example, a card title that looks like an{' '}
          <Typography variant="code">h3</Typography> but lives inside a{' '}
          <Typography variant="code">{'<li>'}</Typography>:
        </Typography>
        <Typography variant="h3" as="span" className="mt-2 block">
          Visually h3, rendered as a span
        </Typography>
      </section>

      {/* Document edits */}
      <section aria-labelledby="edit-heading">
        <Typography variant="h3" id="edit-heading">Mark document changes clearly</Typography>
        <Typography variant="p" className="mt-2">
          Pair <Typography variant="code">del</Typography> and{' '}
          <Typography variant="code">ins</Typography> to communicate revisions:{' '}
          <Typography variant="del">$9.99</Typography>{' '}
          <Typography variant="ins">$7.99</Typography>.
        </Typography>
      </section>

    </div>
  ),
  // Accessibility regression test: verifies the semantic relationships that
  // axe-core alone cannot fully assert (label/input pairing, abbr expansion).
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The form control is reachable by its accessible name (label association).
    const emailInput = canvas.getByLabelText('Email address');
    await expect(emailInput).toHaveAttribute('type', 'email');

    // Abbreviations expose their expanded form to assistive technology.
    const wcag = canvas.getByText('WCAG');
    await expect(wcag).toHaveAttribute('title', 'Web Content Accessibility Guidelines');

    // A single top-level section heading anchors the heading hierarchy.
    await expect(
      canvas.getByRole('heading', { name: 'Respect heading hierarchy' }),
    ).toBeInTheDocument();
  },
};

//  Default

export const Default: Story = {
  // Smoke test: the primary story renders its content for the docs playground.
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(args.children as string)).toBeInTheDocument();
  },
};

// All variants

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-2xl flex-col gap-3 p-4">
      <Typography variant="h1">h1 — Heading 1</Typography>
      <Typography variant="h2">h2 — Heading 2</Typography>
      <Typography variant="h3">h3 — Heading 3</Typography>
      <Typography variant="h4">h4 — Heading 4</Typography>
      <Typography variant="h5">h5 — Heading 5</Typography>
      <Typography variant="h6">h6 — Heading 6</Typography>
      <Typography variant="p">p — Body paragraph with comfortable line height.</Typography>
      <Typography variant="span">span — Inline generic text.</Typography>
      <Typography variant="label">label — Form label text.</Typography>
      <Typography variant="small">small — Fine print or secondary text.</Typography>
      <Typography variant="strong">strong — Bold important text.</Typography>
      <Typography variant="em">em — Italic emphasis text.</Typography>
      <Typography variant="blockquote">blockquote — A quoted passage from another source.</Typography>
      <Typography variant="pre">{'pre — Preformatted text    with spaces preserved.'}</Typography>
      <Typography variant="code">code — inline snippet</Typography>
      <Typography variant="kbd">kbd — ⌘ K</Typography>
      <Typography variant="samp">samp — Sample output</Typography>
      <Typography variant="abbr" title="HyperText Markup Language">abbr — HTML</Typography>
      <Typography variant="cite">cite — The Great Gatsby</Typography>
      <Typography variant="mark">mark — Highlighted</Typography>
      <Typography variant="del">del — Deleted text</Typography>
      <Typography variant="ins">ins — Inserted text</Typography>
      <Typography variant="sub">sub — H₂O subscript</Typography>
      <Typography variant="sup">sup — x² superscript</Typography>
    </div>
  ),
};
