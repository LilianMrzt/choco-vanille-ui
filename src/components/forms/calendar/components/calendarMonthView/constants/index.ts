export const GRID_COLS = 3

export const MONTH_LABELS = Array.from({ length: 12 }, (_, i) => {
    const name = new Intl.DateTimeFormat(undefined, { month: 'long' }).format(new Date(2000, i, 1))
    return name.charAt(0).toUpperCase() + name.slice(1)
})
