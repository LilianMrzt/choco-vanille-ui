import { FORM_STYLES } from '@components/forms/form/Form.css.ts'
import type { FormProps } from '@components/forms/form/types/Form.props.ts'
import { cn } from '@utils/cn.ts'
import { forwardRef } from 'react'

/**
 * A thin, unstyled wrapper around the native `<form>` element.
 *
 * Use it as the root of any form so assistive technology can identify the
 * form boundary, and so you have a consistent place to handle submission
 * and validation behavior.
 *
 * @example
 * ```tsx
 * <Form onSubmit={handleSubmit}>
 *   <TextField label="Email" />
 *   <Button type="submit">Send</Button>
 * </Form>
 * ```
 */
const Form = forwardRef<HTMLFormElement, FormProps>(
    ({ className, children, ...props }, ref) => (
        <form
            ref={ref}
            className={cn(FORM_STYLES.root, className)}
            {...props}
        >
            {children}
        </form>
    ),
)

Form.displayName = 'Form'

export default Form
