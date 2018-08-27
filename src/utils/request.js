
import axios from 'axios'
import qs from 'qs'

const service = axios.create({

  baseURL: location.href.includes('staging') ? location.protocol + '//staging-napi.' + window.location.host.split('.')[1] + '.com/' : location.protocol + '//napi.' + window.location.host.split('.')[1] + '.com/',
  withCredentials: true

})
// 统一包裹qs
service.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return config
}, (error) => {
  console.log('err' + error) // for debug
  return Promise.reject(error)
})

export default service
