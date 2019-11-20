<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// @Component装饰器可以接收一个对象作为参数，可以在对象中声明components/filters/directives,也可以声明computed/watch
// 装饰器：类装饰器、方法装饰器、访问符装饰器、属性装饰器、参数装饰器
// 多个装饰器，声明的时候从上到下，运行的时候从下到上

// 类装饰器不能出现在.d.ts声明文件，也不能出现在任何外部上下中(declare声明的类)
@Component({
  name: 'App'
})
export default class App extends Vue {}
</script>
