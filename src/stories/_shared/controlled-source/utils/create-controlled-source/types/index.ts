/** Configuration for controlled consumer examples; not part of the public package API. */
export type ControlledSourceOptions<Props> = Readonly<{
    component: string
    stateProp: string
    eventProp: string
    stateType?: string
    handler: string
    omitted?: readonly string[]
    icon?: Readonly<{ prop: string; name: string; module: string }>
    children?: (args: Props) => string
    openState?: boolean
    additionalImports?: string
    wrapElement?: (element: string) => string
}>
