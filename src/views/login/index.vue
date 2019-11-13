<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" name="username" placeholder="请输入账户名称" type="text" auto-complete="on"></el-input>
      </el-form-item>

      <el-form-item>
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input ref="password" v-model="loginForm.password" :key="passwordType" name="password" placeholder="请输入密码" :type="passwordType" auto-complete="on" @keyup.enter.native="handleLogin"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'eye-off' :  'eye-on'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width: 100%;margin-bottom:30px;" @click.native.prevent="handleLogin"></el-button>

      <div style="position:relative">
        <div class="tips">
          <span>username: admin</span>
          <span>password: any</span>
        </div>
        <div class="tips">
          <span>username: editor</span>
          <span>password: any</span>
        </div>
        <el-button class="thirdparty-button" type="primary" @click="showDialog = true">Or Connect With</el-button>
      </div>
    </el-form>

    <el-dialog title="第三方登录方式" :visible.sync="showDialog">
      可以使用以下方式登录
      <br>
      <br>
      <br>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Form as ElForm, Input } from 'element-ui'
import { isValidateUsername } from '@/utils/validate'
import { Dictionary } from 'vue-router/types/router'

@Component({
  name: 'login'
})

export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidateUsername(value)) {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(Error('The password can not be less than 6 words'))
    } else {
      callback()
    }
  }

  private loginForm = {
    username: 'admin',
    password: '1111'
  }

  private loginRules = {
    username: [{ trigger: 'blur', validator: this.validateUsername }],
    password: [{ trigger: 'blur', validator: this.validatePassword }]
  }

  private passwordType = 'password'
  private loading = false
  private showDialog = false
  private redirect?:string
  private otherQuery:Dictionary<string> = {}

  @Watch('$route', { immediate: true })
  private onRouteChange (route: Route) {
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted () {
    if (this.loginForm.username === '') {

    }
  }

  private handleLogin () {
    (this.$refs.loginForm as ElForm).validate(async (valid:boolean) => {
      if (valid) {
        this.loading = true
      } else {
        return false
      }
    })
  }

  private showPwd () {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus()
    })
  }

  private getOtherQuery (query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>
<style lang="scss" scoped>
.login-container {

}
</style>
