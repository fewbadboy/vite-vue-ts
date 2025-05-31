
import router from "."
import { useMenuStore, useUserStore } from "@/store";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/register']
console.log('whiteList', whiteList);

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || 'Vite Admin'
  const menuStore = useMenuStore()
  
  const userStore = useUserStore()
  const token = userStore.token
  console.log('hasToken',!!token);
  
  const isAuthenticated = true;

  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'

  if (to.name !== 'Login' && !isAuthenticated) {
    // Redirect to login page if not authenticated
    next({ name: 'Login' });
  } else {
    // Allow access to the route
    menuStore.loadRoutes(['System', 'User', 'Role', 'Organization', 'Menu']);
    menuStore.getMenus.forEach(route => {
      router.addRoute(route);
    });
    router.addRoute({
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/not-found/index.vue'),
    });

    next();
  }
});

router.afterEach((to) => {
  NProgress.done();
  console.log(`Navigated to ${to.path}`);
});

