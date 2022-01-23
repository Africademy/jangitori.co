import { Account } from '@/data/models/account'

export type PageProps<P extends {} = {}> = { account?: Account } & P
