import type { App } from 'vue'

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

export function setupTanstackQuery(app: App) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  })
  app.use(VueQueryPlugin, {
    enableDevtoolsV6Plugin: true,
    queryClient,
  })
}
