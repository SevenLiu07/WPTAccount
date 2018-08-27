<template>
  <div class="floating_container">
    <titles></titles>
    <Alert ref="tips"></Alert>
    <div class="container_content">
      <banner></banner>
      <div class="content_wrapper">
        <div class="avatar_top">
          <div class="avatar_content">
            <div class="content_top">
              <div class="content_title">Choose an avatar</div>
            </div>
            <div class="avatars">
              <ul>
                <li v-for="(item, index) in selectActive" @click="selectAvatar(item, index)"
                    :class="{'selected_avatar': item.active}" class="background_avatar_wrapper">
                  <img :src="item.src">
                </li>
              </ul>
              <div class="submit_button hover_effect" @click="playNow()">Play Now!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/account.js'
  import auth from '../utils/auth.js'
  import { mapState } from 'vuex'
  import trackers from '../utils/trackers.js'
  import Alert from '../components/Alert.vue'

  export default {

    data () {
      return {
        selectActive: [{
          active: false,
          src: 'static/images/woman-d1f69e9da2.png'
        }, {
          active: true,
          src: 'static/images/man-931e9676ea.png'
        }
        ],
        sex: 1,
        avatarCode: 1001
      }
    },

    components: { Alert },
    computed: mapState([
      'platform'
    ]),
    methods: {

      selectAvatar (item, index) {
        this.selectActive.forEach((val) => {
          val.active = false
        })
        item.active = true
        if (index === 1) {
          this.sex = 1
          this.avatarCode = 1001
        } else {
          this.sex = 2
          this.avatarCode = 2001
        }
      },
      playNow () {
        let data = {
          version: Math.random(),
          sex: this.sex,
          avatarCode: this.avatarCode
        }

        let base = location.href.includes('staging')
                 ? 'https://staging-games.' + window.location.host.split('.')[1] + '.com/'
                 : 'https://games.' + window.location.host.split('.')[1] + '.com/'

        let path = {
          'Web': 'poker/#getBonus?' + auth.getCookie('rewardUrl'),
          'LegendHill': 'poker/#getBonus',
          'Facebook': 'poker/index_facebook.html#getBonus'
        }

        api.bindAvatar(data)
          .then(res => {
            if (res.data.State === 1) {
              window.location.href = base + path[this.platform]
              trackers.avatarStatistics(this.platform, 'gender_male_click', 'avatar_male_click', this.sex)
            } else {

            }
          })
      }
    }
  }
</script>

<style scoped>
  @import '../assets/css/avatar.css';
  @import '../assets/css/main.css';
</style>
