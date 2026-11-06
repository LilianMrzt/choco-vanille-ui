import { useCallback, type Ref, type RefCallback } from 'react'

/**
 * Combines an internal popup callback ref with a consumer ref, preserving React
 * 19 callback-ref cleanup semantics.
 * @param internalRef - Internal callback ref.
 * @param externalRef - Consumer ref.
 * @returns A combined callback ref.
 * @example
 * useComposedPopupRef(internalRef, ref)
 */
export const useComposedPopupRef = <T>(internalRef: RefCallback<T>, externalRef?: Ref<T>): RefCallback<T> =>
    useCallback((element: T | null) => {
        const internalCleanup = internalRef(element)
        const externalCleanup = typeof externalRef === 'function' ? externalRef(element) : undefined

        if (externalRef && typeof externalRef !== 'function') {
            externalRef.current = element
        }

        if (element) {
            return () => {
                if (typeof internalCleanup === 'function') {
                    internalCleanup()
                } else {
                    internalRef(null)
                }

                if (typeof externalCleanup === 'function') {
                    externalCleanup()
                } else if (typeof externalRef === 'function') {
                    externalRef(null)
                } else if (externalRef) {
                    externalRef.current = null
                }
            }
        }
    }, [internalRef, externalRef])
