import { useArgs } from 'storybook/preview-api'

import { RichTextRenderer } from '@components/data-display/rich-text-renderer'
import {
    RichTextEditor,
    RichTextEditorField,
    type RichTextValue,
} from '@components/forms/rich-text-editor'
import type { RichTextEditorPlaygroundArgs } from '@stories/forms/rich-text-editor/types'
import { INITIAL_VALUE } from '@stories/forms/rich-text-editor/constants'
import type { ReactElement } from 'react'

/**
 * Renders the RichTextEditor interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <RichTextPlayground />
 */
const RichTextPlayground = (): ReactElement => {
    const [currentArgs, updateArgs] = useArgs<RichTextEditorPlaygroundArgs>()
    const {
        showToolbarGroups,
        showTextStyleGroup,
        showTextAppearanceGroup,
        showTextColorMenu,
        showTextSizeMenu,
        textSizePresentation,
        showLinkGroup,
        showSetLink,
        showUnsetLink,
        showListsGroup,
        showAlignmentGroup,
        showImageGroup,
        showToolbarSeparator,
        ...args
    } = currentArgs
    const value = args.value ?? INITIAL_VALUE
    const setValue = (nextValue: RichTextValue) => {
        args.onValueChange?.(nextValue)
        updateArgs({ value: nextValue })
    }
    const separator = showToolbarSeparator && (
        <RichTextEditor.ToolbarSeparator />
    )

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                width: 'min(100%, 42rem)',
            }}
        >
            <section aria-label={'Field API'}>
                <h3>Field API</h3>
                <RichTextEditorField
                    {...args}
                    value={value}
                    onValueChange={setValue}
                />
            </section>
            <section aria-label={'Compound API'}>
                <h3>Compound API</h3>
                <RichTextEditor
                    {...args}
                    value={value}
                    onValueChange={setValue}
                >
                    <RichTextEditor.Label>
                        {args.label ?? 'Description'}
                    </RichTextEditor.Label>
                    {!args.readOnly && <RichTextEditor.Toolbar>
                        {showToolbarGroups && <RichTextEditor.ToolbarGroups />}
                        {showTextAppearanceGroup && (
                            <>
                                <RichTextEditor.TextAppearanceGroup />
                                {separator}
                            </>
                        )}
                        {showTextSizeMenu && (
                            <RichTextEditor.TextAppearanceGroup.TextSizeMenu
                                presentation={textSizePresentation}
                            />
                        )}
                        {showTextStyleGroup && (
                            <>
                                <RichTextEditor.TextStyleGroup />
                                {separator}
                            </>
                        )}
                        {showTextColorMenu && (
                            <RichTextEditor.TextAppearanceGroup.TextColorMenu />
                        )}
                        {showAlignmentGroup && (
                            <>
                                <RichTextEditor.AlignmentGroup />
                                {separator}
                            </>
                        )}
                        {showListsGroup && <RichTextEditor.ListsGroup />}
                        {(showAlignmentGroup || showListsGroup) && separator}
                        {showLinkGroup && (
                            <>
                                <RichTextEditor.LinkGroup />
                                {separator}
                            </>
                        )}
                        {showSetLink && <RichTextEditor.SetLink />}
                        {showUnsetLink && <RichTextEditor.UnsetLink />}
                        {showImageGroup && <RichTextEditor.ImageGroup />}
                    </RichTextEditor.Toolbar>}
                    {args.readOnly ? <RichTextEditor.ReadOnlyField /> : <RichTextEditor.EditorField />}
                    <RichTextEditor.HelperText />
                </RichTextEditor>
            </section>
            <RichTextRenderer
                value={value}
                aria-label={'Rendered result'}
            />
        </div>
    )
}

export default RichTextPlayground
