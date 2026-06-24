import { cva } from 'class-variance-authority'

/*
 * Typography style recipe — shadcn/ui flavour.
 *
 * Note: shadcn/ui ships Typography only as documentation (plain HTML examples);
 * there is no `shadcn add typography` component. This `cva` is the kit's own
 * shadcn-flavoured recipe and the single source of truth for text styles:
 * customise typography by editing the classes below.
 */
export const typographyVariants = cva('', {
    variants: {
        variant: {
            h1: 'scroll-m-20 text-5xl font-extrabold tracking-tight text-balance',
            h2: 'scroll-m-20 text-4xl font-semibold tracking-tight',
            h3: 'scroll-m-20 text-3xl font-semibold tracking-tight',
            h4: 'scroll-m-20 text-2xl font-semibold tracking-tight',
            h5: 'scroll-m-20 text-xl font-semibold tracking-tight',
            h6: 'scroll-m-20 text-base font-semibold tracking-tight',
            p: 'text-base leading-7',
            span: '',
            label: 'text-sm font-medium leading-none',
            small: 'text-sm leading-none',
            strong: 'font-bold',
            em: 'italic',
            blockquote: 'border-l-2 pl-6 italic text-muted-foreground',
            pre: 'rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto',
            code: 'rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
            kbd: 'rounded border bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold shadow-sm',
            samp: 'font-mono text-sm',
            abbr: 'underline decoration-dotted cursor-help',
            cite: 'italic text-muted-foreground',
            mark: 'rounded bg-yellow-200 px-1 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-100',
            del: 'line-through opacity-70',
            ins: 'underline',
            sub: 'text-xs align-sub',
            sup: 'text-xs align-super',
        },
        fontSize: {
            xs: 'text-xs',
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
            '4xl': 'text-4xl',
            '5xl': 'text-5xl',
            '6xl': 'text-6xl',
        },
        fontWeight: {
            thin: 'font-thin',
            extralight: 'font-extralight',
            light: 'font-light',
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
            extrabold: 'font-extrabold',
            black: 'font-black',
        },
        ellipsis: {
            true: 'truncate',
        },
    },
    defaultVariants: {
        variant: 'p',
    },
})
