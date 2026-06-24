import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground active:brightness-75',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/60',
                ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground active:brightness-75',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)
