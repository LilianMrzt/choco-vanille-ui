/**
 * Prevents the accidental selection caused by sliding an item under the cursor.
 *
 * Radix selects an item by synthesizing a click on `pointerup` when the press
 * did **not** start on it (`@radix-ui/react-menu`: `onPointerUp` →
 * `currentTarget.click()` while `!isPointerDownRef.current`). Once shifted, the
 * `pointerup` releasing the *opening* click lands on an item and triggers it.
 *
 * We enforce the invariant *a pointer selection requires a `pointerdown` inside
 * the panel*: a press-less `pointerup` is stopped in the capture phase, so the
 * synthetic click never fires. It self-scopes (a `pointerup` only reaches the
 * panel once moved under the cursor) and leaves genuine clicks and keyboard
 * navigation untouched. Returns a cleanup that detaches the listeners.
 */
export const guardAccidentalSelection = (content: HTMLElement) => {
    let pointerDownInside = false

    const onPointerDown = () => { pointerDownInside = true }
    const onPointerUp = (event: PointerEvent) => {
        if (!pointerDownInside) { event.stopImmediatePropagation() }
        pointerDownInside = false
    }

    content.addEventListener('pointerdown', onPointerDown, true)
    content.addEventListener('pointerup', onPointerUp, true)

    return () => {
        content.removeEventListener('pointerdown', onPointerDown, true)
        content.removeEventListener('pointerup', onPointerUp, true)
    }
}
