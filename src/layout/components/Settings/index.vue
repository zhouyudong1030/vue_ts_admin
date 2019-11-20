<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">设置</h3>

      <div class="drawer-item">
        <span>主题：</span>
        <theme-picker style="float: right;height: 26px; margin: -3px 8px 0 0" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>显示菜单栏</span>
        <el-switch v-model="showTagsViews" class="drawer-switch"></el-switch>
      </div>

      <div class="drawer-item">
        <span>侧边栏Logo</span>
        <el-switch v-model="showSidebarLogo" class="drawer-switch"></el-switch>
      </div>

      <div class="drawer-item">
        <span>固定头部</span>
        <el-switch v-model="fixedHeader" class="drawer-switch"></el-switch>
      </div>

      <div class="drawer-item">
        <span>侧边栏主题</span>
        <el-switch v-model="sidebarTextTheme" class="drawer-switch"></el-switch>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/setting'
import ThemePicker from '@/components/ThemePicker/index.vue'

@Component({
  name: 'Settings',
  components: {
    ThemePicker
  }
})

export default class extends Vue {
  get fixedHeader () {
    return SettingsModule.fixedHeader
  }

  get showTagsViews () {
    return SettingsModule.showTagViews
  }

  set showTagsViews (value) {
    SettingsModule.changeSettings({ key: 'showTagViews', value })
  }

  get showSidebarLogo () {
    return SettingsModule.showSidebarLogo
  }

  set showSidebarLogo (value) {
    SettingsModule.changeSettings({ key: 'showSidebarLogo', value })
  }

  get sidebarThemeText () {
    return SettingsModule.sidebarTextTheme
  }

  set sidebarThemeText (value) {
    SettingsModule.changeSettings({ key: 'sidebarTextTheme', value })
  }

  private changeTheme (theme: string) {
    SettingsModule.changeSettings({ key: 'theme', value: theme })
  }
}
</script>
<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
