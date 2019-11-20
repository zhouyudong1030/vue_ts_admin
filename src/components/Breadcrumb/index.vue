<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcurmb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span v-if="item.redirect === 'no-redirect' || index === breadcrumbs.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import pathToRegexp from 'path-to-regexp'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route, RouteRecord } from 'vue-router'

@Component({
  name: 'Breadcrumb'
})

export default class extends Vue {
  private breadcrumbs: RouteRecord[] = [] // 访问过的路由栈

  @Watch('$route')
  private onRouteChange (route: Route) {
    if (!route.path.startsWith('/redirect/')) { // 过滤跳转的情况
      this.getBreadcrumb()
    }
  }

  created () {
    this.getBreadcrumb()
  }

  private getBreadcrumb () {
    let matched = this.$route.matched.filter(item => item.meta && item.meta.title) // 访问过的路由栈
    const first = matched[0]

    if (!this.isDashboard(first)) {
      matched = [{ path: '/dashboard', meta: { title: 'dashboard' } } as RouteRecord].concat(matched)
    }
    this.breadcrumbs = matched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
  }

  private isDashboard (route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
  }

  private pathCompile (path: string) {
    const { params } = this.$route
    const toPath = pathToRegexp.compile(path) // 正则表达式验证路径
    return toPath(params)
  }

  private handleLink (item:any) {
    const { redirect, path } = item
    if (redirect) {
      this.$router.push(redirect)
      return
    }
    this.$router.push(this.pathCompile(path))
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
