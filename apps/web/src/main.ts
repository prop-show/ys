import { createApp } from 'vue'

import '@/assets/main.css'

import App from './App.vue'
import { setupPlugins } from './plugins'

function bootstrap() {
  const app = createApp(App)

  setupPlugins(app)

  app.mount('#app')
}

bootstrap()
