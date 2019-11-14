import Vue from 'vue'
import Router, { RouteConfig, Route } from 'vue-router'

Vue.use(Router)

// interface只做类型批注
export const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  }
]

export const asyncRoutes: RouteConfig[] = []

const createRouter = () => new Router({
  scrollBehavior: (to:Route, from:Route, savedPosition:any) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher
}

export default router
