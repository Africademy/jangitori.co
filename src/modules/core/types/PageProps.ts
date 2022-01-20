import { Account } from '@/modules/models/Account'

export type PageProps<P extends {} = {}> = { account?: Account } & P
