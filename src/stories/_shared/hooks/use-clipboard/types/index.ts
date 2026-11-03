export type ClipboardStatus = 'idle' | 'copied' | 'error'

export type ClipboardResult = Readonly<{
    copy: () => Promise<void>
    status: ClipboardStatus
}>
