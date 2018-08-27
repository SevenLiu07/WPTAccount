import api from '../api/account.js'
import auth from '../utils/auth.js'

export default {

  testPlatform (state) {
    if (window.top === window.self) {
      state.platform = 'Web'
    } else if (window.top !== window.self && location.href.includes('cumulus')) {
      state.platform = 'LegendHill'
    } else {
      state.platform = 'Facebook'
    }
  },
  loggingStatus (state) {
    api.getLoginUserInfo({
      version: Math.random()
    }).then(res => {
      let base = location.href.includes('staging')
               ? 'https://staging-games.' + window.location.host.split('.')[1] + '.com/'
               : 'https://games.' + window.location.host.split('.')[1] + '.com/'

      if (res.data.State === 1 && res.data.Value.IsLogined) {
        if (!location.href.includes('reset')) {
          if (!res.data.Value.IsBindLz) {
            window.location.href = '/#/username'
          } else if (!res.data.Value.IsBindAvatar) {
            window.location.href = '/#/avatar'
          } else {
            state.isLogin = true
            let IEVersion = IE()
            if (IEVersion && IEVersion <= 9) {
              window.location.href = base + 'poker-flash' // ie低版本跳转flash版本poker
            } else {
              if (auth.getCookie('rewardUrl')) {
                window.location.href = base + 'poker/?' + auth.getCookie('rewardUrl')
              } else {
                window.location.href = base + 'poker'
              }
            }
          }
        }
      }
    })
  },
  faceBookLogin (state) {
    FB.login(function (response) {
      if (response.authResponse) {
        if (response.status === 'connected') {
          let userId = response.authResponse.userID
          let accessToken = response.authResponse.accessToken
          let platformNum = 0
          if (accessToken) {
            let baseURL = location.href.includes('staging') ? location.protocol + '//staging-napi.' + window.location.host.split('.')[1] + '.com/' : location.protocol + '//napi.' + window.location.host.split('.')[1] + '.com/'
            window.location.href = baseURL +  'webapi/page/facebooklogin/FacebookDialogLogin?accessToken=' + accessToken + '&userid=' + userId + '&expiresIn=' + response.authResponse.expiresIn + 'platform' + platformNum
          }
        }
      } else {
        console.log('User cancelled login or did not fully authorize.')
      }
    }, {
      scope: 'user_friends, email'
    })
  }
}
