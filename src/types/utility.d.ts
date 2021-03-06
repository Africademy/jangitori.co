type Falsy = false | undefined | null | ''

type Dict<T = unknown> = Record<string, T>

type AnyFunction = (...args: any[]) => any
