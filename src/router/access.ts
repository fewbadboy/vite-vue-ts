import router from '.'
import NProgress from 'nprogress'
import { canAccessPage } from '@/utils/permission'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']
console.log('whiteList', whiteList)

router.beforeEach(async (to, from) => {
  NProgress.start()
  document.title = to.meta.title || 'Vite Admin'
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
  return await canAccessPage(to)
})

router.afterEach(() => {
  NProgress.done()
})
