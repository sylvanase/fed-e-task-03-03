<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">
          {{ isLogin ? 'Sign in' : 'Sign up' }}
        </h1>
        <p class="text-xs-center">
          <nuxt-link v-if="isLogin" to="/register">
            Need an account?
          </nuxt-link>
          <nuxt-link v-else to="/login">Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template v-for="(messages, field) in errorMsg">
            <li v-for="(message,index) in messages" :key="`${index}${message}`">{{ field }} {{ message }}</li>
          </template>
          
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset v-if="!isLogin" class="form-group">
            <input class="form-control form-control-lg" type="text" v-model="user.username" placeholder="Your Name" required>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="email" required v-model="user.email" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" required v-model="user.password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sign in' : 'Sign up' }}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
// 客户端加载js-cookie
const Cookie = process.client ? require('js-cookie') : undefined
import { login, register} from '@/api/user'
export default {
  name: 'LoginIndex',
  middleware: 'nouser',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errorMsg: {}
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit() {
      // 提交表单进行登录
      // mango@126.com mango-tuanzi
      try {
        // 根据路由判断是注册还是登录
        const {data} = this.isLogin ? await login({user: this.user}) : await register({user: this.user})
        // 保存用户的登录状态，后续请求的接口需要使用到token
        // 将用户信息存储到容器，共享该值
        this.$store.commit('setUser', data.user)
        // 防止页面刷新时状态丢失，利用cookie将其持久化
        Cookie.set('user', data.user)
        // 跳转到首页
        this.$router.push('/')
      }catch (e) {
        console.dir(e)
        this.errorMsg = e.response.data.errors
      }
    }
  }
}
</script>

<style>

</style>