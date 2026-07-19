export type UseTransitionRenderReturnType = {
    isVisible: boolean
    isFadingIn: boolean
    /**
     * Whether child content should still be rendered.
     *
     * Mirrors `isVisible`: it stays `true` while the element is in the DOM
     * (including during the fade-out phase) and becomes `false` once the
     * closing transition has finished. Useful for unmounting text or icons
     * after they have faded out.
     */
    shouldRenderContent: boolean
}
