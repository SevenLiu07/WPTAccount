<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  // 2.0兼容IE
  import 'babel-polyfill'

  import api from '../src/api/account.js'
  import auth from './utils/auth'
  import { mapMutations } from 'vuex'

  export default {
    name: 'app',
    data () {
      return {
      }
    },
    methods: {

      ...mapMutations([
        'loggingStatus',
        'testPlatform'
      ]),

      getCookies () {
        if (auth.getCookie('userEmail') && !location.href.includes('reset')) {
          if (auth.getCookie('userEmail') === 'facebook') {
            this.$router.push('/login#facebook')
          } else {
            this.$router.push('/login')
          }
        } else {
          if (location.href.includes('reset')) {
          } else {
            this.$router.push('/signup')
          }
        }
      },
      checkUrl () {
        if (!location.href.includes('direct')) {
          this.getCookies()
        }
      },
      preventDefaults () {
        document.addEventListener('mousemove', (e) => {
          e.preventDefault()
        }, false)
      }
    },
    mounted () {
      this.testPlatform()
      api.getToken({version: Math.random()})
      this.checkUrl()
      this.loggingStatus()
      this.preventDefaults()
    }
  }
</script>
<style>
  html,body{
    width: 100%;
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
