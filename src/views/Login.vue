<template>
  <div class="floating_container">
    <titles :currentPage='currentLogin'></titles>
    <Alert ref="tips"></Alert>
    <div class="container_content">
      <banner></banner>
      <div class="content_wrapper">
        <div class="content_container">
          <div class="content">

            <div class="content_top">
              <div class="content_title">Log in & Play</div>
              <div class="switch" v-if="stateBtn" @click="switchFacebook()">
                <router-link to="login#facebook"><strong>Facebook Log in ></strong></router-link>
              </div>
            </div>

            <div class="facebook_login" v-show="facebook">
              <div class="facebook_button hover_effect" @click="handleFacebookLogin()">
                <span class="facebook_logo"><img src="../assets/images/facebook_logo.png"/></span>
                <span class="facebook_text">Log in with Facebook</span>
              </div>
              <div class="login_separator">or</div>
              <div class="with_email" @click="switchEmail()">
                <router-link to="login#email">Log in with email</router-link>
              </div>
            </div>

            <div class="email_login" v-if="emailLogin">


              <input type="text" maxlength="45" class="form_field" placeholder="Email" v-model="email" autofocus
                     @blur="emailCheck()" ref="email">
              <input type="password" maxlength="16" class="form_field" placeholder="Password" v-model="password"
                     @blur="passwordCheck()" ref="password">


              <button class="email_button hover_effect" @click="handleEmailLogin()">Log in</button>


              <div class="forgot_password">
                <router-link to="password">Forgot password</router-link>
              </div>
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

<script>
  import {mapState, mapMutations} from 'vuex'
  import auth from '../utils/auth.js'
  import api from '../api/account.js'
  import validate from '../utils/validate.js'
  import trackers from '../utils/trackers.js'
  import Alert from '../components/Alert.vue'

  export default {
    data () {
      return {
        email: '',
        password: '',
        currentLogin: 'loginText',
        facebook: true,
        emailLogin: false,
        isValidEmail: false,
        stateBtn: false

      }
    },

    components: { Alert },
    computed: mapState([
      'platform'
    ]),
    methods: {

      ...mapMutations([
        'loggingStatus',
        'faceBookLogin'
      ]),

      switchEmail () {
        this.facebook = false
        this.emailLogin = true
        this.stateBtn = true
      },
      switchFacebook () {
        this.facebook = true
        this.emailLogin = false
        this.stateBtn = false
      },
      emailCheck () {
        this.isValidEmail = validate.email(this.email.trim(),
          res => {
            this.$refs.tips.popTips(res)
          })
      },
      passwordCheck () {
        if (!this.password) {
          this.$refs.tips.popTips('Please enter your password')
        }
      },
      handleFacebookLogin () {
        this.faceBookLogin()
        trackers.facebookLogin()
      },
      handleEmailLogin () {
        this.emailCheck()
        if (this.isValidEmail) {
          if (!this.password) {
            this.$refs.tips.popTips('Please enter your password')
          } else {
            trackers.statisticsLogin(this.platform, 'login_click', 'login_click')
            let data = {
              version: Math.random(),
              email: this.email,
              pwd: auth.rsa(this.password)
            }
            api.login(data)
              .then(res => {
                if (res.data.State === 1) {
                  this.loggingStatus()
                  auth.setCookie('userEmail', this.email, 30)
                  trackers.loginSucceed(this.platform)
                } else {
                  this.$refs.tips.popTips(res.data.Message)
                  trackers.loginFailed(this.platform, res.data.Message)
                }
              })
          }
        }
      },
      getUrlParam () {
        if (!location.href.includes('direct')) {
          const emails = auth.getCookie('userEmail')
          if (emails) {
            this.switchEmail()
            this.$nextTick(() => {
              this.email = emails
            })
          }
        } else {
          if (location.href.includes('email')) {
            this.switchEmail()
            this.email = validate.getQuery()
          }
        }
      }
    },
    created () {
      let component = this
      window.onkeydown = function (e) {
        if (location.href.includes('login') && !location.href.includes('facebook')) {
          if (e.which === 13 || e.keyCode === 13) {
            component.handleEmailLogin()
          }
        }
      }
    },
    mounted () {
      this.getUrlParam()
      trackers.statisticsLogin(this.platform, 'login_view', 'view')
    }
  }

</script>

<style scoped>
  @import '../assets/css/main.css';
</style>
