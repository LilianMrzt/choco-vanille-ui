export type CalendarMonthButtonProps = {
    index: number
    label: string
    isSelected: boolean
    isFocused: boolean
    buttonRefs: React.MutableRefObject<Array<HTMLButtonElement | null>>
    isDisabled: (monthIndex: number) => boolean
    isToday: (monthIndex: number) => boolean
    handleSelect: (monthIndex: number) => void
    handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => void
}
