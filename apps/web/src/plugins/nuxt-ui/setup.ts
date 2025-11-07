import type { App } from 'vue'

import ui from '@nuxt/ui/vue-plugin'

export function setupNuxtUI(app: App) {
  app.use(ui)
}
