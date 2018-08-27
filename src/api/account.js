import http from '../utils/request'

export default {
  // 登录注册相关
  login (data) {
    return http({
      method: 'post',
      url: 'WebAPI/Login/WebLogin',
      data
    })
  },
  forgetPassword (data) {
    return http({
      method: 'post',
      url: 'WebAPI/Passport/ToForgetPassword',
      data
    })
  },
  resetPassword (data) {
    return http({
      method: 'post',
      url: 'WebAPI/Passport/ResetPassword',
      data: data
    })
  },
  singUp (data) {
    return http({
      method: 'post',
      url: 'WebAPI/Passport/WebRegister',
      data
    })
  },
  getLoginUserInfo (data) {
    return http({
      method: 'get',
      url: 'WebAPI/Passport/GetLoginUserInfo',
      params: data
    })
  },
  bindLzRoleName (data) {
    return http({
      method: 'post',
      url: 'WebAPI/Passport/BindLzRoleName',
      data
    })
  },
  bindAvatar (data) {
    return http({
      method: 'post',
      url: 'WebAPI/Passport/BindAvatar',
      data
    })
  },
  getFacebookLoginEntranceURL (data) {
    return http({
      method: 'get',
      url: 'WebAPI/page/FacebookLogin/GetFacebookLoginEntranceURL',
      params: data
    })
  },
  // 验证码相关
  showCaptchaWhenRegister (data) {
    return http({
      method: 'post',
      url: 'WebAPI/page/Captcha/ShowCaptchaWhenRegister',
      data
    })
  },
  getCaptchaToken (data) {
    return http({
      method: 'get',
      url: 'WebAPI/page/Captcha/GetTokenH5',
      params: data
    })
  },
  showCaptchaWhenLogin (data) {
    return http({
      method: 'post',
      url: 'WebAPI/page/Captcha/ShowCaptchaWhenLogin',
      data
    })
  },
  getToken (data) {
    return http({
      method: 'get',
      url: 'WebAPI/Passport/GetCryptoToken',
      param: data
    })
  }

}
