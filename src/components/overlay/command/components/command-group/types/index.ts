/**
 * Props for `Command.Group`.
 */
export type CommandGroupProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> & {
    /**
     * Visible section label rendered above the group items.
     * When provided, it is also used as the group's accessible name via
     * `aria-labelledby`.
     */
    label?: string
}
