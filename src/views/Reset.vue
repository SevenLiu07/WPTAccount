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
              <input type="password" class="form_field" placeholder="New password"  @blur="password1Check()" v-model='password1' >
              <input type="password" class="form_field" placeholder="Confirm password"  @blur="password2Check()" v-model='password2' >
              <button class="email_button hover_effect" @click='reset()'>Reset</button>
            </div>
          </div>
        </div>
        <div class="alt_option">Don't have an account?
          <router-link to="signup"><strong>Sign up</strong></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import auth from '../utils/auth.js'
  import api from '../api/account.js'
  import validate from '../utils/validate.js'
  import { mapState } from 'vuex'

  import Alert from '../components/Alert.vue'

  export default {
    data () {
      return {
        password1: '',
        password2: '',
        isInvalidPassword: false,
        confirmed: false,
        pending: false
      }
    },
    components: { Alert },
    computed: mapState([
      'platform'
    ]),
    methods: {

      password1Check () {
        this.isInvalidPassword = validate.password(this.password1, res => {
          this.$refs.tips.popTips(res)
        })
      },
      password2Check () {
        if (this.isInvalidPassword) {
          if (this.password1 === this.password2) {
            this.confirmed = true
          } else {
            this.$refs.tips.popTips('The password does not match. Please input again.')
          }
        }
      },
      reset () {
        this.password1Check()
        this.password2Check()

        if (this.pending) {
          this.$refs.tips.popTips('Submitted. Please wait')
        }

        if (this.isInvalidPassword && this.confirmed) {
          let data = {
            version: Math.random(),
            pwd: auth.rsa(this.password1),
            pwd2: auth.rsa(this.password2)
          }

          this.pending = true

          api.resetPassword(data)
            .then(res => {
              if (res.data.State === 1) {
                this.$refs.tips.popTips(res.data.Message)
                setTimeout(function () {
                  if (location.href.indexOf('staging') !== -1) {
                    window.location.href = 'https://staging-games.' + window.location.host.split('.')[1] + '.com/poker/'
                  } else {
                    window.location.href = 'https://games.' + window.location.host.split('.')[1] + '.com/poker/'
                  }
                }, 3000)
              } else {
                this.$refs.tips.popTips(res.data.Message)
                this.pending = false
              }
            })
            .catch(this.pending = false)
        }
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/main.css';
</style>
