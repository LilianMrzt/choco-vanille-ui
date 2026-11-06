import { FORM_STYLES } from '@components/forms/form/Form.css.ts'
import type { FormProps } from '@components/forms/form/types'
import { cn } from '@utils/cn.ts'
import { forwardRef, memo } from 'react'

/**
 * A thin, unstyled wrapper around the native `<form>` element.
 *
 * Use it as the root of any form so assistive technology can identify the
 * form boundary, and so you have a consistent place to handle submission
 * and validation behavior. Native attributes and events are forwarded to the
 * form; the ref targets that element. Provide an accessible name when the
 * form needs to be exposed as a landmark.
 *
 * @param props - Native form attributes and children.
 * @param props.className - Additional class merged with the form reset.
 * @param props.children - Form fields and actions.
 * @param ref - Ref forwarded to the form element.
 * @returns A native form element.
 * @example
 * ```tsx
 * <Form onSubmit={handleSubmit}>
 *   <TextField label="Email" />
 *   <Button type="submit" label="Send" />
 * </Form>
 * ```
 */
const Form = memo(forwardRef<HTMLFormElement, FormProps>(
    ({ className, children, ...props }, ref) => (
        <form
            ref={ref}
            className={cn(FORM_STYLES.root, className)}
            {...props}
        >
            {children}
        </form>
    ),
))

Form.displayName = 'Form'

export default Form
