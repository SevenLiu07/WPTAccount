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
              <div class="content_title">Create account</div>
              <div class="switch" v-if="stateBtn" @click="switchFacebook()">
                <router-link to="signup#facebook"><strong>Facebook Log in ></strong></router-link>
              </div>
            </div>
            <div class="facebook_login" v-show="facebook">
              <div class="facebook_button" @click="handleFacebookSignUp()">
                <span class="facebook_logo"><img src="../assets/images/facebook_logo.png"/></span>
                <span class="facebook_text">Log in with Facebook</span>
              </div>
              <div class="login_separator">or</div>
              <div class="with_email" @click="switchEmail()">
                <router-link to="signup#email">Sign up with email</router-link>
              </div>
            </div>
            <div class="email_login" v-if="emailLogin">
              <input type="text" maxlength="45" class="form_field" placeholder="Email" v-model="email" autofocus @blur="emailCheck()" ref="email">
              <input type="password" maxlength="16" class="form_field" placeholder="Password" v-model="password" @blur="passwordCheck()" ref="password">
              <button class="email_button hover_effect" @click="handleEmailSignUp">Sign up</button>
            </div>
          </div>
        </div>
        <div class="alt_option">Already have an account?
          <router-link to="login"><strong>Log in</strong></router-link>
        </div>
      </div>
    </div>
    <div class="protocol">By entering my email here, I have read and agree to the <a
       target="_blank" href="https://www.playwpt.com/privacy">Privacy Policy</a>
      and agree to receive email updates, notifications, and special promotional offers from PlayWPT
    </div>
  </div>
</template>

<script>
  import api from '../api/account.js'
  import validate from '../utils/validate.js'
  import { mapState } from 'vuex'
  import {mapMutations } from 'vuex'
  import auth from '../utils/auth.js'
  import trackers from '../utils/trackers.js'
  import Alert from '../components/Alert.vue'

  export default {
    data () {
      return {
        email: '',
        password: '',
        currentLogin: 'signupText',
        facebook: true,
        emailLogin: false,
        isValidEmail: false,
        isValidPassword: false,
        stateBtn: false
      }
    },
    components: {Alert},
    computed: mapState([
      'platform',
      'accountConfirmed'

    ]),

    methods: {
      ...mapMutations([
        'loggingStatus',
        'faceBookLogin'
      ]),

      handleFacebookSignUp () {
        this.faceBookLogin()
        trackers.facebookSignUp()
      },

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
        this.isValidEmail = validate.email(this.email.trim(), res => {
          this.$refs.tips.popTips(res)
        })
      },
      passwordCheck () {
        if (this.isValidEmail) {
          this.isValidPassword = validate.password(this.password.trim(), res => {
            this.$refs.tips.popTips(res)
          })
        }
      },
      getUrlParam () {
        if (location.href.includes('direct') && location.href.includes('email')) {
          this.switchEmail()
          this.email = validate.getQuery()
        }
      },
      handleEmailSignUp () {
        this.emailCheck()
        this.passwordCheck()

        if (this.isValidEmail && this.isValidPassword) {
          let data = {
            version: Math.random(),
            email: this.email,
            pwd: auth.rsa(this.password),
            promotion: true
          }
          api.singUp(data)
             .then(res => {
               if (res.data.Value && res.data.State === 1) {
                 this.accountConfirmed = true
                 this.loggingStatus()
                 auth.setCookie('userEmail', this.email, 30)
                 trackers.signSucceed()
               } else {
                 this.$refs.tips.popTips(res.data.Message)
                 trackers.signFailed()
               }
             })
          trackers.statisticsSign('signup_click', 'signup_click')
        }
      }
    },

    mounted () {
      this.getUrlParam()
      trackers.statisticsSign('signup_view', 'view')
    }
  }
</script>

<style scoped>
  @import '../assets/css/main.css';
  .protocol {
    width: 100%;
    color: #86a5c3;
    min-width: 0;
    padding: 15px 0;
    text-align: left;
    font-size: 12px;
  }
  .protocol a {
    color: #86a5c3;

  }
</style>
