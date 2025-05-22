import 'nprogress/nprogress.css'
import 'virtual:svg-icons/register'
import '@/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'

import i18n from './i18n'

import './router/access'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
