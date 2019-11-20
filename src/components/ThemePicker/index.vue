<template>
  <el-color-picker
    v-model="theme"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']"
    class="theme-picker"
    propper-class="theme-picker-dropdown" />
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/setting'

const version = require('element-ui/package.json').version // node_modules中获取element-ui的版本
const ORIGINAL_THEME = '#409EFF'

@Component({
  name: 'ThemePicker'
})

export default class extends Vue {
  private chalk = ''
  private theme = ''

  get defaultTheme () {
    return SettingsModule.theme
  }

  // 监听computed属性的变化
  @Watch('defaultTheme', { immediate: true })
  private onDefaultThemeChange (value: string) {
    this.theme = value
  }

  @Watch('theme')
  private async onThemeChange (value: string) {
    // eslint-disable-next-line no-useless-return
    if (!value) return
    const oldValue = this.chalk ? this.theme : ORIGINAL_THEME
  }

  private updateStyle (style: string, oldCluster: string[], newCluster: string[]) {
    let newStyle = style
    oldCluster.forEach((color, index) => {
      newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
    })
    return newStyle
  }
}
</script>
<style lang="scss">
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}
.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
