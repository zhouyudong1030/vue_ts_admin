<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutSide" />
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { AppModule, DeviceType } from '@/store/modules/app'
import { SettingsModule } from '@/store/modules/setting'
import ResizeMixin from './mixin/resize'

@Component({
  name: 'Layout'
})

// Vue中使用mixins
export default class extends mixins(ResizeMixin) {
  // computed属性
  get classObj () {
    return {
      hideSideBar: !this.sidebar.opened,
      openeSideBar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    }
  }

  get showSettings () {
    return SettingsModule.showSettings
  }

  get showTagViews () {
    return SettingsModule.showTagViews
  }

  get fixedHeader () {
    return SettingsModule.fixedHeader
  }

  private handleClickOutSide () {
    AppModule.CloseSideBar(false)
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
}
</style>
