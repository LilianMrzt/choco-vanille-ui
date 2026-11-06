import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { StepperStoryArgs } from '@stories/navigation/stepper/constants'
import sourceTemplate from '@stories/navigation/stepper/utils/create-stepper-source/sources/createStepperSource.source.tsx.txt?raw'

/**
 * Generates JSX reflecting the current story controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createStepperSource('', { args })
 */
export const createStepperSource = (_source: string, { args }: Readonly<{ args: StepperStoryArgs }>): string =>
    renderSource(sourceTemplate, {
        ariaLabel: JSON.stringify(args['aria-label']),
        currentStep: JSON.stringify(args.currentStep),
        orientation: JSON.stringify(args.orientation ?? 'horizontal'),
        accountLabel: JSON.stringify(args.accountLabel),
        preferencesLabel: JSON.stringify(args.preferencesLabel),
        reviewLabel: JSON.stringify(args.reviewLabel),
    })
