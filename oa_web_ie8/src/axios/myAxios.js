import axios from 'axios'
import Qs from 'qs'
import Cookies from 'js-cookie'
import { Modal } from 'antd'

let token = '';

axios.defaults.headers['Token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 10000


axios.interceptors.request.use((config) => {
  console.log('******before config***', config)
  token = Cookies.get('_token')
  Cookies.set('CSRFDefense', token)
  config.headers['Token'] = token;
  if (config.method === 'post' || config.method === 'put') {
    if (config.data.__isFormType) {
      config.data = Qs.stringify({ ...config.data })
      console.log(config.data)
    } else {
      // config.data = JSON.stringify(config.data)
      config.data = Qs.stringify({ ...config.data })
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
  console.log('******axios config***', config.data)
  return config
}, (error) => {
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  console.log('******axios response***', response)
  const status = response.status
  if ((status >= 200 && status < 300) || status === 304) {
    return response.data
  }
}, (error) => {
  // console.log('------axios error---',error);
  const status = error.response.status
  const message = error.response.data ? error.response.data : '网络错误，请刷新重试'
  const isAuth = Cookies.get('_isAuthorised')
  if (status && (status === 401 || status === 504)) {
    const hash = window.location.hash
    if (hash && hash.indexOf('#/login') > -1) {

    } else {
      isAuth && Modal.warning({ title: '提示', content: message })
      window.location.replace('#/login')
    }
  } else if (status && (status === 307)) {
    Modal.warning({ title: '提示', content: message })
    window.location.replace('#/password-change')
  } else if (status && (status >= 500)) {
    // window.location.replace("#/error");
    // Modal.error({title: '错误提示', content: message + ':' + status});
    return Promise.reject(error.response.data)
  } else {
    return Promise.reject(error.response.data)
  }
})

export const POST = (url, params) => {
  const getTimestamp = new Date().getTime();
  params.Timestamp = getTimestamp;
  return axios.post(`${url}`, params).then(res => res)
}

export const GET = (url, params = {}) => {
  const getTimestamp = new Date().getTime();
  params.Timestamp = getTimestamp;
  params = Qs.stringify(params)
  console.log(params,"get参数")
  return axios.get(`${url}?${params}`).then(res => res)
}

export const PUT = (url, params) => {
  return axios.put(`${url}`, params).then(res => res)
}

export const DELETE = (url, params) => {
  return axios.delete(`${url}`, {params: params}).then(res => res)
}

export const PATCH = (url, params) => {
  return axios.patch(`${url}`, params).then(res => res)
}

