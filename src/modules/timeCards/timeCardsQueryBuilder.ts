export const timeCardsApi = {
  all: ['timeCards'] as const,
  lists: () => [...timeCardsApi.all, 'list'] as const,
  list: (filters: string) => [...timeCardsApi.lists(), { filters }] as const,
  details: () => [...timeCardsApi.all, 'detail'] as const,
  detail: (args: { employee: string; payPeriodEnd: string }) =>
    [...timeCardsApi.details(), args] as const,
}
