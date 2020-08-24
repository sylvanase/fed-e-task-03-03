<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <form @submit.prevent="updateUser">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" v-model="user.image" type="text" placeholder="URL of profile picture" :disabled="disabled">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" v-model="user.username" placeholder="Your Name" :disabled="disabled">
              </fieldset>
              <fieldset class="form-group">
                <textarea :disabled="disabled" v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input :disabled="disabled" class="form-control form-control-lg" type="text" v-model="user.email" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input :disabled="disabled" class="form-control form-control-lg" type="password" v-model="user.password" placeholder="Password">
              </fieldset>
              <button :disabled="disabled" class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

import { getUser, updateUser } from '@/api/user'
export default {
  name: 'settingIndex',
  middleware: 'user',
  data(){
    return {
      user: {
        image: '',
        bio: '',
        email: '',
        username: '',
        password: ''
      },
      disabled: false
    }
  },
  async mounted() {
    const { data } = await getUser()
    const { image, bio, email, username } = data.user
    this.user = {
      image,
      bio,
      email,
      username,
      password: ''
    }
  },
  methods: {
    async updateUser() {
      try {
        // 更新时禁止点击和更改数值
        this.disabled = true;
        const params = {...this.user}
        if(!params.password) {
          delete params.password 
        }
        const {data} = await updateUser({user: params})
        // 请求成功，更新用户信息
        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
        // 设置为跳转到profile
        this.$router.push(`/profile/${data.user.username}`)
      }catch (e) {
        this.errorMsg = e.response.data.errors
      }
      
    }
  }
  
}
</script>

<style>

</style>