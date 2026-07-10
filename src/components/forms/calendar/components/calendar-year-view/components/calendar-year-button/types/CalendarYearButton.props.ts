export type CalendarYearButtonProps = {
    year: number
    index: number
    isSelected: boolean
    isFocused: boolean
    buttonRefs: React.MutableRefObject<Array<HTMLButtonElement | null>>
    isDisabled: (selectedYear: number) => boolean
    isToday: (selectedYear: number) => boolean
    handleSelect: (selectedYear: number) => void
    handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => void
}
