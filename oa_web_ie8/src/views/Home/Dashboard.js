import React from 'react'
import { Col, Row, Table,Button } from 'antd'
import { Link,hashHistory } from 'react-router'
import '../../style/dashboard.less'
import * as API from '../../axios/myAxios'
import components from '../../components/index'
import '../../style/ca.less'
import { userInfo } from 'os'
import { inflate } from 'zlib'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current:1,
      total:0,
      userinfo:{},
      list:[],
      pendinglist:[],
      newlist:[],
      schedulelist:[],
      search:'',
      status:99,
      modalData:{},
      operationType:false,
    },
    this.page = 1;
    this.num = 30;
    this.total = 0;
  }

  componentDidMount() {
    API.GET('/user/public_conf').then((data) => {
      console.log('异步加载数据成功')
      console.log(data)
    }).catch((err) => {
      console.log(err);
    })

    API.GET('/user/center').then((data) => {
      console.log('登录用户信息')
      console.log(data)
      this.setState({userinfo:data.data})
    }).catch((err) => {
      console.log(err);
    })

    this.handlePullPending();
    this.handlePullNews();
    this.handlePullSchedule();
  }

  handlePullNews = () => {
    API.GET('news/list',{dates:'2019-05'}).then((data) => {
      console.log('新闻信息')
      console.log(data)
      this.setState({newlist:data.data})
    }).catch((err) => {
      console.log(err);
    })
  }

  handlePullSchedule = () => {
    API.GET('schedule/duration_search',{ page:1,num:4 }).then((data) => {
      console.log('日程管理列表数据')
      console.log(data)
      this.setState({schedulelist:data.data.list})
    }).catch((err) => {
      console.log(err);
    })
  }

  handlePullPending = () => {
    API.GET('user/pending',{ page:this.page,num:this.num }).then((data) => {
      console.log('待审批列表数据')
      console.log(data)
      let newData = data.data.list
      let newList = [];
      newData = newData.map((item,index) => {
        if(index >= 8) return;
        switch (item.Cates) {
          case 'leave':newList.push(Object.assign(item,{type:'qj',Cates:'请假'}));break
          case 'overtime':newList.push(Object.assign(item,{type:'jb',Cates:'加班'})); break
          case 'expense':newList.push(Object.assign(item,{type:'bx',Cates:'报销'}));break
          case 'businesstrip':newList.push(Object.assign(item,{type:'cc',Cates:'出差'})); break
          case 'goout':newList.push(Object.assign(item,{type:'wc',Cates:'外出'})); break
          case 'oagoods':newList.push(Object.assign(item,{type:'wp',Cates:'物品'})); break
        }
      })
      console.log(newList)
      this.setState({pendinglist:newList})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleUpdate = (text) => {
    console.log(text);
    const temp = Object.assign({}, text)
    console.log(temp,"aaaaaaaaaaaaaaaa")
    this.setState({formData:temp})
    console.log(temp)
    switch (text.type) {
      case 'qj':this.setState({ visible_qj: true});break
      case 'jb':this.setState({ visible_jb: true}); break
      case 'bx':this.setState({ visible_bx: true});break
      case 'cc':this.setState({ visible_cc: true}); break
      case 'wc':this.setState({ visible_wc: true}); break
      case 'wp':this.setState({ visible_wp: true}); break
    }
  }

  render() {
    const { pendinglist ,newlist,userinfo,schedulelist} = this.state;
    const columns = [
      {
        title: '申请人',
        dataIndex: 'Realname',
        render: text => <a>{text}</a>,
      },
      {
        title: '申请类型',
        className: 'column-money',
        dataIndex: 'Cates',
      },
      {
        title: '申请理由',
        dataIndex: 'Reason',
      },
      {
        title: '操作',
        key: 'operation',
        width:'100',
        className:'column-operation',
        render: (text, record) => {
          return <span>
            <Button type="primary" htmlType="submit" style={{marginLeft:'10px'}} onClick={this.handleUpdate.bind(this, text)}>审批</Button>
          </span>;
        }
      }
    ]

    const  userInfo = <Col span="6" className="col" style={{ padding: '0 10px', marginBottom: '20px' }}>
                        <div className="fiche">
                          <div className="fiche-header">
                            <div className="box">
                              <div className="chart"><img src={userinfo.avatar}></img></div>
                              <div className="casket">
                                <div className="hezi">
                                  <div className="name">{userinfo.realname}</div>
                                  <div className="ender"></div>
                                </div>
                                <div className="company">广西杰思信息科技有限公司</div>
                              </div>
                            </div>
                          </div>
                          <div className="card-cell">
                            <div className="a">
                              <div className="shu"></div>
                              <div className="message">个人信息</div>
                            </div>
                            <div className="b">
                              <div className="phone">手机</div>
                              <div className="number">{userinfo.phone}</div>
                            </div>
                            <div className="c">
                              <div className="mailbox">邮箱</div>
                              <div className="mailbox-v">{userinfo.email}</div>
                            </div>
                            <div className="d">
                              <div className="position">职位</div>
                              <div className="position-v">{userinfo.position}</div>
                            </div>
                            <div className="button">
                              <Link to='/profile'><Button type="primary" size="large">进入个人中心</Button></Link>
                            </div>
                          </div>
                        </div>
                      </Col>
    return (
      <div className="container">
        <div style={{ clear: 'both' }}>
          <Row type="flex" justify="space-between" style={{ clear: 'both' }}>
            <Col span="9" className="col" style={{ padding: '0 10px', marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <components.lineChart/>
              </div>
            </Col>
            <Col span="9" className="col" style={{ padding: '0 10px', marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <components.BarChart/>
              </div>
            </Col>
            {
              userInfo
            }
          </Row>
        </div>
        <div style={{ clear: 'both' }}>
          <Row type="flex" justify="space-between">
            <Col span="16" className="col" style={{ padding: '0 10px' }}>
              <div className="card">
                <div className="card-header">
                  <i /> 待处理
                </div>
                <div style={{ background: '#fff', height: 'auto', padding: '0 15px' }}>
                  <Table
                    columns={columns}
                    dataSource={pendinglist}
                    pagination
                    size="middle"
                  />
                </div>
              </div>
            </Col>
            <Col span="8" className="col" style={{ padding: '0 10px' }}>
              <div style={{ height: 'auto' }}>
                <div className="card">
                  <div className="card-header">
                    <i /> 日程管理
                  </div>
                  {
                    schedulelist.map((item, index) => (
                    <div className="card-cell" key={index}>
                      <div className="cell-title">{item.reason}</div>
                      <div className="cell-extra">09月14日 10:23:21</div>
                     </div>
                     ))
                  }
                </div>

                <div className="card">
                  <div className="card-header">
                    <i /> 新闻资讯
                  </div>
                  {
                    newlist.map((item, index) => (<div className="card-cell" key={index}>
                      <div className="cell-title">{item.Title}</div>
                      <div className="cell-extra">{item.CreateAt}</div>
                    </div>))
                  }
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Dashboard
