import React from 'react'
import axios from 'axios'
import Routes from './routes'
import Cookies from 'js-cookie';
/* 请求携带cookie,配置接口调用前缀 */
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'

class Page extends React.Component {
  componentWillMount() {
    console.log("axios初始化")
    axios.interceptors.request.use(
      config =>
      // 在发送请求之前做些什么
        config
      , error =>
      // 对请求错误做些什么
        Promise.reject(error),
    )

    // 添加响应拦截器
    axios.interceptors.response.use((response) => {
      // 对响应数据做点什么
      console.log('response', response)
      return response
    }, error =>
    // 对响应错误做点什么
      Promise.reject(error))


      
        // const isAuth = Cookies.get('_isAuthorised');
        // if (!isAuth) {
        //     // window.location.replace("#/login");
        //     console.log("跳转login")
        //     this.props.history.push('/login');
        // }
      
  }

  render() {
    return (
      <Routes />
    )
  }
}

export default Page
