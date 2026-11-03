import { useEffect, useRef, useState } from 'react'

import type { ClipboardResult, ClipboardStatus } from '@stories/_shared/hooks/use-clipboard/types'

/**
 * Copies a documentation value and reports permission or API failures visibly.
 * @internal Not part of the public package API.
 * @param value - Text to write to the clipboard.
 * @returns A copy action and feedback for the current value.
 * @example const { copy, status } = useClipboard('vars.space[12]')
 */
export const useClipboard = (value: string): ClipboardResult => {
    const isMounted = useRef(false)
    const [result, setResult] = useState<Readonly<{ value: string; status: ClipboardStatus }>>({
        value,
        status: 'idle',
    })

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    const copy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(value)
            if (isMounted.current) {
                setResult({ value, status: 'copied' })
            }
        } catch {
            if (isMounted.current) {
                setResult({ value, status: 'error' })
            }
        }
    }

    return { copy, status: result.value === value ? result.status : 'idle' }
}
