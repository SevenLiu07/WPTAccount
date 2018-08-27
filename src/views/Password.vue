<template>
  <div class="floating_container">
    <titles></titles>
    <Alert ref="tips"></Alert>
    <div class="container_content">
      <banner></banner>
      <div class="content_wrapper">
        <div class="content_container">
          <div class="content">
            <div class="content_top">
              <div class="content_title">Reset Password</div>
              <div class="switch">
                <router-link to="login#email"><strong>Cancel ></strong></router-link>
              </div>
            </div>
            <div class="email_login">
              <input type="text" class="form_field" placeholder="Please enter your email" v-model="email"
                     autofocus="autofocus" @blur="emailCheck()" ref="email">
              <button class="email_button hover_effect" @click="reset()">Reset</button>
            </div>
          </div>
        </div>
        <div class="alt_option">
          Don't have an account?
          <router-link to="signup"><strong>Sign up</strong></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../api/account.js'
  import validate from '../utils/validate.js'
  import { mapState } from 'vuex'
  import Alert from '../components/Alert.vue'

  export default {
    data () {
      return {
        email: '',
        isValidEmail: false
      }
    },
    computed: mapState([
      'platform'
    ]),

    components: { Alert },
    methods: {

      emailCheck () {
        this.isValidEmail = validate.email(this.email.trim(), res => {
          this.$refs.tips.popTips(res)
        })
      },

      reset () {
        this.emailCheck()

        if (this.isValidEmail) {
          let data = {
            version: Math.random(),
            email: this.$refs.email.value,
            isH5: true
          }

          api.forgetPassword(data)
             .then(
              res => {
                if (res.data.State === 1) {
                  this.$refs.tips.popTips(`We've sent a link to reset your password. Please check your inbox . The link will expire in one hour.`)
                  //this.$refs.tips.popTips(res)
                } else {
                  this.$refs.tips.popTips(res.data.Message)
                }
              }
            )
        }
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/main.css';
</style>
