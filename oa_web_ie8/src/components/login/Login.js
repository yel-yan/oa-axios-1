import React from 'react'
import LoginForm from './LoginForm'
import Cookies from 'js-cookie'
import bg from '../../media/img/bg2.png'

import './Login.css'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  loginSuccess() {
    this.props.history.push('/')
    console.log('登录成功跳转home')
  }

  render() {
    return (
      <div className="login-main">
        <div className="login-wrapper">
          <div className="login-form-wrapper">
            <LoginForm history={this.props.history} onSubmitSuccess={this.loginSuccess.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
