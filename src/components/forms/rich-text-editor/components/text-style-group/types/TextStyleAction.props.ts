export type TextStyleActionProps = {
    mark: 'bold' | 'italic' | 'underline' | 'strike'
    icon: string
    label: string
    onToggle: () => void
}
