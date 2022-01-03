import { Account } from '@/common/models/Account'

export type PageProps<P extends {} = {}> = { account?: Account } & P
