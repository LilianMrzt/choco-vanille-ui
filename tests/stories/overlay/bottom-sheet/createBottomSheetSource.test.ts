import { describe, expect, it } from 'vitest'

import { createBottomSheetSource } from '@stories/overlay/bottom-sheet/utils/create-bottom-sheet-source/createBottomSheetSource.utils'

describe('createBottomSheetSource', () => {
    it('reflects controlled state and conditional slots', () => {
        const source = createBottomSheetSource('', {
            args: { open: true, showHandle: false, showHeader: false, showRadioGroup: true, showSeparator: false, itemDisabled: true },
        })

        expect(source).toContain('useState(true)')
        expect(source).toContain('showHandle={false}')
        expect(source).not.toContain('<BottomSheet.Header')
        expect(source).toContain('<BottomSheet.RadioGroup')
        expect(source).not.toContain('<BottomSheet.Separator')
        expect(source).toContain('disabled={true}')
    })

    it('serializes the optional header description without changing its content', () => {
        const source = createBottomSheetSource('', {
            args: { showHeader: true, title: 'Photo "details"', description: '' },
        })

        expect(source).toContain('<BottomSheet.Header title={"Photo \\"details\\""} description={""} />')
        expect(createBottomSheetSource('', { args: { showHeader: true } }))
            .toContain('<BottomSheet.Header title={"Photo"} />')
    })

    it('includes supplied dimensions in the consumer example', () => {
        const source = createBottomSheetSource('', {
            args: { width: '100%', minWidth: 120, maxWidth: 'none', height: '80vh', minHeight: 0, maxHeight: '90vh' },
        })

        expect(source).toContain('width={"100%"} minWidth={120} maxWidth={"none"} height={"80vh"} minHeight={0} maxHeight={"90vh"}')
        expect(createBottomSheetSource('', { args: {} })).not.toContain('maxWidth=')
    })

    it.each([
        [false, false, 0],
        [false, true, 1],
        [true, false, 0],
        [true, true, 2],
    ])('renders radio group and separators independently (%s, %s)', (showRadioGroup, showSeparator, separatorCount) => {
        const source = createBottomSheetSource('', {
            args: { showRadioGroup, showSeparator, radioItemLabel: 'Original "size"' },
        })

        expect(source.match(/<BottomSheet\.Separator \/>/g) ?? []).toHaveLength(separatorCount)
        expect(source.includes('<BottomSheet.RadioGroup')).toBe(showRadioGroup)
        if (showRadioGroup) {
            expect(source).toContain('label={"Original \\"size\\""}')
        }
    })
})
