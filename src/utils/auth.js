import api from '../api/account.js'

export default {
  getCookie (key) {
    let reg = new RegExp('\\b' + key + '=([^;]+)(; |$)')
    let val = document.cookie.match(reg)
    return val ? decodeURIComponent(val[1]) : ''
  },
  setCookie (key, value, time) {
    let data = new Date(new Date().getTime() + time * 1000 * 60 * 60 * 24)
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + data.toGMTString()
  },
  delCookie (key) {
    this.setCookie(key, '', -1)
  },
  rsa (password) {
    window.setMaxDigits(131)
    let publicKey = this.getCookie('cryptowpt')
    if (!(publicKey && publicKey.split(':').length === 3)) {
      api.getToken({
        version: Math.random()
      })
        .then(res => {
          if (res.data.State) {
            publicKey = this.getCookie('cryptowpt')
          }
        })
    }
    let key = new window.RSAKeyPair(publicKey.split(':')[2], '', publicKey.split(':')[1], 1024)
    return window.encryptedString(key, window.base64encode(window.strUnicode2Ansi(password)), window.RSAAPP.PKCS1Padding)
  }
}
