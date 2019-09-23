import React, { Component } from 'react'
import { Col, Row, Form, Input, Button, Modal, notification, Icon, message } from 'antd'
import Cookies from 'js-cookie'
import * as API from '../../axios/myAxios'
import kaptcha from '../../media/img/kaptcha.jpg'
import './LoginForm.css'

const FormItem = Form.Item
const createForm = Form.create

// import {arrayToTree} from "../../utils/data-tools";

class LoginForm extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // 提醒框全局默认配置
    notification.config({
      duration: 8,
      top: 100,
    })
    // 刷新验证码
    // this.handleImgClick();
  }

  handleSubmit(e) {
    e.preventDefault()
    // 表单验证
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }


      // 登录请求逻辑
      
      values['__isFormType'] = true;
        API.POST('user/login', values)
          .then((data) => {
              console.log(data)
              message.success('登录成功！');
              // 认证成功，转向index。要设置Cookie，证明非CSRF攻击
              Cookies.set('_isAuthorised', true);
              Cookies.set('_token',data.data.token);
              this.props.onSubmitSuccess();
          }).catch(error => {
              Modal.warning({
                  title: error
              });
              // this.handleImgClick();
          }) 

      // 模拟数据
      // const data = {
      //   userInfo: {
      //     lastLoginInfo: '本次登录地址：10.128.170.21 \n 上次登录状态：成功 \n 上次登录地址：10.128.170.21 \n 上次登录时间：2018-12-24 12:04:59',
      //     userCode: 'admin',
      //   },
      //   message: '认证通过',
      // }
      // 模拟登录成功的处理
      // message.success('登录成功！')
      // 认证成功，转向index。要设置Cookie，证明非CSRF攻击
      // Cookies.set('_isAuthorised', true)

      // const userInfo = data.userInfo
      // if (userInfo) {
      //   const userCode = userInfo.userCode
      //   const lastLoginInfo = userInfo.lastLoginInfo

      //   // 用户信息保存在window对象中
      //   Cookies.set('__userCode', userCode)

      //   if (lastLoginInfo != '') {
      //     notification.open({
      //       message: '登录信息',
      //       description: lastLoginInfo,
      //       duration: 8,
      //     })
      //   }
      // }
      // this.props.onSubmitSuccess()
    })
  }

  handleReset(e) {
    e.preventDefault()
    this.props.form.resetFields()
  }

  handleChange(e) {
    e.preventDefault()
    this.props.history.push('/password-change?backPath=/login')
  }

  handleImgClick(e) {
    // 请求验证码
    /* const img = this.refs.verifyImg;
        img.src = './api/v1/kaptcha?' + Math.random() * 100; */
  }

  /* checkUserName(rule, value, callback) {
        const {validateFields} = this.props.form;
        if (value) {
            validateFields(['loginName'], {force: true})
        }
        callback();
    } */

  render() {
    const { getFieldProps } = this.props.form
    const userNameProps = getFieldProps('mobile', {
      rules: [
        { required: true, min: 5, message: '请输入用户名' },
        // {validator: this.checkUserName.bind(this)}
      ],
    })
    const passwordProps = getFieldProps('user_pwd', {
      rules: [
        { required: true, min: 3, message: '请输入密码' },
        // {validator: this.checkPassword.bind(this)}
      ],
    })
    // const verifyCodeCodeProps = getFieldProps('verifyCode', {
    //   rules: [
    //     { required: true, message: '必须输入验证码' },
    //     // {validator: this.checkValidateCode.bind(this)}
    //   ],
    // })
    const formCommonStyle = {
      /* labelCol: {span: 4}, */
      wrapperCol: { span: 24 },
    }
    return (
      <div className="login-box">
        <div className="login-card-content">
          <div className="title-container">
            创视天成OA办公系统
          </div>
          <Form horizontal form={this.props.form}>
            <FormItem>
              <span className="login-box-title">登&nbsp;&nbsp;&nbsp;录</span>
            </FormItem>
            <FormItem
              {...formCommonStyle}
              hasFeedback
            >
              <Input
                {...userNameProps}
                placholder="请输入用户名"
                ref="login_name_input"
                size="large"
                onPressEnter={this.handleSubmit.bind(this)}
                autoFocus
                className="login-input"
                addonBefore={<Icon type="user" />}
              />
            </FormItem>
            <FormItem
              {...formCommonStyle}
              hasFeedback
            >
              <Input
                {...passwordProps}
                type="password"
                onPressEnter={this.handleSubmit.bind(this)}
                size="large"
                className="login-input"
                addonBefore={<Icon type="lock" />}
              />
            </FormItem>
            {/* <FormItem>
              <Col span="15">
                <FormItem>
                  <Input
                    {...verifyCodeCodeProps}
                    onPressEnter={this.handleSubmit.bind(this)}
                    size="large"
                    className="login-input"
                    addonBefore={<Icon type="lock" />}
                  />
                </FormItem>
              </Col>
              <Col span="8">
                <img
                  className="login-verify-img"
                  src={kaptcha}
                  onClick={this.handleImgClick.bind(this)}
                  ref="verifyImg"
                />
              </Col>
            </FormItem> */}
            <FormItem
              wrapperCol={{ span: 20, offset: 3 }}
              help
            >
              <div className="login-button">
                <Button
                  type="primary"
                  onClick={this.handleSubmit.bind(this)}
                  className="login-submit-button"
                >&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;&nbsp;
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="ghost" onClick={this.handleChange.bind(this)} className="login-password-button">修改密码</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default createForm()(LoginForm)
