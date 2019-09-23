import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'

// axios.defaults.baseURL = 'http://oa-api.1024web.cn/'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 100000
// // axios拦截器

axios.interceptors.request.use((config) => {
  // 拦截器处理
  // config.headers['Authorization'] = '12233334';
  // config.headers['token'] = '123123123';
  if (config.method === 'get') {
    config.params = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000,
    }
  }
  return config
})

axios.interceptors.response.use((response) => {
  // 请求返回数据处理
  // console.log(response)
  if (response.status === '200' || response.status === 200) {
    return response.data
  }
  // 非200请求抱错
  throw Error(response.opt || '服务异常')
})

export default class http {
  static token = '';
  static init(token = null) {
    if (token === null) {
      _DeviceStorageUtil.get('ticket').then((ticket) => {
        if (ticket === null) {
          _NavigationUtil.goPage('LoginPage')
        } else {
          this.token = ticket
        }
      })
    } else {
      this.token = token
    }
  }
  static async get(url, params) {
    /*
     * params{
     * goods：id，
     * name：string
     * } ==> ?goods=id&name=string
     */
    const r = {
      code: 0,
      data: '',
      msg: '请求出错',
    }
    try {
      params.Timestamp = Date.now()
      params.token = this.token
      const query = await qs.stringify(params)
      let res = null
      res = await axios.get(`${url}?${query}`)
      if (res.code == '-1') {
        _NavigationUtil.goPage('LoginPage')
        return r
      }
      return res
    } catch (error) {
      return error
    }
  }
  static async post(url, params) {
    params.Timestamp = Date.now()
    params.token = this.token
    try {
      const res = await axios.post(url, qs.stringify(params))
      if (res.code == '-1') {
        _NavigationUtil.goPage('LoginPage')
      }
      return res
    } catch (error) {
      console.log(error)
    }
  }
  static async patch(url, params) {
    try {
      const res = await axios.patch(url, params)
      return res
    } catch (error) {
      return error
    }
  }
  static async put(url, params) {
    try {
      const res = await axios.put(url, params)
      return res
    } catch (error) {
      return error
    }
  }
  static async delete(url, params) {
    /**
     * params默认为数组
     */
    try {
      const res = await axios.post(url, params)
      return res
    } catch (error) {
      return error
    }
  }
}
