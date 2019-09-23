import React from 'react'
import { Menu, Icon,Badge } from 'antd'
import { Link,hashHistory } from 'react-router'
import './style/app.less'
import Cookies from 'js-cookie';

const { SubMenu } = Menu

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {current: '1',};
  }

  componentDidMount() {
    const isAuth = Cookies.get('_isAuthorised');
    if (!isAuth) {
        // window.location.replace("#/login");
        console.log("跳转login")
        this.props.history.push('/login');
    }
  }

  handleClick = (e) => {
    console.log('click ', e)
    this.setState({
      current: e.key,
    })
  }

  handleLogoutClick = () =>{
    console.log("退出")
    console.log(hashHistory)
    Cookies.remove('_isAuthorised');
    Cookies.remove('_token');
    hashHistory.push('/login');
  }

  render() {
    console.log("appapp")
    return (
      <div className="container">
        <div className="sider">
          <div className="title">创视天成OA系统</div>
          <Menu
            onClick={this.handleClick}
            style={{ width: 240 }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[this.state.current]}
            mode="inline"
            theme="dark"
          >
            <Menu.Item key="8">
              <Link to="/">首页</Link>
            </Menu.Item>
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>工作台</span></span>}>
              <Menu.Item key="9"><Link to="/Uncheck">待审批</Link></Menu.Item>
              <Menu.Item key="10"><Link to="/approve">审批管理</Link></Menu.Item>
              <Menu.Item key="11"><Link to="/docsign">公文签批</Link></Menu.Item>
              <Menu.Item key="12"><Link to="/schedule">日程管理</Link></Menu.Item>
              <Menu.Item key="13"><Link to="/news">新闻资讯</Link></Menu.Item>
              <Menu.Item key="14"><Link to="/inbox">测试</Link></Menu.Item>
              <Menu.Item key="15"><Link to="/chat">即时通讯</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="header">
          <div style={{ float: 'right', height: '100%', lineHeight: '50px' }} >
            <ul className="nav-right">
              <li className="nav-item"><Link to='/profile' style={{color:'#333'}}><Icon type="user" />严尔林</Link></li>
              <li className="nav-item">
                <Link to='/' style={{color:'#333'}}>
                  <Badge dot>
                    <Icon type="notification"/>
                  </Badge>
                  通知
                </Link>
              </li>
              <li className="nav-item"><a onClick={this.handleLogoutClick} style={{color:'#333'}}><Icon type="poweroff"  style={{color:'red'}}/>退出</a></li>
            </ul>
          </div>
        </div>
        <div className="content">
          {this.props.children}
        </div>
        {/* <div className="rightPanel-container show">
          <div className="rightPanel">
            aaa
          </div>
        </div> */}
      </div>
    )
  }
}

export default App
