/**
 * Props for `Command.List`.
 *
 * The `id` and `role` are injected from `CommandContext` and must not be
 * overridden — omit them from the public props to avoid confusion.
 */
export type CommandListProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'role' | 'id'
> & {
    /**
     * Accessible label for the listbox.
     * @default 'Commands'
     */
    'aria-label'?: string
}
