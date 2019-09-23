import React from 'react'
import { DatePicker, Checkbox, Select, Modal, Menu, Icon, Row, Col } from 'antd'
import axios from 'axios'
import json3 from 'json3'

const { SubMenu } = Menu
const MenuItemGroup = Menu.ItemGroup

const children = []
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

class Inbox extends React.Component {
  state = {
    data: null,
    current: '1',
    visible: false,
  };

  componentDidMount() {
    console.log('发送请求')
    axios
      .get('/user/public_conf')
      .then((result) => {
        console.log(result)
        // console.log(json3.parse(result.data))
        console.log('set State')
        if (result.data.code === 1) {
          this.setState({
            data: result.data,
          })
        } else {
          this.setState({
            data: result.data,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    const obj = { name: [1, 2], age: 2 }
    Object.keys(obj).forEach((item) => {
      if (item === 'name') {
        if (obj[item].includes(2)) {
          console.log(1)
        } else {
          console.log(3)
        }
      } else {
        console.log(obj[item])
      }
    })
  }

  handleClick = () => {
    const { history } = this.props
    history.push('/inbox/messages/1')
  };

  handleCount = () => {
    const { history } = this.props
    history.push('/count')
  };

  handleVideo = () => {
    const { history } = this.props
    history.push('/chart')
  };


  handleChange = (value, dateString) => {
    console.log(value, dateString)
  };

  onChange= (e) => {
    console.log(`checked = ${e.target.checked}`)
  }

  handleChange1 = (value) => {
    console.log(`selected ${value}`)
  }

  handleClick1 = (e) => {
    console.log('click ', e)
    this.setState({
      current: e.key,
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk= () => {
    console.log('点击了确定')
    this.setState({
      visible: false,
    })
  }

  handleCancel= () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    console.log(this.props)
    const { data, visible } = this.state
    return (
      <div>
        <h2>Inbox</h2>
        <button onClick={this.handleClick}>
          <span>go messages</span>
        </button>
        <button onClick={this.handleCount}>go count</button>
        <button onClick={this.handleVideo}>go echarts</button>
        {this.props.children || 'Welcome to your Inbox'}
        {data ? (
          data.map(item => <div key={item.id}>{`${item.title}-${item.id}`}</div>)
        ) : (
          <div>没有setState</div>
        )}
        <DatePicker onChange={this.handleChange} />
        <label>
          <Checkbox defaultChecked={false} onChange={this.onChange} />
          Checkbox
        </label>
        <Select
          multiple
          style={{ width: 400 }}
          defaultValue={['a10', 'c12']}
          onChange={this.handleChange1}
        >
          {children}
        </Select>
        <Menu
          onClick={this.handleClick1}
          style={{ width: 240 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
            <MenuItemGroup title="分组1">
              <Menu.Item key="1">选项1</Menu.Item>
              <Menu.Item key="2">选项2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="分组2">
              <Menu.Item key="3"><a href="#">选项3</a></Menu.Item>
              <Menu.Item key="4">选项4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
            <Menu.Item key="5">选项5</Menu.Item>
            <Menu.Item key="6">选项6</Menu.Item>
            <SubMenu key="sub3" title="三级导航">
              <Menu.Item key="7">选项7</Menu.Item>
              <Menu.Item key="8">选项8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三</span></span>}>
            <Menu.Item key="9">选项9</Menu.Item>
            <Menu.Item key="10">选项10</Menu.Item>
            <Menu.Item key="11">选项11</Menu.Item>
            <Menu.Item key="12">选项12</Menu.Item>
          </SubMenu>
        </Menu>

        <div>
          <button onClick={this.showModal}>显示对话框</button>
          <Modal
            title="第一个 Modal"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>对话框的内容</p>
            <p>对话框的内容</p>
            <p>对话框的内容</p>
          </Modal>
        </div>

        <div>
          <Row>
            <Col span="12">.col-12</Col>
            <Col span="12">.col-12</Col>
          </Row>
          <Row className="testRowClassName">
            <Col span="8">.col-8</Col>
            <Col span="8">.col-8</Col>
            <Col span="8" className="testColClassName">.col-8</Col>
          </Row>
          <Row>
            <Col span="6">.col-6</Col>
            <Col span="6">.col-6</Col>
            <Col span="6">.col-6</Col>
            <Col span="6">.col-6</Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Inbox
