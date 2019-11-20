<template>
  <div :class="{'has-logo': showLogo}">
    <sidebar-logo v-if="showLogo" :collapse="collapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { SettingsModule } from '@/store/modules/setting'
import { PermissionModule } from '@/store/modules/permission'
import SidebarLogo from './SidebarLogo.vue'
import SideBarItem from './SidebarItem.vue'
import variables from '@/style/_variable.scss'

@Component({
  name: 'SideBar',
  components: {
    SidebarLogo,
    SideBarItem
  }
})

export default class extends Vue {
  // 获取computed属性
  get sidebar () {
    return AppModule.sidebar
  }

  get routes () {
    return PermissionModule.routes
  }

  get showLogo () {
    return SettingsModule.showSidebarLogo
  }

  get menuActiveTextColor () {
    if (SettingsModule.sidebarTextTheme) {
      return SettingsModule.sidebarTextTheme
    } else {
      return variables.menuActiveText
    }
  }

  get variables () {
    return variables
  }

  get activeMenu () {
    const route = this.$route
    const { meta, path } = route
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  get isCollapse () {
    return !this.sidebar.opened
  }
}

</script>
<style lang="scss" scoped>

</style>
