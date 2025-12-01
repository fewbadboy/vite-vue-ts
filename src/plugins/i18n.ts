import type { App } from 'vue'

export default {
  install: (app: App, options: Record<string, string>) => {
    app.config.globalProperties.$translate = (key: string) => {
      return options[key] || key
    }
  },
}
