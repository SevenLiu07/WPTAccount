export default {
  statisticsLogin (platform, names, type) {
    if (platform === 'LegendHill') {
      fbq('track', 'cumulus_' + names)
      ga('send', 'event', 'cumulus_login', type)
    }
    if (platform === 'Facebook') {
      fbq('track', names)
      ga('send', 'event', 'login', type)
    }
  },
  facebookLogin () {
    fbq('track', 'login_fb_click')
    ga('send', 'event', 'login', 'login_fb_click')
  },
  loginSucceed (platform) {
    if (platform === 'LegendHill') {
      fbq('track', 'cumulus_login_email_success')
      ga('send', 'event', 'cumulus_login', 'email', 'success')
    }
    if (platform === 'Facebook') {
      fbq('track', 'login_email_success')
      ga('send', 'event', 'login', 'email', 'success')
    }
  },
  loginFailed (platform, reason) {
    if (platform === 'LegendHill') {
      fbq('track', 'cumulus_login_email_fail')
      ga('send', 'event', 'cumulus_login', 'fail', reason)
    }
    if (platform === 'Facebook') {
      fbq('track', 'login_email_fail', {
        error: reason
      })
      ga('send', 'event', 'login', 'fail', reason)
    }
  },
  statisticsSign (platform, names, type) {
    if (platform === 'LegendHill') {
      fbq('track', 'cumulus_' + names)
      ga('send', 'event', 'cumulus_signup', type)
    }
    if (platform === 'Facebook') {
      fbq('track', names)
      ga('send', 'event', 'signup', type)
    }
  },
  facebookSignUp () {
    fbq('track', 'signup_fb_click')
    ga('send', 'event', 'signup', 'signup_fb_click')
  },
  signSucceed(platform) {
    if (platform === 'LegendHill') {
      fbq('track', 'cumulus_signup_email_success')
      ga('send', 'event', 'cumulus_signup', 'email', 'success')
      ga('send', 'event', 'cumulus_Signup', 'Register', 'E-mail')

    }
    if (platform === 'Facebook') {
      fbq('track', 'signup_email_success')
      ga('send', 'event', 'signup', 'email', 'success')
      ga('send', 'event', 'Signup', 'Register', 'E-mail')
      yAnalytics('signup', 'signup', 'signup', 'email', 'success')
    }

    window.google_trackConversion({
      google_conversion_id: 864698956,
      google_conversion_label: conversionLabels.em,
      google_remarketing_only: false

    })
  },
  signFailed (reason) {
    fbq('track', 'signup_email_fail', {
      error: reason
    })
    ga('send', 'event', 'signup', 'email', 'fail', reason)
    yAnalytics('signup', 'signup', 'signup', 'email', 'fail')

  },
  avatarStatistics(platform, gender, avatarClick, sex) {
    let sexMapping = new Map([
      [1, 'f'],
      [2, 'm']
    ])
    if (platform === 'LegnedHill') {
      fbq('track', 'cumulus_' + gender)
      ga('send', 'event', 'cumulus_signup', avatarClick)
    }
    if (platform === 'Facebook') {
      fbq('track', 'fb_' + gender)
      ga('send', 'event', 'fb_signup', avatarClick)
    }
    if (platform === 'Web') {
      fbq('track', gender)
      ga('send', 'event', 'signup', avatarClick)
      ga('send', 'event', 'Signup', 'Avatar', sexMapping.get(sex))
    }
    window.google_trackConversion({
      google_conversion_id: 864698956,
      google_conversion_label: conversionLabels.as,
      google_remarketing_only: false
    })
  },
  selectUsernameSucceed(platform) {
    if (platform === 'Web') {
      fbq('track', 'create_username_success')
      ga('send', 'event', 'signup', 'username_create')

    }
    if (platform === 'Facebook' || platform === 'LegendHill') {
      fbq('track', 'fb_create_username_success')
      ga('send', 'event', 'fb_signup', 'username_create')
    }
    ga('send', 'event', 'Signup', 'Entered', 'Username')
    window.google_trackConversion({
      google_conversion_id: 864698956,
      google_conversion_label: conversionLabels.ue,
      google_remarketing_only: false
    })
  },
  selectUsernameFailed(platform, reason) {
    if (platform === 'Web') {
      fbq('track', 'create_username_fail', {
        error: reason
      })
      ga('send', 'event', 'signup', 'username_create', 'fail', reason)

    }
    if (platform === 'Facebook' || platform === 'LegendHill') {

      fbq('track', 'fb_create_username_fail', {
        error: reason
      }) // facebook像素统计facebook创建username失败及原因
      ga('send', 'event', 'fb_signup', 'username_create', 'fail', reason)
    }
  }

}
