<template>
  <div>
    <div
    v-for="(item, index) in deepArr"
    :key="index">
      <span v-for="(val, idx) in item.b" :key="idx">{{val}}</span>
  </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMain'
})
export default class extends Vue {
  private deepArr = [
    {
      a: 1,
      b: [0, 1, 2]
    },
    {
      a: 2,
      b: [3, 4, 5]
    }
  ]

  mounted () {
    setTimeout(() => {
      this.update()
    }, 2000)
  }

  private update () {
    this.deepArr = [
      {
        a: 0,
        b: [7, 7, 7, 7]
      },
      {
        a: 2,
        b: [9, 9]
      }
    ]
  }
}
</script>
<style lang="scss" scoped>

</style>
