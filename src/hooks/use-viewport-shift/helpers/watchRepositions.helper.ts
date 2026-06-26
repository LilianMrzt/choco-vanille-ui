/**
 * Re-runs `correct` on every event that can change the panel's box:
 * - the wrapper's `style` mutations → floating-ui (re)positioning, incl. the
 *   async transition from the off-screen sentinel to the final coordinates;
 * - the content resizing (dynamic item lists) — also fires once on observe,
 *   covering a wrapper already positioned when the ref attached;
 * - viewport resize.
 * Returns a cleanup that detaches everything.
 */
export const watchRepositions = (content: HTMLElement, wrapper: HTMLElement, correct: () => void) => {
    const mutation = new MutationObserver(correct)
    mutation.observe(wrapper, { attributes: true, attributeFilter: ['style'] })

    const resize = new ResizeObserver(correct)
    resize.observe(content)

    window.addEventListener('resize', correct)

    return () => {
        mutation.disconnect()
        resize.disconnect()
        window.removeEventListener('resize', correct)
    }
}
