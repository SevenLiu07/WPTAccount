export default {

  email (email, message) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.includes('')) {
      email = email.replace(/[ ]/g, '')
    }
    if (!email) {
      message('Please enter your email account')
      return false
    } else if (email.length < 6) {
      message('Your email account is too short, please input the correct email')
      return false
    } else if (!re.test(email)) {
      message('Please input a correct email address')
      return false
    } else {
      return true
    }
  },
  password (password, message) {
    let str = ",'\"“”‘ ;"
    if (!password) {
      message("Please input 6-16 characters which can be letters, numbers, symbols excluding ,;'")
      return false
    } else if (password.length > 16 || password.length < 6) {
      message("Your password is too short. Please input 6-16 characters which can be letters, numbers, symbols excluding ,;'")
      return false
    } else if (this._hasFullShape(password)) {
      message("Please input 6-16 characters which can be letters, numbers, symbols excluding ,;'")
      return false
    }
    for (let i of password) {
      if (str.includes(i)) {
        message("Please input 6-16 characters which can be letters, numbers, symbols excluding ,;'")
        return false
      }
    }
    return true
  },
  username (username, message) {
    if (!username) {
      message('Please input your username')
      return false
    } else if (username.includes(' ')) {
      message('Sorry, your username cannot contain space')
      return false
    } else if (username.replace(/[^\x00-\xff]/g, 'xx').length < 4) {
      message('Your username is too short, please input 4-20 characters as your username')
      return false
    } else {
      return true
    }
  },
  _hasFullShape (password) {
    if (!password) {
      return true
    }
    let pattern = /[^\x00-\xff]/g
    for (let i of password) {
      if (pattern.test(i)) {
        return true
      }
    }
    return false
  },
  getQuery () {
    let paramsArr = window.location.hash.substr(1).split('&')
    let params = {}
    for (let i of paramsArr) {
      let aParamArr = i.split('=')
      if (aParamArr[0].length) {
        params[aParamArr[0]] = decodeURIComponent(aParamArr[1])
      }
    }
    return params
  }
}

