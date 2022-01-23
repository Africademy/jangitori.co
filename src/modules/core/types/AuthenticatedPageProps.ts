import { User } from '@/data/models/user'

export type AuthenticatedPageProps<P = {}> = {
  user: User
} & P
