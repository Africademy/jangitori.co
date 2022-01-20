import { Account } from '@/domains/models/Account'

export type PageProps<P extends {} = {}> = { account?: Account } & P
