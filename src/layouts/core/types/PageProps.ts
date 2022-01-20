import { Account } from '@/db/models/Account'

export type PageProps<P extends {} = {}> = { account?: Account } & P
