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
              <div class="content_title">Choose a username</div>
            </div>
            <div class="email_login">
              <input type="text" class="form_field" placeholder="Enter username" v-model="username" maxlength="20"
                     autofocus ref="name">
              <button class="email_button hover_effect" @click="next()">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import validate from '../utils/validate.js'
  import api from '../api/account.js'
  import tracker from '../utils/trackers'
  import { mapState, mapMutations } from 'vuex'
  import Alert from '../components/Alert.vue'

  export default {
    data () {
      return {
        username: '',
        emailState: false
      }
    },

    components: {
      Alert
    },

    computed: mapState([
      'platform',
      'usernameConfirmed'
    ]),
    methods: {

      ...mapMutations([
        'loggingStatus'
      ]),

      next () {
        if (validate.username(this.username, res => {
          this.$refs.tips.popTips(res)
        })) {
          let data = {
            version: Math.random(),
            roleName: this.username,
            isH5: true
          }
          api.bindLzRoleName(data)
            .then(res => {
              if (res) {
                if (res.data.State === 1) {
                  this.usernameConfirmed = true
                  this.loggingStatus()
                  tracker.selectUsernameSucceed(this.platform)
                } else if (res.data.State === -101 && res.data.Value) {
                  this.username = res.data.Value
                  this.$refs.tips.popTips(res.data.Message)
                } else {
                  this.$refs.tips.popTips(res.data.Message)
                  tracker.selectUsernameFailed(this.platform, res.data.Message)
                }
              }
            })
        }
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/main.css';
  @import '../assets/css/username.css';
</style>
