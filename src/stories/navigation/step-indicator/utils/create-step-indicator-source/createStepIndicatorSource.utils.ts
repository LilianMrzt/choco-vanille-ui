import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { StepIndicatorStoryArgs } from '@stories/navigation/step-indicator/constants'
import sourceTemplate from '@stories/navigation/step-indicator/utils/create-step-indicator-source/sources/createStepIndicatorSource.source.tsx.txt?raw'

/**
 * Generates JSX reflecting the current story controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current story args.
 * @returns Consumer JSX.
 * @example
 * createStepIndicatorSource('', { args })
 */
export const createStepIndicatorSource = (_source: string, { args }: Readonly<{ args: StepIndicatorStoryArgs }>): string =>
    renderSource(sourceTemplate, {
        ariaLabel: JSON.stringify(args['aria-label']),
        currentStep: JSON.stringify(args.currentStep),
        accountLabel: JSON.stringify(args.accountLabel),
        preferencesLabel: JSON.stringify(args.preferencesLabel),
        reviewLabel: JSON.stringify(args.reviewLabel),
        confirmationLabel: JSON.stringify(args.confirmationLabel),
    })
