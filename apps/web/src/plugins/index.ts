import type { App } from 'vue'

import { setupDayjs } from './dayjs/setup'
import { setupNuxtUI } from './nuxt-ui/setup'
import { setupPinia } from './pinia/setup'
import { setupRouter } from './router/setup'
import { setupTanstackQuery } from './tanstack-query/setup'

export function setupPlugins(app: App) {
  setupPinia(app)
  setupDayjs()
  setupTanstackQuery(app)
  setupNuxtUI(app)
  setupRouter(app)
}
