const componentCategories = [
    { name: 'Foundation', items: ['Icon', 'Typography'] },
    { name: 'Layout', items: ['Box', 'Flex', 'Grid', 'Inset', 'Separator'] },
    { name: 'Actions', items: ['Button', 'Fab', 'IconButton', 'Toggle'] },
    { name: 'Forms', items: ['Autocomplete', 'Calendar', 'Checkbox', 'DatePicker', 'ImagePicker', 'NumberField', 'RadioGroup', 'RichTextEditor', 'Select', 'Slider', 'Switch', 'TextArea', 'TextField', 'TimePicker'] },
    { name: 'Forms/Primitives', items: ['Fieldset', 'Form', 'FormLabel', 'HelperText', 'Legend'] },
    { name: 'Data Display', items: ['Avatar', 'Badge', 'Image', 'RichTextRenderer', 'StatusBadge', 'SvgImage', 'Table'] },
    { name: 'Surfaces', items: ['Accordion', 'Card', 'Collapsible'] },
    { name: 'Navigation', items: ['BottomNavigation', 'Breadcrumbs', 'Link', 'Pagination', 'StepIndicator', 'Stepper', 'Tabs'] },
    { name: 'Overlay', items: ['AlertDialog', 'BottomSheet', 'Command', 'ContextMenu', 'Dialog', 'Drawer', 'DropdownMenu', 'HoverCard', 'Panel', 'Popover', 'Tooltip'] },
    { name: 'Feedback', items: ['Callout', 'EmptyState', 'Progress', 'Skeleton', 'Spinner', 'Toast'] },
] as const

const referenceCategories = [
    {
        name: 'Overview',
        items: [
            { name: 'Customization', path: '/docs/overview-customization--docs' },
        ],
    },
    {
        name: 'Guidelines',
        items: [
            { name: 'Contributing', path: '/docs/guidelines-contributing--docs' },
            { name: 'Icons', path: '/docs/guidelines-icons--docs' },
        ],
    },
    {
        name: 'Docs',
        items: [
            { name: 'Light colors', path: '/story/docs-colors--light-theme' },
            { name: 'Dark colors', path: '/story/docs-colors--dark-theme' },
            { name: 'Tokens', path: '/story/docs-tokens--all-tokens' },
            { name: 'CSS variables', path: '/story/docs-css-variables--reference' },
        ],
    },
] as const

export { componentCategories, referenceCategories }
