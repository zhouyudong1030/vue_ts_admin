import Vue from 'vue'
import Router, { RouteConfig, Route } from 'vue-router'

Vue.use(Router)

// interface只做类型批注
export const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/test',
    component: () => import(/* webpackChunkName: ''test */ '@/layout/components/AppMain.vue')
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
