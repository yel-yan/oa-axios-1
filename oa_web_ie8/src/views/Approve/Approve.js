import React from 'react'
import { Menu, Icon,Tabs,Breadcrumb,Select,Button,Table } from 'antd'
import { Link } from 'react-router'
import './approve.less'
const TabPane = Tabs.TabPane;
import components from '../../components/index'

class Approve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PaneStatus:true,
      activeKey:1,
      options: [],
      panes : [
        { title: '请假', type: 'qj', key: '1' },
        { title: '加班', type: 'jb', key: '2' },
        { title: '报销', type: 'bx', key: '3' },
        { title: '出差', type: 'cc', key: '4' },
        { title: '外出', type: 'wc', key: '5' },
        { title: '物品', type: 'wp', key: '6' },
      ],
      panes1 : [
        { title: '请假', type: 'qj', key: '7' },
        { title: '加班', type: 'jb', key: '8' },
        { title: '报销', type: 'bx', key: '9' },
        { title: '出差', type: 'cc', key: '10' },
        { title: '外出', type: 'wc', key: '11' },
        { title: '物品', type: 'wp', key: '12' },
      ],
    }
  }

  callback =(key) => {
    console.log(key);
  }

  onChange = () => {
    const { PaneStatus } = this.state;
    this.setState({ PaneStatus:!PaneStatus });
  }

  render() {
    const {PaneStatus} = this.state;
    const operations = <Button onClick={this.onChange}>我的申请</Button>;
    const operations1 = <Button onClick={this.onChange}>我的审批</Button>;
    let tabs;
    if(PaneStatus){
      tabs = <Tabs type="card" tabBarExtraContent={operations}>
      {
        this.state.panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            <components.Tab type={pane.type}/>
          </TabPane>
        ))
      }
    </Tabs>
    }else{
      tabs = <Tabs type="card" tabBarExtraContent={operations1}>
      {
        this.state.panes1.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            <components.Tab_apply type={pane.type}/>
          </TabPane>
        ))
      }
    </Tabs>
    }
    return (
       <div className="approve-container">
        <div className="breadcrumb">
          <Breadcrumb separator=">">
            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
            <Breadcrumb.Item href="">首页</Breadcrumb.Item>
            <Breadcrumb.Item href="">{PaneStatus ? '我的审批' : '我的申请' }</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="tab">
          {tabs}
        </div>
        {this.props.children}
       </div>
    )
  }
}

export default Approve

