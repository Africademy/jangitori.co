import { User } from '@/data/models/user'

export type PageProps<P extends {} = {}> = { user?: User } & P
