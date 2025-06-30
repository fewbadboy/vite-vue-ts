import router from '.'
import { useUserStore } from '@/store'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']
console.log('whiteList', whiteList)

router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title || 'Vite Admin'

  const userStore = useUserStore()
  const token = userStore.token
  console.log('hasToken', !!token)

  const isAuthenticated = true
  /**
   * '/home/detail/' ['', 'home', 'detail', '']
   */
  const toDepth = to.path.split('/').filter(Boolean).length
  const fromDepth = from.path.split('/').filter(Boolean).length

  if (toDepth === fromDepth) {
    to.meta.transition = 'fade'
  } else {
    to.meta.transition = toDepth > fromDepth ? 'slide-left' : 'slide-right'
  }

  if (to.name !== 'Login' && !isAuthenticated) {
    // Redirect to login page if not authenticated
    next({ name: 'Login' })
  } else {
    // Allow access to the route
    next()
  }
})

router.afterEach((to) => {
  NProgress.done()
  console.log(`Navigated to ${to.path}`)
})
